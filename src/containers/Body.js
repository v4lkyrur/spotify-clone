import React from 'react'
import { useSelector } from 'react-redux'
import './Body.css'
import Search from './Search'

import { selectBodyContent } from '../slices/sessionSlice'

function Body({ spotify }) {
	const bodyContentTitle = useSelector(selectBodyContent)

	return (
		<div className='body'>
			{ bodyContentTitle === 'Search' 
				? <Search spotify={spotify} /> 
				: <p>{bodyContentTitle}</p> }
		</div>
	)
}

export default Body