import React from 'react'
import { useSelector } from 'react-redux'
import './Body.css'
import Search from './Search'

function Body({ spotify }) {
	const bodyContentTitle = useSelector((state) => state.bodyContent)

	return (
		<div className='body'>
			{bodyContentTitle === 'Search' ? <Search spotify={spotify} /> : <p>{bodyContentTitle}</p>}
		</div>
	)
}

export default Body