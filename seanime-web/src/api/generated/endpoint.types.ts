// This file was generated by the Seanime API documentation generator.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Endpoint params
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import type {
    AL_BaseMedia,
    AL_FuzzyDateInput,
    AL_MediaFormat,
    AL_MediaListStatus,
    AL_MediaSeason,
    AL_MediaSort,
    AL_MediaStatus,
    Anime_LocalFileMetadata,
    ListSync_AnimeDiffKind,
    Manga_Provider,
    Models_AnilistSettings,
    Models_DiscordSettings,
    Models_LibrarySettings,
    Models_MediaPlayerSettings,
    Models_TorrentSettings,
} from "@/api/generated/types.ts"

/**
 * - Filepath: internal/handlers/anilist.go
 * - Filename: anilist.go
 */
export type EditAnilistListEntry_Variables = {
    mediaId: number
    status: AL_MediaListStatus
    score: number
    progress: number
    startedAt: AL_FuzzyDateInput
    completedAt: AL_FuzzyDateInput
    type: string
}

/**
 * - Filepath: internal/handlers/anilist.go
 * - Filename: anilist.go
 */
export type GetAnilistMediaDetails_Variables = {
    /**
     *  The AniList anime ID
     */
    id: number
}

/**
 * - Filepath: internal/handlers/anilist.go
 * - Filename: anilist.go
 */
export type DeleteAnilistListEntry_Variables = {
    mediaId: number
    type: string
}

/**
 * - Filepath: internal/handlers/anilist.go
 * - Filename: anilist.go
 */
export type AnilistListAnime_Variables = {
    page: number
    search: string
    perPage: number
    sort: Array<AL_MediaSort>
    status: Array<AL_MediaStatus>
    genres: Array<string>
    averageScore_greater: number
    season: AL_MediaSeason
    seasonYear: number
    format: AL_MediaFormat
    isAdult: boolean
}

/**
 * - Filepath: internal/handlers/anilist.go
 * - Filename: anilist.go
 */
export type AnilistListRecentAiringAnime_Variables = {
    page: number
    search: string
    perPage: number
    airingAt_greater: number
    airingAt_lesser: number
}

/**
 * - Filepath: internal/handlers/auto_downloader.go
 * - Filename: auto_downloader.go
 */
export type GetAutoDownloaderRule_Variables = {
    /**
     *  The DB id of the rule
     */
    id: number
}

/**
 * - Filepath: internal/handlers/auto_downloader.go
 * - Filename: auto_downloader.go
 */
export type DeleteAutoDownloaderRule_Variables = {
    /**
     *  The DB id of the rule
     */
    id: number
}

/**
 * - Filepath: internal/handlers/auto_downloader.go
 * - Filename: auto_downloader.go
 */
export type DeleteAutoDownloaderItem_Variables = {
    id: number
}

/**
 * - Filepath: internal/handlers/directory_selector.go
 * - Filename: directory_selector.go
 */
export type DirectorySelector_Variables = {
    input: string
}

/**
 * - Filepath: internal/handlers/discord.go
 * - Filename: discord.go
 */
export type SetDiscordMangaActivity_Variables = {
    title: string
    image: string
    chapter: string
}

/**
 * - Filepath: internal/handlers/download.go
 * - Filename: download.go
 */
export type DownloadTorrentFile_Variables = {
    download_urls: Array<string>
    destination: string
    media: AL_BaseMedia
}

/**
 * - Filepath: internal/handlers/download.go
 * - Filename: download.go
 */
export type DownloadRelease_Variables = {
    download_url: string
    destination: string
}

/**
 * - Filepath: internal/handlers/entries.go
 * - Filename: entries.go
 */
export type GetMediaEntry_Variables = {
    /**
     *  AniList anime media ID
     */
    id: number
}

/**
 * - Filepath: internal/handlers/entries.go
 * - Filename: entries.go
 */
export type MediaEntryBulkAction_Variables = {
    mediaId: number
    action: string
}

/**
 * - Filepath: internal/handlers/entries.go
 * - Filename: entries.go
 */
export type OpenMediaEntryInExplorer_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/entries.go
 * - Filename: entries.go
 */
export type FindProspectiveMediaEntrySuggestions_Variables = {
    dir: string
}

