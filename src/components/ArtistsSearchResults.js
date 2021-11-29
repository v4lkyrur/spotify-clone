import React from 'react'

function ArtistsSearchResults({ items }) {
	let elements = items.map((item) => item = (
		<div className='artist-item'>
			<img src={item.images[0] ? item.images[0].url : ''} alt='artist' className='artist-image' />
			<p className='artist-name'> {item.name} </p>
			<p className='artist-caption'> Artist </p>			
		</div>
	))

	return (
		<div className='artists-results'>
			<div className='artists-results-header'>
				<h1 className='artists-results-title'> Artists </h1>
			</div>
			<div className='artists-results-list'>
				{ elements }
			</div>
		</div>
	)

}

export default ArtistsSearchResults