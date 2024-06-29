export type ItemsObj = {
	title: string
	imageUrl: string
	type: string
	size: number
	id: number
	count: number
	price: number
}

export interface CartSliceState {
	totalPrice: number
	items: ItemsObj[]
}