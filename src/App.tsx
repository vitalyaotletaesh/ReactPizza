import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from './Pages/Cart'
import Home from './Pages/Home'
import PizzaInfo from './Pages/PizzaInfo'
import Header from './components/Header.tsx'
import './scss/app.scss'

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='cart' element={<Cart />} />
					<Route path='pizza/:id' element={<PizzaInfo />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
