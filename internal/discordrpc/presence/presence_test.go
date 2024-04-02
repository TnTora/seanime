package discordrpc_presence

import (
	"github.com/seanime-app/seanime/internal/database/models"
	"github.com/seanime-app/seanime/internal/util"
	"testing"
	"time"
)

func TestPresence(t *testing.T) {

	settings := &models.DiscordSettings{
		EnableRichPresence:      true,
		EnableAnimeRichPresence: true,
		EnableMangaRichPresence: true,
	}

	presence := New(settings, util.NewLogger())

	presence.SetMangaActivity(&MangaActivity{
		Title:         "Boku no Kokoro no Yabai Yatsu",
		Image:         "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx101557-bEJu54cmVYxx.jpg",
		ChapterNumber: 30,
	})

	time.Sleep(10 * time.Second)

	// Simulate settings being updated

	if presence.client != nil {
		presence.Close()
	}
	settings.EnableMangaRichPresence = false
	presence.SetSettings(settings)

	time.Sleep(5 * time.Second)

	presence.SetMangaActivity(&MangaActivity{
		Title:         "Boku no Kokoro no Yabai Yatsu",
		Image:         "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx101557-bEJu54cmVYxx.jpg",
		ChapterNumber: 31,
	})

	// Simulate settings being updated

	if presence.client != nil {
		presence.Close()
	}
	settings.EnableMangaRichPresence = true
	presence.SetSettings(settings)

	time.Sleep(5 * time.Second)

	presence.SetMangaActivity(&MangaActivity{
		Title:         "Boku no Kokoro no Yabai Yatsu",
		Image:         "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx101557-bEJu54cmVYxx.jpg",
		ChapterNumber: 31,
	})

	time.Sleep(10 * time.Second)
}
