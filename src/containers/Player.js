import React from 'react'
import store from '../app/store'
import './Player.css'
import Sidebar from './Sidebar'
import Body from './Body'
import Footer from './Footer'

function Player({ spotify }) {
	return (
		<div className='player'>
			<div className='player-content'>
				<Sidebar spotify={spotify} />
				<Body spotify={spotify} />
			</div>
			<Footer spotify={spotify} />
		</div>
	)
}

export default Player