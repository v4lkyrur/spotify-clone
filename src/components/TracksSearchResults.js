import React from 'react'
import { msToMinAndSec } from '../helperFunctions'

function TracksSearchResults({ items }) {
	let elements = items.map((item) => item = (
		<div className='track-item'>
			<div className='track-item-left'>
				<img src={item.album.images[2] ? item.album.images[2].url : ''} alt='cover' className='track-image' />
				<p className='track-name'> {item.name} </p>
				<p className='track-artist'> {item.artists.map((artist) => artist.name).join(', ')} </p>			
			</div>

			<div className='track-item-right'>
				<p className='track-duration'> {msToMinAndSec(item.duration_ms)} </p>
			</div>
		</div>
	))

	return (
		<div className='tracks-results'>
			<div className='tracks-results-header'>
				<h1 className='tracks-results-title'> Tracks </h1>
			</div>
			<div className='tracks-results-list'>
				{ elements }
			</div>
		</div>
	)
}

export default TracksSearchResults