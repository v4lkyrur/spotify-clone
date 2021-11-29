import { createSlice } from '@reduxjs/toolkit'

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		items: []
	},
	reducers: {
		setCategories(state, action) {
			return action.payload.categories
		}
	}
})

export const selectCategoriesItems = (state) => state.categories.items

export const { setCategories } = categoriesSlice.actions
export default categoriesSlice.reducer