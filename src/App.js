import React, { useEffect } from 'react'
import './App.css';
import Login from './Login.js'
import { getTokenFromURL } from './spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import Player from './Player'

import { useDispatch, useSelector } from 'react-redux'
import store from './store'

const spotify = new SpotifyWebApi();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = getTokenFromURL();
    window.location.hash = '';
    const token = hash.access_token;

    if (token) {
      dispatch({type: 'setToken', payload: token})
      spotify.setAccessToken(token);
      spotify.getMe().then(user => {       
        dispatch({type: 'setUser', payload: user});
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({type: 'setPlaylists', payload: playlists});
      });
    }
  }, []);

  console.log(store.getState().user);
  
  return (
    <div className="App">
      {useSelector((state) => state.token) ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
