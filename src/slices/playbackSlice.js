import { createSlice } from '@reduxjs/toolkit'

export const playbackSlice = createSlice({
	name: 'playback',
	initialState: {
		playbackState: {
			item: {
				album: {
					images: [{url: ''}, {url: ''}, {url: ''}]
				},
				name: '',
				artists: [''],
				duration_ms: 0,			
			},
			progress_ms: 0,
			is_playing: false
		},
		volume: 100,
		containsSavedTracks: false
	},
	reducers: {
		setPlaybackState(state, action) {
			state.playbackState = action.payload
		},
		setVolume(state, action) {
			state.volume = action.payload
		},
		setContainsSavedTracks(state, action) {
			state.containsSavedTracks = action.payload
		},
		setProgress(state, action) {
			state.playbackState.progress_ms = action.payload
		}
	}
})

export const selectIsPlayingState = (state) => state.playback.playbackState.is_playing

export const selectRepeatState = (state) => state.playback.playbackState.repeat_state

export const selectShuffleState = (state) => state.playback.playbackState.shuffle_state

export const selectVolume = (state) => state.playback.volume

export const selectPlaybackItem = (state) => state.playback.playbackState.item

export const selectProgress = (state) => state.playback.playbackState.progress_ms

export const selectContainsSavedTracks = (state) => state.playback.containsSavedTracks

export const { setPlaybackState, setVolume, setContainsSavedTracks, setProgress } = playbackSlice.actions
export default playbackSlice.reducer