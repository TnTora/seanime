import { AL_BaseAnime, Anime_EntryDownloadInfo, Anime_Entry } from "@/api/generated/types"
import { EpisodeGridItem } from "@/app/(main)/_features/anime/_components/episode-grid-item"
import { useHasTorrentProvider } from "@/app/(main)/_hooks/use-server-status"
import { EpisodeListGrid } from "@/app/(main)/entry/_components/episode-list-grid"
import {
    __torrentSearch_drawerEpisodeAtom,
    __torrentSearch_drawerIsOpenAtom,
} from "@/app/(main)/entry/_containers/torrent-search/torrent-search-drawer"
import { useSetAtom } from "jotai"
import React, { startTransition } from "react"
import { BiCalendarAlt, BiDownload } from "react-icons/bi"
import { useThemeSettings } from "@/lib/theme/hooks"

export function UndownloadedEpisodeList({ downloadInfo, media, entry }: {
    downloadInfo: Anime_EntryDownloadInfo | undefined,
    media: AL_BaseAnime,
    entry: Anime_Entry
}) {

    const ts = useThemeSettings()

    const episodes = downloadInfo?.episodesToDownload

    const progress = entry?.listData?.progress ?? 0

    const setTorrentSearchIsOpen = useSetAtom(__torrentSearch_drawerIsOpenAtom)
    const setTorrentSearchEpisode = useSetAtom(__torrentSearch_drawerEpisodeAtom)

    const { hasTorrentProvider } = useHasTorrentProvider()

    const text = hasTorrentProvider ? (downloadInfo?.rewatch
        ? "You have not downloaded the following:"
        : "You have not watched nor downloaded the following:") :
        "The following episodes are not in your library:"

    if (!episodes?.length) return null

    return (
        <div className="space-y-4">
            <p className={""}>
                {text}
            </p>
            <EpisodeListGrid>
                {episodes?.sort((a, b) => a.episodeNumber - b.episodeNumber).slice(0, 28).map((ep, idx) => {
                    if (!ep.episode) return null
                    const episode = ep.episode
                    return (
                        <EpisodeGridItem
                            key={ep.episode.localFile?.path || idx}
                            media={media}
                            image={episode.episodeMetadata?.image}
                            isInvalid={episode.isInvalid}
                            hidePotentialSpoilers={progress < episode.progressNumber - +ts.hidePotentialSpoilersScope}
                            title={episode.displayTitle}
                            episodeTitle={episode.episodeTitle}
                            action={<div className={""}>
                                {hasTorrentProvider && <div
                                    onClick={() => {
                                        setTorrentSearchEpisode(episode.episodeNumber)
                                        startTransition(() => {
                                            setTorrentSearchIsOpen("download")
                                        })
                                    }}
                                    className="inline-block text-orange-200 absolue top-1 right-1 text-3xl absolute animate-pulse cursor-pointer"
                                >
                                    <BiDownload />
                                </div>}
                            </div>}
                        >
                            <div className="mt-1">
                                <p className="flex gap-1 items-center text-sm text-[--muted]">
                                    <BiCalendarAlt /> {episode.episodeMetadata?.airDate
                                        ? `Aired on ${new Date(episode.episodeMetadata?.airDate).toLocaleDateString()}`
                                        : "Aired"}
                                </p>
                            </div>
                        </EpisodeGridItem>
                    )
                })}
            </EpisodeListGrid>
            {episodes.length > 28 && <h3>And more...</h3>}
        </div>
    )

}
