package qbittorrent_application

import (
	"github.com/rs/zerolog"
	"github.com/seanime-app/seanime-server/internal/qbittorrent"
	"github.com/seanime-app/seanime-server/internal/qbittorrent/model"
	"net/http"
)

type Client struct {
	BaseUrl string
	Client  *http.Client
	Logger  *zerolog.Logger
}

func (c Client) GetAppVersion() (string, error) {
	var res string
	if err := qbittorrent.GetInto(c.Client, &res, c.BaseUrl+"/version", nil); err != nil {
		return "", err
	}
	return res, nil
}

func (c Client) GetAPIVersion() (string, error) {
	var res string
	if err := qbittorrent.GetInto(c.Client, &res, c.BaseUrl+"/webapiVersion", nil); err != nil {
		return "", err
	}
	return res, nil
}

func (c Client) GetBuildInfo() (*qbittorrent_model.BuildInfo, error) {
	var res qbittorrent_model.BuildInfo
	if err := qbittorrent.GetInto(c.Client, &res, c.BaseUrl+"/buildInfo", nil); err != nil {
		return nil, err
	}
	return &res, nil
}

func (c Client) GetAppPreferences() (*qbittorrent_model.Preferences, error) {
	var res qbittorrent_model.Preferences
	if err := qbittorrent.GetInto(c.Client, &res, c.BaseUrl+"/preferences", nil); err != nil {
		return nil, err
	}
	return &res, nil
}

func (c Client) SetAppPreferences(p *qbittorrent_model.Preferences) error {
	if err := qbittorrent.Post(c.Client, c.BaseUrl+"/setPreferences", p); err != nil {
		return err
	}
	return nil
}

func (c Client) GetDefaultSavePath() (string, error) {
	var res string
	if err := qbittorrent.GetInto(c.Client, &res, c.BaseUrl+"/defaultSavePath", nil); err != nil {
		return "", err
	}
	return res, nil
}
