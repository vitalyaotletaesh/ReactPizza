import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import cartEmptyIcon from '../assets/img/empty-cart.png'
import {
	SortPropertyEnum,
	setCategory,
	setPage,
	setSort,
} from '../redux'
import { setSearchValue } from '../redux'

const CartEmpty: React.FC = () => {
	const dispatch = useDispatch()
	const handleClickBack = () => {
		dispatch(setCategory(0))
		dispatch(setPage(1))
		dispatch(
			setSort({
				name: 'популярности',
				sortProperty: SortPropertyEnum.RATING,
			})
		)
		dispatch(setSearchValue(''))
	}

	return (
		<div className='cart cart--empty'>
			<h2>
				Корзина пустая <span>😕</span>
			</h2>
			<p>
				Вероятней всего, вы не заказывали ещё пиццу.
				<br />
				Для того, чтобы заказать пиццу, перейди на главную страницу.
			</p>
			<img src={cartEmptyIcon} alt='Empty cart' />
			<Link to={'/'} className='button button--black' onClick={handleClickBack}>
				<span>Вернуться назад</span>
			</Link>
		</div>
	)
}

export default CartEmpty
