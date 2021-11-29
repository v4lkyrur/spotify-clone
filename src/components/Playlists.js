import React from 'react'
import { useSelector } from 'react-redux'
import './Playlists.css'

import { selectPlaylistsItems } from '../slices/playlistsSlice'

function Playlists() {
	const playlists = useSelector(selectPlaylistsItems)
	const playlistElements = playlists ? 
		playlists.map((playlist) => playlist = (<button className='playlist'> {playlist.name} </button>)) : '';
	console.log(playlists)

	return (
		<div>
			{ playlistElements }
		</div>
	)
}

export default Playlists