import { SortType } from '../filter/types'

export type FetchPizzasParams = {
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

export type PizzaItem = {
	id: number
	title: string
	price: number
	imageUrl: string
	size: number
	type: number
}

export interface PizzasSliceState {
	items: PizzaItem[]
	status: Status
	pizza: PizzaItem
}