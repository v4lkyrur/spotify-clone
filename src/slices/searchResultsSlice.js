import { createSlice } from '@reduxjs/toolkit'

export const searchResultsSlice = createSlice({
	name: 'searchResults',
	initialState: null,
	reducers: {
		setSearchResults(state, action) {
			return action.payload
		}
	}
})

export const selectSearchResults = (state) => state.searchResults

export const selectAlbums = (state) => state.searchResults.albums

export const selectArtists = (state) => state.searchResults.artists

export const selectPlaylists = (state) => state.searchResults.playlists

export const selectTracks = (state) => state.searchResults.tracks

export const { setSearchResults } = searchResultsSlice.actions
export default searchResultsSlice.reducer