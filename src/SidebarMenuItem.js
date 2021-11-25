import React from 'react'
import './SidebarMenuItem.css'
import { useDispatch } from 'react-redux'
import store from './store'

function SidebarMenuItem({ text, Icon, className }) {
	const dispatch = useDispatch();


	const clickHandler = () => {
		dispatch({type: 'setBodyContent', payload: text});
	}
	return (
		<button className={className} onClick={clickHandler}>
			<Icon className='sidebar-menu-icon' />
			<p>{text}</p>
			
		</button>
	)
}

export default SidebarMenuItem