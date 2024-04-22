package handlers

import (
	"errors"
	"github.com/seanime-app/seanime/internal/database/models"
	"runtime"
	"time"
)

// HandleGetSettings
//
//	@summary returns the app settings.
//	@route /api/v1/settings [GET]
//	@returns models.Settings
func HandleGetSettings(c *RouteCtx) error {

	settings, err := c.App.Database.GetSettings()
	if err != nil {
		return c.RespondWithError(err)
	}
	if settings.ID == 0 {
		return c.RespondWithError(errors.New(runtime.GOOS))
	}

	return c.RespondWithData(settings)
}

// HandleSaveSettings
//
//	@summary updates the app settings.
//	@desc This will update the app settings.
//	@desc The client should re-fetch the server status after this.
//	@route /api/v1/settings [POST]
//	@returns handlers.Status
func HandleSaveSettings(c *RouteCtx) error {

	type body struct {
		Library     models.LibrarySettings     `json:"library"`
		MediaPlayer models.MediaPlayerSettings `json:"mediaPlayer"`
		Torrent     models.TorrentSettings     `json:"torrent"`
		Anilist     models.AnilistSettings     `json:"anilist"`
		Discord     models.DiscordSettings     `json:"discord"`
	}
	var b body

	if err := c.Fiber.BodyParser(&b); err != nil {
		return c.RespondWithError(err)
	}

	listSyncSettings := &models.ListSyncSettings{}
	autoDownloaderSettings := &models.AutoDownloaderSettings{}
	prevSettings, err := c.App.Database.GetSettings()
	if err == nil && prevSettings.ListSync != nil {
		listSyncSettings = prevSettings.ListSync
	}
	if err == nil && prevSettings.AutoDownloader != nil {
		autoDownloaderSettings = prevSettings.AutoDownloader
	}

	settings, err := c.App.Database.UpsertSettings(&models.Settings{
		BaseModel: models.BaseModel{
			ID:        1,
			UpdatedAt: time.Now(),
		},
		Library:        &b.Library,
		MediaPlayer:    &b.MediaPlayer,
		Torrent:        &b.Torrent,
		Anilist:        &b.Anilist,
		Discord:        &b.Discord,
		ListSync:       listSyncSettings,
		AutoDownloader: autoDownloaderSettings,
	})

	if err != nil {
		return c.RespondWithError(err)
	}

	c.App.WSEventManager.SendEvent("settings", settings)

	status := NewStatus(c)

	// Refresh modules that depend on the settings
	c.App.InitOrRefreshModules()

	return c.RespondWithData(status)
}

// HandleSaveListSyncSettings
//
//	@summary updates the list sync settings
//	@desc This will update the ListSync settings and clear the ListSync cache.
//	@route /api/v1/settings/list-sync [PATCH]
//	@returns bool
func HandleSaveListSyncSettings(c *RouteCtx) error {

	body := new(models.ListSyncSettings)

	if err := c.Fiber.BodyParser(body); err != nil {
		return c.RespondWithError(err)
	}

	prevSettings, err := c.App.Database.GetSettings()
	if err != nil {
		return c.RespondWithError(err)
	}

	_, err = c.App.Database.UpsertSettings(&models.Settings{
		BaseModel: models.BaseModel{
			ID:        1,
			UpdatedAt: time.Now(),
		},
		Library:        prevSettings.Library,
		MediaPlayer:    prevSettings.MediaPlayer,
		Torrent:        prevSettings.Torrent,
		Anilist:        prevSettings.Anilist,
		AutoDownloader: prevSettings.AutoDownloader,
		Discord:        prevSettings.Discord,
		ListSync: &models.ListSyncSettings{
			Automatic: body.Automatic,
			Origin:    body.Origin,
		},
	})

	if err != nil {
		return c.RespondWithError(err)
	}

	c.App.ListSyncCache.Delete(0)

	// DEVNOTE: Refetch server status from client

	return c.RespondWithData(true)
}

// HandleSaveAutoDownloaderSettings
//
//	@summary updates the auto-downloader settings.
//	@route /api/v1/settings/auto-downloader [PATCH]
//	@returns bool
func HandleSaveAutoDownloaderSettings(c *RouteCtx) error {

	body := new(models.AutoDownloaderSettings)

	if err := c.Fiber.BodyParser(body); err != nil {
		return c.RespondWithError(err)
	}

	prevSettings, err := c.App.Database.GetSettings()
	if err != nil {
		return c.RespondWithError(err)
	}

	// Validation
	if body.Interval < 2 {
		return c.RespondWithError(errors.New("interval must be at least 2 minutes"))
	}

	autoDownloaderSettings := &models.AutoDownloaderSettings{
		Provider:              prevSettings.Library.TorrentProvider,
		Interval:              body.Interval,
		Enabled:               body.Enabled,
		DownloadAutomatically: body.DownloadAutomatically,
	}

	_, err = c.App.Database.UpsertSettings(&models.Settings{
		BaseModel: models.BaseModel{
			ID:        1,
			UpdatedAt: time.Now(),
		},
		Library:        prevSettings.Library,
		MediaPlayer:    prevSettings.MediaPlayer,
		Torrent:        prevSettings.Torrent,
		Anilist:        prevSettings.Anilist,
		ListSync:       prevSettings.ListSync,
		Discord:        prevSettings.Discord,
		AutoDownloader: autoDownloaderSettings,
	})
	if err != nil {
		return c.RespondWithError(err)
	}

	// Update Auto Downloader - This runs in a goroutine
	c.App.AutoDownloader.SetSettings(autoDownloaderSettings, prevSettings.Library.TorrentProvider)

	return c.RespondWithData(true)
}
