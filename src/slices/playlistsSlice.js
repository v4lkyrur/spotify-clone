import { createSlice } from '@reduxjs/toolkit'

export const playlistsSlice = createSlice({
	name: 'playlists',
	initialState: {
		items: []
	},
	reducers: {
		setPlaylists(state, action) {
			return action.payload
		}
	}
})

export const selectPlaylistsItems = (state) => state.playlists.items

export const { setPlaylists } = playlistsSlice.actions
export default playlistsSlice.reducer