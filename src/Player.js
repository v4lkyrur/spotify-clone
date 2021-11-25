import React from 'react'
import store from './store'
import './Player.css'
import Sidebar from './Sidebar'
import Body from './Body'
import Footer from './Footer'

function Player({ spotify }) {
	//const user = useSelector(selectUser);
	return (
		<div className='player'>
			<div className='player-content'>
				<Sidebar />
				<Body spotify={spotify} />
			</div>
			<Footer spotify={spotify} />
		</div>
	)
}

export default Player