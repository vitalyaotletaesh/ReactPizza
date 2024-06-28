import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchPizzaById, selectPizzaById } from '../redux/slices/pizzasSlice'
import { useAppDispatch } from '../redux/store'

const PizzaInfo: React.FC = () => {
	const dispatch = useAppDispatch()
	const { imageUrl, title, price } = useSelector(selectPizzaById)
	const { id } = useParams()

	useEffect(() => {
		// @ts-ignore
		dispatch(fetchPizzaById(id))
	}, [])

	return (
		<div className='container'>
			<div className='pizza-info'>
				<div className='pizza-info_block'>
					<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
					<h4 className='pizza-block__title'>{title}</h4>
					<div className='pizza-block__price'>от {price} ₽</div>
				</div>
			</div>
		</div>
	)
}

export default PizzaInfo
