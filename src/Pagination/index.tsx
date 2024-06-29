import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import { setPage } from '../redux'
import styles from './Pagination.module.scss'

const Pagination: React.FC = () => {
	const dispatch = useDispatch()

	return (
		<ReactPaginate
			className={styles.root}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			onPageChange={(e) => dispatch(setPage(e.selected + 1))}
			pageRangeDisplayed={4}
			pageCount={3}
			renderOnZeroPageCount={null}
		/>
	)
}

export default Pagination
