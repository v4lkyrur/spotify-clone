import React from 'react'

function AlbumsSearchResults({ items }) {
	let elements = items.map((item) => item = (
		<div className='album-item'>
			<img src={item.images[0] ? item.images[0].url : ''} alt='album' className='album-image' />
			<p className='album-name'> {item.name} </p>
			<p className='album-artist'> {item.artists.map((artist) => artist.name).join(', ')} </p>			
		</div>
	))

	return (
		<div className='albums-results'>
			<div className='albums-results-header'>
				<h1 className='albums-results-title'> Albums </h1>
			</div>
			<div className='albums-results-list'>
				{ elements }
			</div>
		</div>
	)
}

export default AlbumsSearchResults