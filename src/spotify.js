// https://developer.spotify.com/

export const authEndpoint = 'http://accounts.spotify.com/authorize';
const redirectURI = 'http://localhost:3000/';
const clientID = '516b042374234a7fa366be1c68d400bc';

const scopes = [
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-read-playback-state',
	'user-top-read',
	'user-modify-playback-state',
	'user-library-read'
];

export const getTokenFromURL = () => {
	return window.location.hash
		.substring(1)
		.split('&')
		.reduce((init, item) => {
			let parts = item.split('=');
			init[parts[0]] = decodeURIComponent(parts[1]);

			return init
		}, {})
}

export const loginURL = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;