import { serverStatusAtom } from "@/atoms/server-status"
import { useWebsocketMessageListener } from "@/atoms/websocket"
import { imageShimmer } from "@/components/shared/styling/image-helpers"
import { Button } from "@/components/ui/button"
import { cn } from "@/components/ui/core/styling"
import { Modal } from "@/components/ui/modal"
import { ProgressBar } from "@/components/ui/progress-bar"
import { SeaEndpoints, WSEvents } from "@/lib/server/endpoints"
import { useSeaMutation } from "@/lib/server/query"
import { PlaybackManagerPlaybackState, PlaybackManagerPlaylistState } from "@/lib/server/types"
import { useQueryClient } from "@tanstack/react-query"
import { atom } from "jotai"
import { useAtom, useAtomValue } from "jotai/react"
import Image from "next/image"
import React, { useState } from "react"
import { FaCirclePlay } from "react-icons/fa6"
import { PiPopcornFill } from "react-icons/pi"
import { toast } from "sonner"


const __pt_showModalAtom = atom(false)
const __pt_isTrackingAtom = atom(false)
const __pt_isCompletedAtom = atom(false)

export function ProgressTracking() {

    const qc = useQueryClient()
    const serverStatus = useAtomValue(serverStatusAtom)

    const [showModal, setShowModal] = useAtom(__pt_showModalAtom)
    const [isTracking, setIsTracking] = useAtom(__pt_isTrackingAtom)
    const [isCompleted, setIsCompleted] = useAtom(__pt_isCompletedAtom)

    // \/ This means that the modal should be displayed if the user is currently tracking the progress of a video or if the video has been completed
    const shouldBeDisplayed = isTracking || isCompleted

    const [state, setState] = useState<PlaybackManagerPlaybackState | null>(null)
    const [playlistState, setPlaylistState] = useState<PlaybackManagerPlaylistState | null>(null)

    // Tracking started
    useWebsocketMessageListener<PlaybackManagerPlaybackState | null>({
        type: WSEvents.PLAYBACK_MANAGER_PROGRESS_TRACKING_STARTED,
        onMessage: data => {
            setIsTracking(true)
            setShowModal(true) // Show the modal when tracking starts
            setState(data)
        },
    })

    // Video completed
    useWebsocketMessageListener<PlaybackManagerPlaybackState | null>({
        type: WSEvents.PLAYBACK_MANAGER_PROGRESS_VIDEO_COMPLETED,
        onMessage: data => {
            setIsCompleted(true)
            setState(data)
        },
    })

    // Tracking stopped completely
    useWebsocketMessageListener<string>({
        type: WSEvents.PLAYBACK_MANAGER_PROGRESS_TRACKING_STOPPED,
        onMessage: data => {
            setIsTracking(false)
            if (state?.progressUpdated) {
                setIsCompleted(false) // If the progress has been updated, reset the completed state, so that the modal doesn't show up again
            }
            if (data === "Player closed") {
                toast.info("Player closed")
            } else if (data === "Tracking stopped") {
                toast.info("Tracking stopped")
            } else {
                toast.error(data)
            }
        },
    })

    // Progress metadata error
    useWebsocketMessageListener<string>({
        type: WSEvents.PLAYBACK_MANAGER_PROGRESS_METADATA_ERROR,
        onMessage: data => {

        },
    })

    // Progress update error
    useWebsocketMessageListener<string>({
        type: WSEvents.PLAYBACK_MANAGER_PROGRESS_UPDATE_ERROR,
        onMessage: data => {
            toast.error(data)
        },
    })

    // Playback state
    useWebsocketMessageListener<PlaybackManagerPlaybackState | null>({
        type: WSEvents.PLAYBACK_MANAGER_PROGRESS_PLAYBACK_STATE,
        onMessage: data => {
            if (!isTracking) {
                setIsTracking(true)
            }
            setState(data)
        },
    })

    // Progress has been updated
    useWebsocketMessageListener<PlaybackManagerPlaybackState | null>({
        type: WSEvents.PLAYBACK_MANAGER_PROGRESS_UPDATED,
        onMessage: data => {
            if (data) {
                qc.refetchQueries({ queryKey: ["get-media-entry", data.mediaId] })
                qc.refetchQueries({ queryKey: ["get-library-collection"] })
                qc.refetchQueries({ queryKey: ["get-anilist-collection"] })
                setState(data)
                toast.success("Progress updated")
            }
        },
    })

    useWebsocketMessageListener<string>({
        type: WSEvents.PLAYBACK_MANAGER_NOTIFY_INFO,
        onMessage: data => {
            if (!!data) {
                toast.info(data)
            }
        },
    })

    useWebsocketMessageListener<PlaybackManagerPlaylistState | null>({
        type: WSEvents.PLAYBACK_MANAGER_PLAYLIST_STATE,
        onMessage: data => {
            setPlaylistState(data)
        },
    })

    const { mutate: syncProgress, isPending } = useSeaMutation<number>({
        endpoint: SeaEndpoints.PLAYBACK_MANAGER_SYNC_CURRENT_PROGRESS,
        method: "post",
        mutationKey: ["playback-sync-current-progress"],
        onSuccess: async (mediaId: number | undefined) => {
            qc.refetchQueries({ queryKey: ["get-media-entry", mediaId] })
            qc.refetchQueries({ queryKey: ["get-library-collection"] })
            qc.refetchQueries({ queryKey: ["get-anilist-collection"] })
        },
    })

    const { mutate: playlistNext, isSuccess: submittedPlaylistNext } = useSeaMutation({
        endpoint: SeaEndpoints.PLAYBACK_MANAGER_PLAYLIST_NEXT,
        method: "post",
        mutationKey: ["playback-playlist-next", playlistState?.current?.name],
        onSuccess: async () => {
            toast.info("Loading next file")
        },
    })

    const { mutate: stopPlaylist, isSuccess: submittedStopPlaylist } = useSeaMutation({
        endpoint: SeaEndpoints.PLAYBACK_MANAGER_CANCEL_PLAYLIST,
        method: "post",
        mutationKey: ["playback-cancel-playlist", playlistState?.current?.name],
        onSuccess: async () => {
            toast.info("Cancelling playlist")
        },
    })


    function handleUpdateProgress() {
        syncProgress()
    }

    return (
        <>
            {shouldBeDisplayed && <Button
                intent="primary"
                className={cn("animate-pulse", { "animate-bounce": isCompleted })}
                leftIcon={<PiPopcornFill />}
                onClick={() => setShowModal(true)}
            >
                Currently watching
            </Button>}


            <Modal
                open={showModal && shouldBeDisplayed}
                onOpenChange={v => setShowModal(v)}
                title="Progress"
                titleClass="text-center"
                contentClass="!space-y-2 relative"
            >
                {state && <div className="bg-gray-950 border rounded-md p-4 text-center relative overflow-hidden">
                    <p className="text-[--muted]">Currently watching</p>
                    <h3 className="text-lg font-medium line-clamp-1">{state?.mediaTitle}</h3>
                    <p className="text-2xl font-bold">Episode {state?.episodeNumber}
                        <span className="text-[--muted]">{" / "}{state?.mediaTotalEpisodes || "-"}</span></p>
                    {!!state?.completionPercentage && <div className="absolute left-0 top-0 w-full">
                        <ProgressBar className="h-2" value={state.completionPercentage * 100} />
                    </div>}
                </div>}
                {(serverStatus?.settings?.library?.autoUpdateProgress && !state?.progressUpdated) && (
                    <p className="text-[--muted] text-center">
                        Your progress will be automatically updated
                    </p>
                )}
                {(state?.progressUpdated) && (
                    <p className="text-green-300 text-center">
                        Progress updated
                    </p>
                )}
                {(
                    !!state?.completionPercentage
                    && state?.completionPercentage > 0.7
                    && !state.progressUpdated
                ) && <div className="flex gap-2 justify-center items-center">
                    <Button
                        intent="primary-subtle"
                        disabled={isPending || state?.progressUpdated}
                        onClick={handleUpdateProgress}
                        className="w-full"
                        loading={isPending}
                    >
                        Update progress now
                    </Button>
                </div>}
                {!!playlistState?.next && (
                    <div className="space-y-3">
                        <h4 className="text-lg font-medium text-center">Playlist</h4>
                        <div className="space-y-3">
                            <p className="text-center truncate line-clamp-1">Next: <span className="font-semibold">{playlistState?.next?.name}</span>
                            </p>
                            <div
                                className={cn(
                                    "w-full rounded-md relative overflow-hidden",
                                    submittedPlaylistNext ? "opacity-50" : "cursor-pointer",
                                )}
                                onClick={() => {
                                    if (!submittedPlaylistNext) playlistNext()
                                }}
                            >
                                {(playlistState.next?.mediaImage) && <Image
                                    src={playlistState.next?.mediaImage || ""}
                                    placeholder={imageShimmer(700, 475)}
                                    sizes="10rem"
                                    fill
                                    alt=""
                                    className="object-center object-cover z-[1]"
                                />}
                                <div className="inset-0 relative z-[2] bg-black bg-opacity-50 hover:bg-opacity-70 transition flex flex-col gap-2 items-center justify-center p-4">
                                    <p className="flex gap-2 items-center"><FaCirclePlay className="block text-2xl" /> Play next</p>
                                </div>
                            </div>
                        </div>
                        <Button
                            intent="alert-subtle"
                            onClick={() => {
                                if (!submittedStopPlaylist) stopPlaylist()
                            }}
                            size="sm"
                            className="w-full"
                            loading={submittedStopPlaylist}
                        >
                            Stop playlist
                        </Button>
                    </div>
                )}
            </Modal>
        </>
    )

}
