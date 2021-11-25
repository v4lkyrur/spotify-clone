import React from 'react'
import { useSelector } from 'react-redux'
import './Playlists.css'

function Playlists() {
	const playlists = useSelector((state) => state.playlists)
	const playlistElements = playlists.items ? 
		playlists.items.map((playlist) => playlist = (<button className='playlist'> {playlist.name} </button>)) : '';
	console.log(playlists)

	return (
		<div>
			{playlistElements}
		</div>
	)
}

export default Playlists