import { selectCart } from './cart/selectors'
import { addItem, clearItems, reduceItemCount, removeItem } from './cart/slice'
import { CartSliceState, ItemsObj } from './cart/types'
import { selectFilter } from './filter/selectors'
import { setCategory, setFilters, setPage, setSort } from './filter/slice'
import { FilterSliceState, SortPropertyEnum, SortType } from './filter/types'
import { fetchPizzaById, fetchPizzas } from './pizzas/actions'
import { selectPizzaById, selectPizzas } from './pizzas/selectors'
import { setItems } from './pizzas/slice'
import {
	FetchPizzasParams,
	PizzaItem,
	PizzasSliceState,
	Status,
} from './pizzas/types'
import { selectSearch } from './search/selectors'
import { setSearchValue } from './search/slice'
import { SearchSliceState } from './search/types'

export {
	SortPropertyEnum,
	addItem,
	clearItems,
	fetchPizzaById,
	fetchPizzas,
	reduceItemCount,
	removeItem,
	selectCart,
	selectFilter,
	selectPizzaById,
	selectPizzas,
	selectSearch,
	setCategory,
	setFilters,
	setItems,
	setPage,
	setSearchValue,
	setSort,
}
export type {
	CartSliceState,
	FetchPizzasParams,
	FilterSliceState,
	ItemsObj,
	PizzaItem,
	PizzasSliceState,
	SearchSliceState,
	SortType,
	Status,
}
