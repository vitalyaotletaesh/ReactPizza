import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface SearchSliceState {
	search: string
}

const initialState: SearchSliceState = {
	search: '',
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.search = action.payload
		},
	},
})

export const selectSearch = (state: RootState) => state.search

export const { setSearchValue } = searchSlice.actions

export default searchSlice.reducer
