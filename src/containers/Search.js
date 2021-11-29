import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TracksSearchResults from '../components/TracksSearchResults'
import ArtistsSearchResults from '../components/ArtistsSearchResults'
import AlbumsSearchResults from '../components/AlbumsSearchResults'
import PlaylistsSearchResults from '../components/PlaylistsSearchResults'
import Categories from '../components/Categories'

import { setCategories, selectCategoriesItems } from '../slices/categoriesSlice'
import { setSearchResults, selectSearchResults } from '../slices/searchResultsSlice'

import './Search.css'

function Search({ spotify }) {
	const dispatch = useDispatch();
	const [headerColor, setHeaderColor] = useState('rgb(33, 33, 33, 0)');

	useEffect(() => {
		spotify.getCategories({country: 'BY', limit: 50, locale: 'en_US'}).then((categories) => {
			dispatch(setCategories(categories))
			console.log(categories)
		});

		document.addEventListener("scroll", () => {
    	const color = window.scrollY < 100 ? "rgb(33, 33, 33, 0)" : "rgb(33, 33, 33, 1)";
    	setHeaderColor(color);
    });
	}, [])

	const searchInputChangeHandler = (event) => {
		if (event.target.value) {
			spotify.search(event.target.value, ['album', 'artist', 'track', 'playlist']).then((results) => {
				console.log(results);
				dispatch(setSearchResults(results));	
				spotify.getGeneric("https://api.spotify.com/v1/browse/categories/pop").then((r) => {console.log(r)})		
			});
		} else {
			dispatch(setSearchResults(null));
		}
	}

	let searchResults = useSelector(selectSearchResults);
	let categoriesItems = useSelector(selectCategoriesItems);

	return (
		<div>
			<div className='search-header' style={{backgroundColor: headerColor}}>
				<input type='search' className='search-input' placeholder='Artist, track or podcast' onChange={searchInputChangeHandler} />
			</div>

			{ searchResults ? (
				<div className='search-results-container'>
					{ searchResults.tracks.items[0] && <TracksSearchResults items={ searchResults.tracks.items } /> }
					{ searchResults.artists.items[0] && <ArtistsSearchResults items={searchResults.artists.items } /> }
					{ searchResults.albums.items[0] && <AlbumsSearchResults items={searchResults.albums.items } /> }
					{ searchResults.playlists.items[0] && <PlaylistsSearchResults items={searchResults.playlists.items } /> }
				</div>
			) : (
				categoriesItems[0] && <Categories items={categoriesItems} />
			) }
		</div>
	)
}

export default Search