import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Search.css'

function Search({ spotify }) {
	const dispatch = useDispatch();
	const [headerColor, setHeaderColor] = useState('rgb(33, 33, 33, 0)');

	useEffect(() => {
		spotify.getCategories({country: 'BY', limit: 50, locale: 'en_US'}).then((categories) => {
			dispatch({type: 'setCategories', payload: categories})
			console.log(categories)
		});

		document.addEventListener("scroll", () => {
      		const color = window.scrollY < 100 ? "rgb(33, 33, 33, 0)" : "rgb(33, 33, 33, 1)";
      		setHeaderColor(color);
      	});
	}, [])

	let categoriesElements = [];
	const categoriesItems = useSelector((state) => state.categories.items);
	if (useSelector((state) => state.categories.items)) {
		categoriesElements = categoriesItems.map((item) => item = (
			<a className='category'>
				<div style={{backgroundImage: `url(${item.icons[0].url})`, backgroundSize: 'contain'}} className='category-div'>
					<h3 className='category-name'> { item.name } </h3>
				</div>
			</a>
		))
	}

	const searchInputChangeHandler = (event) => {
		if (event.target.value) {
			spotify.search(event.target.value, ['album', 'artist', 'track', 'playlist']).then((results) => {
				console.log(results);
				dispatch({type: 'setSearchResults', payload: results});	
				spotify.getGeneric("https://api.spotify.com/v1/browse/categories/pop").then((r) => {console.log(r)})		
			});
		} else {
			dispatch({type: 'setSearchResults', payload: null});
		}
	}

	let searchResults = useSelector((state) => state.searchResults);
	let tracksElements = [];
	let artistsElements = [];
	let albumsElements = [];
	let playlistsElements = [];
	if (searchResults) {
		tracksElements = searchResults.tracks.items.map((item) => item = (
			<div className='track-item'>
				<div className='track-item-left'>
					<img src={item.album.images[2].url} className='track-image' />
					<p className='track-name'> {item.name} </p>
					<p className='track-artist'> {item.artists.map((artist) => artist.name).join(', ')} </p>			
				</div>

				<div className='track-item-right'>
					<p className='track-duration'> {millisToMinutesAndSeconds(item.duration_ms)} </p>
				</div>
			</div>
		))
	}

	return (
		<div>
			<div className='search-header' style={{backgroundColor: headerColor}}>
				<input type='search' className='search-input' placeholder='Artist, track or podcast' onChange={searchInputChangeHandler} />
			</div>

			{ searchResults ? (
				<div className='search-results-container'>
					<div className='tracks-results'>
						<div className='tracks-results-header'>
							<h1 className='tracks-results-title'> Tracks </h1>
						</div>
						<div className='tracks-results-list'>
							{ tracksElements }
						</div>
					</div>

					<div className='artists-results'>
						<h1 className='artists-results-title'> Artists </h1>
						<div className='artists-results-list'>

						</div>
					</div>

					<div className='albums-results'>
						<h1 className='albums-results-title'> Albums </h1>
						<div className='albums-results-list'>

						</div>
					</div>

					<div className='playlists-results'>
						<h1 className='playlists-results-title'> Playlists </h1>
						<div className='playlists-results-list'>

						</div>
					</div>
				</div>
			) : (
				<div className='section'>
					<h1 className='search-section-title'> Categories </h1>
					<div className='categories-container'>
						{ categoriesElements }
					</div>
				</div>
			) }
		</div>
	)
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default Search