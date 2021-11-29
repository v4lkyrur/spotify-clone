import React, { useEffect } from 'react'
import './App.css';
import Login from '../containers/Login.js'
import { getTokenFromURL } from '../spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import Player from '../containers/Player'

import { useDispatch, useSelector } from 'react-redux'
import store from './store'
import { setUser, setToken, selectToken, selectUser } from '../slices/sessionSlice'
import { setPlaylists } from '../slices/playlistsSlice'

const spotify = new SpotifyWebApi();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = getTokenFromURL();
    window.location.hash = '';
    const token = hash.access_token;

    if (token) {
      dispatch(setToken(token))
      spotify.setAccessToken(token);
      spotify.getMe().then(user => {       
        dispatch(setUser(user));
      });

      spotify.getUserPlaylists().then((playlists) => {
        console.log(playlists)
        dispatch(setPlaylists(playlists));
      });
    }
  }, []);

  console.log(useSelector((state) => state));
  
  return (
    <div className="App">
      {useSelector(selectUser) ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
