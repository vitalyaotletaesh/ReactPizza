import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'
import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilter, setCategory } from '../redux/slices/filterSlice'

const categories: string[] = [
	'Все',
	'Мясные',
	'Вегетарианские',
	'Гриль',
	'Острые',
	'Сырные',
]

const Categories: React.FC = memo(() => {
	const { categoryId } = useSelector(selectFilter)
	const dispatch = useDispatch()

	const onCategoryClick = useCallback((index: number): void => {
		dispatch(setCategory(index))
	}, [])

	return (
		<div className='categories'>
			<ul>
				{categories.map((category, index) => (
					<li
						key={index}
						className={categoryId === index ? 'active' : ''}
						onClick={() => onCategoryClick(index)}
					>
						{category}
					</li>
				))}
			</ul>
		</div>
	)
})

export default Categories
