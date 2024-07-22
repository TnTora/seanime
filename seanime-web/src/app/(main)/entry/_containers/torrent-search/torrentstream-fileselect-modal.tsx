import {
    __torrentSearch_selectedTorrentsAtom,
    __torrentStream_ManualTorrentFileSelectionAtom,
} from "@/app/(main)/entry/_containers/torrent-search/torrent-search-container"
import { useGetTorrentFilenames } from "@/api/hooks/torrentstream.hooks"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { atom } from "jotai"
import { useAtom, useAtomValue, useSetAtom } from "jotai/react"
import React, { useEffect, useMemo, useState } from "react"

export const FileSelectIsOpenAtom = atom(false)
export const SelectedFileValue = atom("-1")

export function TorrentStreamFileSelectModal({ onValidatedTorrent }: {
    onValidatedTorrent: () => void,
}) {

    const [isOpen, setIsOpen] = useAtom(FileSelectIsOpenAtom)
    const selectedTorrents = useAtomValue(__torrentSearch_selectedTorrentsAtom)

    const [currValue, setValue] = useAtom(SelectedFileValue)

    const torrentLink = (selectedTorrents.length > 0) ?
        selectedTorrents[0].link
        : ""

    const { data: fileList } = useGetTorrentFilenames({ link: torrentLink }, !!torrentLink)

    return (
        <Modal
            open={isOpen}
            onOpenChange={() => {
                setValue("-1")
                setIsOpen(false)
            }}
            contentClass="max-w-3xl"
            title="Choose File"
        >
            <div className="pb-0">
                <Select
                    fieldClass="w-full max-w-2xl"
                    value={currValue}
                    onValueChange={(value) => setValue(value)}
                    options={fileList?.map((v, i) => { return { value: String(i), label: v } })}
                />
            </div>

            <div className="space-y-2">
                <div className="!mt-4 flex w-full justify-between gap-2 items-center">

                    <div className="flex w-full justify-end gap-2">

                        {selectedTorrents.length > 0 && (
                            <Button
                                intent="white"
                                className="animate-pulse"
                                onClick={() => { onValidatedTorrent() }}
                            >
                                Continue
                            </Button>
                        )}

                    </div>
                </div>
            </div>
        </Modal>
    )

}