import React from 'react'
import './Footer.css'
import { useSelector } from 'react-redux'

import PlaybackTrackInfo from '../components/PlaybackTrackInfo'
import PlaybackControls from '../components/PlaybackControls'
import PlaybackOptions from '../components/PlaybackOptions'

function Footer({ spotify }) {
	console.log(useSelector((state) => state));

	return (
		<div className='footer'> 
			<PlaybackTrackInfo spotify={spotify} />

			<PlaybackControls spotify={spotify} />

			<PlaybackOptions spotify={spotify} />
		</div>
	)
}

export default Footer