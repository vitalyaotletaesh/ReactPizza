import { ItemsObj } from '../redux/cart/types'

export const getCartFromLS = () => {
	const data = localStorage.getItem('cart')

	const items: ItemsObj[] = data ? JSON.parse(data) : []
	const totalPrice = CalcTotalPrice(items)

	return { items, totalPrice }
}

export const CalcTotalPrice = (items: ItemsObj[]) => {
	return items.reduce((sum, item) => {
		return (sum += item.price * item.count)
	}, 0)
}
