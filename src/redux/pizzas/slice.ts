import { createSlice } from '@reduxjs/toolkit'
import { PizzasSliceState, Status } from './types'
import { fetchPizzaById, fetchPizzas } from './actions'

const initialState: PizzasSliceState = {
	items: [],
	status: Status.LOADING,
	pizza: {
		id: 1,
		title: 'string',
		price: 1,
		imageUrl: 'string',
		size: 1,
		type: 1,
	},
}

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = Status.LOADING
				state.items = []
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = Status.ERROR
				state.items = []
			})
		builder
			.addCase(fetchPizzaById.pending, (state) => {
				state.status = Status.LOADING
				state.pizza = {
					id: 1,
					title: 'string',
					price: 1,
					imageUrl: 'string',
					size: 1,
					type: 1,
				}
			})
			.addCase(fetchPizzaById.fulfilled, (state, action) => {
				state.pizza = action?.payload[0]
				state.status = Status.SUCCESS
			})
			.addCase(fetchPizzaById.rejected, (state) => {
				state.status = Status.ERROR
				state.pizza = {
					id: 1,
					title: 'string',
					price: 1,
					imageUrl: 'string',
					size: 1,
					type: 1,
				}
			})
	},
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer