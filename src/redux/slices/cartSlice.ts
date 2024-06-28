import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type ItemsObj = {
	title: string
	imageUrl: string
	type: string
	size: number
	id: number
	count: number
	price: number
}

interface CartSliceState {
	totalPrice: number
	items: ItemsObj[]
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<ItemsObj>) => {
			const findItem = state.items.find(
				(obj) =>
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
			)

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}

			// Пересчет общей стоимости
			state.totalPrice = state.items.reduce((sum, item) => {
				return (sum += item.price * item.count)
			}, 0)
		},
		removeItem: (state, action: PayloadAction<ItemsObj>) => {
			state.items = state.items.filter(
				(obj) =>
					!(
						obj.id === action.payload.id &&
						obj.type === action.payload.type &&
						obj.size === action.payload.size
					)
			)

			// Пересчет общей стоимости
			state.totalPrice = state.items.reduce((sum, item) => {
				return (sum += item.price * item.count)
			}, 0)
		},
		reduceItemCount: (state, action: PayloadAction<ItemsObj>) => {
			const searchItem: ItemsObj | undefined = state.items.find(
				(obj) =>
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
			)

			if (searchItem) {
				if (searchItem.count > 1) {
					searchItem.count--
				} else {
					state.items = state.items.filter((item) => item !== searchItem)
				}
			}

			// Пересчет общей стоимости
			state.totalPrice = state.items.reduce((sum, item) => {
				return (sum += item.price * item.count)
			}, 0)
		},
		clearItems: (state) => {
			state.items = []
			state.totalPrice = 0
		},
	},
})

export const selectCart = (state: RootState) => state.cart

export const { addItem, removeItem, clearItems, reduceItemCount } =
	cartSlice.actions

export default cartSlice.reducer
