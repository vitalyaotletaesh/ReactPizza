import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FilterSliceState, SortPropertyEnum, SortType } from './types'

const initialState: FilterSliceState = {
	categoryId: 0,
	page: 1,
	sortType: {
		name: 'популярности',
		sortProperty: SortPropertyEnum.RATING,
	},
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
		setSort: (state, action: PayloadAction<SortType>) => {
			state.sortType = action.payload
		},
		setFilters: (state, action: PayloadAction<FilterSliceState>) => {
			state.page = action.payload.page
			state.categoryId = action.payload.categoryId
			state.sortType = action.payload.sortType
		},
	},
})

export const { setCategory, setPage, setSort, setFilters } = filterSlice.actions

export default filterSlice.reducer