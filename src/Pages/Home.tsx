import qs from 'qs'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../Pagination/index.tsx'
import Categories from '../components/Categories.tsx'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock.tsx'
import Skeleton from '../components/PizzaBlock/Skeleton.tsx'
import Sort from '../components/Sort.tsx'
import {
	SortType,
	selectFilter,
	setFilters,
} from '../redux/slices/filterSlice.ts'
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice.ts'
import { selectSearch } from '../redux/slices/searchSlice.ts'
import { useAppDispatch } from '../redux/store.ts'

const Home: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isSearch = useRef<boolean>(false)
	const isMounted = useRef<boolean>(false)
	const { categoryId, page, sortType } = useSelector(selectFilter)
	const { items, status } = useSelector(selectPizzas)
	const { search } = useSelector(selectSearch)

	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const searchValue = search ? `&search=${search}` : ''
		// @ts-ignore
		dispatch(fetchPizzas({ category, searchValue, page, sortType }))
	}

	/** Если это не первый рендер, то вшивает параметры фильтрации в URL */
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortType,
				categoryId,
				page,
			})

			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sortType, page])

	/** При первом рендере проверяем URL, вытаскиваем от туда параметры, сохраняем их в редаксе */
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			dispatch(
				setFilters({
					categoryId: Number(params.categoryId),
					page: Number(params.page),
					sortType: params.sortType as SortType,
				})
			)

			isSearch.current = true
		}
	}, [])

	/** Вызываем getPizzas() на втором и далее рендеринге, чтобы параметры из URL успели сохраниться в редаксе, если они были */
	useEffect(() => {
		if (!isSearch.current) {
			getPizzas()
		}
		isSearch.current = false

		window.scrollTo(0, 0)
	}, [categoryId, sortType, search, page])

	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
	const skeletons = [...new Array(4)].map((_, index) => (
		<Skeleton key={index} />
	))
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='cart cart--empty'>
					<h2>К сожалению питсы не найдены 😕</h2>
				</div>
			) : (
				<>
					<div className='content__items'>
						{status === 'loading' ? skeletons : pizzas}
					</div>
					<Pagination />
				</>
			)}
		</div>
	)
}

export default Home
