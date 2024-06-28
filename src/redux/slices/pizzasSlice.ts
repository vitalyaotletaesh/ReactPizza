import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'
import { SortType } from './filterSlice'

// type FetchPizzasRes = {
// 	id: number
// 	title: string
// 	price: number
// 	imageUrl: string
// 	sizes: number[]
// 	types: number[]
// 	rating: number
// 	category: number
// }

type FetchPizzasParams = {
	page: number
	category: string
	sortType: SortType
	searchValue: string
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasParams>(
	'pizzas/fetchPizzasStatus',
	async (params) => {
		const { data } = await axios.get<PizzaItem[]>(
			`https://65f56b2df54db27bc0231977.mockapi.io/items?page=${params.page}&limit=4&${params.category}&sortBy=${params.sortType.sortProperty}&orderBy=desc${params.searchValue}`
		)
		return data
	}
)

export const fetchPizzaById = createAsyncThunk(
	'pizzas/fetchPizzaById',
	async (pizzaId: number) => {
		const { data } = await axios.get(
			`https://65f56b2df54db27bc0231977.mockapi.io/items?id=${pizzaId}`
		)
		return data
	}
)

type PizzaItem = {
	id: number
	title: string
	price: number
	imageUrl: string
	size: number
	type: number
}

interface PizzasSliceState {
	items: PizzaItem[]
	status: Status
	pizza: PizzaItem
}

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

export const selectPizzas = (state: RootState) => state.pizzas
export const selectPizzaById = (state: RootState) => state.pizzas.pizza

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
