import { configureStore } from '@reduxjs/toolkit'

import sessionReducer from '../slices/sessionSlice'
import playbackReducer from '../slices/playbackSlice'
import playlistsReducer from '../slices/playlistsSlice'
import categoriesReducer from '../slices/categoriesSlice'
import searchResultsReducer from '../slices/searchResultsSlice'

export default configureStore({
	reducer: {
		session: sessionReducer,
		playback: playbackReducer,
		playlists: playlistsReducer,
		categories: categoriesReducer,
		searchResults: searchResultsReducer
	}
})