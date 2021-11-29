import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
	name: 'session',
	initialState: {
		user: null,
		token: null,
		bodyContent: 'Home'
	},
	reducers: {
		setUser(state, action) {
			state.user = action.payload
		},
		setToken(state, action) {
			state.token = action.payload
		},
		setBodyContent(state, action) {
			state.bodyContent = action.payload
		}
	}
})

export const selectUser = (state) => state.session.user

export const selectToken = (state) => state.session.token

export const selectBodyContent = (state) => state.session.bodyContent

export const { setUser, setToken, setBodyContent } = sessionSlice.actions
export default sessionSlice.reducer