/**
 * - Filepath: internal/handlers/entries.go
 * - Filename: entries.go
 */
export type MediaEntryManualMatch_Variables = {
    dir: string
    mediaId: number
}

/**
 * - Filepath: internal/handlers/entries.go
 * - Filename: entries.go
 */
export type AddUnknownMedia_Variables = {
    mediaIds: Array<number>
}

/**
 * - Filepath: internal/handlers/entries.go
 * - Filename: entries.go
 */
export type UpdateProgress_Variables = {
    mediaId: number
    malId: number
    episodeNumber: number
    totalEpisodes: number
}

/**
 * - Filepath: internal/handlers/explorer.go
 * - Filename: explorer.go
 */
export type OpenInExplorer_Variables = {
    path: string
}

/**
 * - Filepath: internal/handlers/filecache.go
 * - Filename: filecache.go
 */
export type RemoveFileCacheBucket_Variables = {
    bucket: string
}

/**
 * - Filepath: internal/handlers/list_sync.go
 * - Filename: list_sync.go
 */
export type SyncAnime_Variables = {
    kind: ListSync_AnimeDiffKind
}

/**
 * - Filepath: internal/handlers/localfiles.go
 * - Filename: localfiles.go
 */
export type LocalFileBulkAction_Variables = {
    action: string
}

/**
 * - Filepath: internal/handlers/localfiles.go
 * - Filename: localfiles.go
 */
export type UpdateLocalFileData_Variables = {
    path: string
    metadata: Anime_LocalFileMetadata
    locked: boolean
    ignored: boolean
    mediaId: number
}

/**
 * - Filepath: internal/handlers/localfiles.go
 * - Filename: localfiles.go
 */
export type DeleteLocalFiles_Variables = {
    paths: Array<string>
}

/**
 * - Filepath: internal/handlers/mal.go
 * - Filename: mal.go
 */
export type MALAuth_Variables = {
    code: string
    state: string
    code_verifier: string
}

/**
 * - Filepath: internal/handlers/mal.go
 * - Filename: mal.go
 */
