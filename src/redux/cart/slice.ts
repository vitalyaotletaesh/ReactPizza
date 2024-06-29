import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CalcTotalPrice, getCartFromLS } from '../../utils/getCartFromLS'
import { CartSliceState, ItemsObj } from './types'

const cartData = getCartFromLS()

const initialState: CartSliceState = {
	items: cartData.items,
	totalPrice: cartData.totalPrice,
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
			state.totalPrice = CalcTotalPrice(state.items)
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
			state.totalPrice = CalcTotalPrice(state.items)
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
			state.totalPrice = CalcTotalPrice(state.items)
		},
		clearItems: (state) => {
			state.items = []
			state.totalPrice = 0
		},
	},
})

export const { addItem, removeItem, clearItems, reduceItemCount } =
	cartSlice.actions

export default cartSlice.reducer
