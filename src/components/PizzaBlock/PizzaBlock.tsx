import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ItemsObj, addItem, selectCart } from '../../redux/slices/cartSlice'

const typeNames = ['Традиционное', 'Тонкое']

type PizzaBlockProps = {
	id: number
	title: string
	price: number
	imageUrl: string
	sizes: number[]
	types: number[]
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({
	id,
	title,
	price,
	imageUrl,
	sizes,
	types,
}) => {
	const dispatch = useDispatch()
	const [count, setCount] = useState<number>(0)
	const [selectedSize, setSelectedSize] = useState<number>(sizes[0])
	const [selectedType, setSelectedType] = useState<number>(types[0])
	const { items } = useSelector(selectCart)

	const handleOnClick = () => {
		const item: ItemsObj = {
			id,
			title,
			price,
			imageUrl,
			size: selectedSize,
			type: typeNames[selectedType],
			count: 0
		}
		dispatch(addItem(item))
	}

	useEffect(() => {
		setCount(
			items.reduce((count: number, item: any) => {
				if (item.id === id) {
					return (count += item.count)
				} else {
					return count
				}
			}, 0)
		)
	}, [items])

	return (
		<div className='pizza-block'>
			<Link to={`pizza/${id}`}>
				<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
			</Link>
			<h4 className='pizza-block__title'>{title}</h4>
			<div className='pizza-block__selector'>
				<ul>
					{types.map((type, index) => (
						<li
							key={index}
							className={selectedType === type ? 'active' : ''}
							onClick={() => setSelectedType(type)}
						>
							{type === 0 ? 'Традиционное' : 'Тонкое'}
						</li>
					))}
				</ul>
				<ul>
					{sizes.map((size, index) => (
						<li
							key={index}
							className={selectedSize === sizes[index] ? 'active' : ''}
							onClick={() => setSelectedSize(sizes[index])}
						>
							{size} см.
						</li>
					))}
				</ul>
			</div>
			<div className='pizza-block__bottom'>
				<div className='pizza-block__price'>от {price} ₽</div>
				<button
					onClick={handleOnClick}
					className='button button--outline button--add'
				>
					<svg
						width='12'
						height='12'
						viewBox='0 0 12 12'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
							fill='white'
						/>
					</svg>
					<span>Добавить</span>
					{count > 0 ? <i>{count}</i> : ''}
				</button>
			</div>
		</div>
	)
}

export default PizzaBlock
