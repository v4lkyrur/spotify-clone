export const selectUser = (state) => state.user;

const initialState = {
	user: null,
	playlists: {},
	playing: false,
	item: null,
	//token: 'BQDeqeYRC-kzCjBaXpB7G0HrT0VxghoVqolLQMS-ZQzzBl2fnB…_Ns5vNEGsv8Dr0Z5vwobKy96IsCT1SQP0ivh-RPnyRhEOBO1K',
	bodyContent: 'Home',
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
	containsSavedTracks: false,
	volume: 100,
	categories: {
		items: []
	},
	searchResults: null
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'setUser': 
			return {...state, user: action.payload}
		case 'setToken':
			return {...state, token: action.payload}
		case 'setBodyContent':
			return {...state, bodyContent: action.payload}
		case 'setPlaylists':
			return {...state, playlists: action.payload}
		case 'setPlaybackState':
			return {...state, playbackState: action.payload}
		case 'setContainsSavedTracks':
			return {...state, containsSavedTracks: action.payload[0]}
		case 'setVolume':
			return {...state, volume: action.payload}
		case 'setCategories':
			return {...state, categories: action.payload.categories}
		case 'setSearchResults':
			return {...state, searchResults: action.payload}
		default: 
			return state
	}
}

export default rootReducer;