export type EditMALListEntryProgress_Variables = {
    mediaId: number
    progress: number
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 */
export type GetAnilistMangaCollection_Variables = {
    bypassCache: boolean
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 */
export type GetMangaEntry_Variables = {
    /**
     *  AniList manga media ID
     */
    id: number
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 */
export type GetMangaEntryDetails_Variables = {
    /**
     *  AniList manga media ID
     */
    id: number
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 */
export type EmptyMangaEntryCache_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 */
export type GetMangaEntryChapters_Variables = {
    mediaId: number
    provider: Manga_Provider
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 */
export type GetMangaEntryPages_Variables = {
    mediaId: number
    provider: Manga_Provider
    chapterId: string
    doublePage: boolean
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 */
export type AnilistListManga_Variables = {
    page: number
    search: string
    perPage: number
    sort: Array<AL_MediaSort>
    status: Array<AL_MediaStatus>
    genres: Array<string>
    averageScore_greater: number
    year: number
    isAdult: boolean
    format: AL_MediaFormat
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 */
export type UpdateMangaProgress_Variables = {
    mediaId: number
    malId: number
    chapterNumber: number
    totalChapters: number
}

/**
 * - Filepath: internal/handlers/manga_download.go
 * - Filename: manga_download.go
 */
export type DownloadMangaChapters_Variables = {
    mediaId: number
    provider: Manga_Provider
    chapterIds: Array<string>
    startNow: boolean
}

/**
 * - Filepath: internal/handlers/manga_download.go
 * - Filename: manga_download.go
 */
export type GetMangaDownloadData_Variables = {
    mediaId: number
    cached: boolean
}

/**
 * - Filepath: internal/handlers/manga_download.go
 * - Filename: manga_download.go
 */
export type DeleteMangaChapterDownload_Variables = {
    mediaId: number
    provider: string
    chapterId: string
    chapterNumber: string
}

/**
 * - Filepath: internal/handlers/mediaplayer.go
 * - Filename: mediaplayer.go
 */
export type PlayVideo_Variables = {
    path: string
}

/**
 * - Filepath: internal/handlers/metadata.go
 * - Filename: metadata.go
 */
export type PopulateTVDBEpisodes_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/metadata.go
 * - Filename: metadata.go
 */
export type EmptyTVDBEpisodes_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/offline.go
 * - Filename: offline.go
 */
export type CreateOfflineSnapshot_Variables = {
    animeMediaIds: Array<number>
}

/**
 * - Filepath: internal/handlers/offline.go
 * - Filename: offline.go
 */
export type UpdateOfflineEntryListData_Variables = {
    mediaId: number
    status: AL_MediaListStatus
    score: number
    progress: number
    startDate: string
    endDate: string
    type: string
}

/**
 * - Filepath: internal/handlers/onlinestream.go
 * - Filename: onlinestream.go
 */
export type GetOnlineStreamEpisodeList_Variables = {
    mediaId: number
    dubbed: boolean
    provider: string
}

/**
 * - Filepath: internal/handlers/onlinestream.go
 * - Filename: onlinestream.go
 */
export type GetOnlineStreamEpisodeSource_Variables = {
    episodeNumber: number
    mediaId: number
    provider: string
    dubbed: boolean
}

/**
 * - Filepath: internal/handlers/onlinestream.go
 * - Filename: onlinestream.go
 */
export type OnlineStreamEmptyCache_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/playback_manager.go
 * - Filename: playback_manager.go
 */
export type PlaybackStartPlaylist_Variables = {
    dbId: number
}

/**
 * - Filepath: internal/handlers/playlist.go
 * - Filename: playlist.go
 */
export type CreatePlaylist_Variables = {
    name: string
    paths: Array<string>
}

/**
 * - Filepath: internal/handlers/playlist.go
 * - Filename: playlist.go
 */
export type UpdatePlaylist_Variables = {
    dbId: number
    name: string
    paths: Array<string>
}

/**
 * - Filepath: internal/handlers/playlist.go
 * - Filename: playlist.go
 */
export type DeletePlaylist_Variables = {
    dbId: number
}

/**
 * - Filepath: internal/handlers/playlist.go
 * - Filename: playlist.go
 */
export type GetPlaylistEpisodes_Variables = {
    /**
     *  The ID of the media entry.
     */
    id: number
    /**
     *  The progress of the media entry.
     */
    progress: number
}

/**
 * - Filepath: internal/handlers/settings.go
 * - Filename: settings.go
 */
export type SaveSettings_Variables = {
    library: Models_LibrarySettings
    mediaPlayer: Models_MediaPlayerSettings
    torrent: Models_TorrentSettings
    anilist: Models_AnilistSettings
    discord: Models_DiscordSettings
}

/**
 * - Filepath: internal/handlers/silenced_media_entries.go
 * - Filename: silenced_media_entries.go
 */
export type GetMediaEntrySilenceStatus_Variables = {
    /**
     *  The ID of the media entry.
     */
    id: number
}

/**
 * - Filepath: internal/handlers/silenced_media_entries.go
 * - Filename: silenced_media_entries.go
 */
export type ToggleMediaEntrySilenceStatus_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/torrent_client.go
 * - Filename: torrent_client.go
 */
export type TorrentClientAction_Variables = {
    hash: string
    action: string
    dir: string
}

/**
 * - Filepath: internal/handlers/torrent_client.go
 * - Filename: torrent_client.go
 */
export type TorrentClientDownload_Variables = {
    urls: Array<string>
    destination: string
    smartSelect: any
    media: AL_BaseMedia
}

/**
 * - Filepath: internal/handlers/torrent_client.go
 * - Filename: torrent_client.go
 */
export type TorrentClientAddMagnetFromRule_Variables = {
    magnetUrl: string
    ruleId: number
    queuedItemId: number
}

/**
 * - Filepath: internal/handlers/torrent_search.go
 * - Filename: torrent_search.go
 */
export type TorrentSearch_Variables = {
    smartSearch: boolean
    query: string
    episodeNumber: number
    batch: boolean
    media: AL_BaseMedia
    absoluteOffset: number
    resolution: string
    best: boolean
}

/**
 * - Filepath: internal/handlers/torrent_search.go
 * - Filename: torrent_search.go
 */
export type NsfwTorrentSearch_Variables = {
    query: string
}

