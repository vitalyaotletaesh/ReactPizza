export enum SortPropertyEnum {
	RATING = 'rating',
	PRICE = 'price',
	TITLE = 'title'
}

export type SortType = {
	name: string
	sortProperty: SortPropertyEnum
}

export interface FilterSliceState {
	categoryId: number
	page: number
	sortType: SortType
}