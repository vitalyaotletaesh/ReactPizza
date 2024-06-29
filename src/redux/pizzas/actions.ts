import { createAsyncThunk } from '@reduxjs/toolkit'
import { FetchPizzasParams, PizzaItem } from './types'
import axios from 'axios'

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