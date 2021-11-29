import React from 'react'

function PlaylistsSearchResults({ items }) {
	let elements = items.map((item) => item = (
		<div className='playlist-item'>
			<img src={item.images[0] ? item.images[0].url : ''} alt='playlist' className='playlist-image' />
			<p className='playlist-name'> {item.name} </p>
			<p className='playlist-owner'> Owner: {item.owner.display_name} </p>			
		</div>
	))

	return (
		<div className='playlists-results'>
			<div className='playlists-results-header'>
				<h1 className='playlists-results-title'> Playlists </h1>
			</div>
			<div className='playlists-results-list'>
				{ elements }
			</div>
		</div>
	)
}

export default PlaylistsSearchResults