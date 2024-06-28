import debounce from 'lodash.debounce'
import { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/searchSlice'
import styles from './search.module.scss'

export const Search: React.FC = () => {
	const [inputValue, setInputValue] = useState<string>('')
	const dispatch = useDispatch()
	const inputRef = useRef<HTMLInputElement>(null)

	const saveInputUpdate = useCallback(
		debounce((value: any) => {
			dispatch(setSearchValue(value))
		}, 250),
		[]
	)

	const onChangeInput = (value: string): void => {
		setInputValue(value)
		saveInputUpdate(value)
	}

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				fill='none'
				height='24'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				viewBox='0 0 24 24'
				width='24'
			>
				<circle cx='11' cy='11' r='8' />
				<line x1='21' x2='16.65' y1='21' y2='16.65' />
			</svg>
			<input
				ref={inputRef}
				value={inputValue}
				onChange={(e) => onChangeInput(e.target.value)}
				className={styles.input}
				placeholder='Поиск пиццы...'
			/>
		</div>
	)
}

export default Search
