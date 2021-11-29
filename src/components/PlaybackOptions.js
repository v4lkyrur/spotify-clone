import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import MicNoneIcon from '@material-ui/icons/MicNone';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SpeakerGroupOutlinedIcon from '@material-ui/icons/SpeakerGroupOutlined';
import VolumeOffOutlinedIcon from '@material-ui/icons/VolumeOffOutlined';
import VolumeMuteOutlinedIcon from '@material-ui/icons/VolumeMuteOutlined';
import VolumeDownOutlinedIcon from '@material-ui/icons/VolumeDownOutlined';
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

import { setVolume, selectVolume } from '../slices/playbackSlice'

function PlaybackOptions({ spotify }) {
	let dispatch = useDispatch();

	const volumeChangeHandler = (event) => {
		spotify.setVolume(event.target.value);
		dispatch(setVolume(event.target.value));

		event.target.style.backgroundSize = event.target.value * 100 / event.target.max + '% 100%'
	}

	const volumeLevel = useSelector(selectVolume);
	const volumeClickHandler = () => {
		if (volumeLevel > 0) {
			spotify.setVolume(0);
			dispatch(setVolume(0));
		} else {
			spotify.setVolume(75);
			dispatch(setVolume(75));
		}
	}

	return (
		<div className='footer-right'>
			<div className='player-options'>
				<MicNoneIcon className='footer-icon TODO'/>
				<QueueMusicIcon className='footer-icon TODO'/>
				<SpeakerGroupOutlinedIcon className='footer-icon TODO'/>

				<button onClick={volumeClickHandler}>
					{ volumeLevel >= 75 ? (<VolumeUpOutlinedIcon className='footer-icon'/>) 
						: volumeLevel >= 25 ? (<VolumeDownOutlinedIcon className='footer-icon'/>)
						: volumeLevel > 0 ? (<VolumeMuteOutlinedIcon className='footer-icon'/>)
						: (<VolumeOffOutlinedIcon className='footer-icon'/>)
					}
				</button>

				<input type='range' min='0' max='100' 
					value={useSelector(selectVolume)} 
					onChange={volumeChangeHandler} 
					className='volume-slider'
				/>

				<ZoomOutMapIcon className='footer-icon TODO'/>
			</div>
		</div> 
	)
}

export default PlaybackOptions