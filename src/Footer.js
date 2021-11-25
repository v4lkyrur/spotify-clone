import React, { useEffect } from 'react'
import './Footer.css'
import { useSelector, useDispatch } from 'react-redux'
import usePictureInPicture from 'react-use-pip'

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PictureInPictureAltIcon from '@material-ui/icons/PictureInPictureAlt';

import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import MicNoneIcon from '@material-ui/icons/MicNone';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SpeakerGroupOutlinedIcon from '@material-ui/icons/SpeakerGroupOutlined';
import VolumeOffOutlinedIcon from '@material-ui/icons/VolumeOffOutlined';
import VolumeMuteOutlinedIcon from '@material-ui/icons/VolumeMuteOutlined';
import VolumeDownOutlinedIcon from '@material-ui/icons/VolumeDownOutlined';
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined';
import { Slider } from '@material-ui/core'
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

function Footer({ spotify }) {
	const dispatch = useDispatch();
	
	useEffect(() => {
		const intervalId = setInterval(() => {
			spotify.getMyCurrentPlaybackState().then((playbackState) => {
				if (playbackState) {
					dispatch({type: 'setPlaybackState', payload: playbackState});

					spotify.containsMySavedTracks([playbackState.item.id]).then((response) => {
						dispatch({type: 'setContainsSavedTracks', payload: response});
					});
				}
			});
		}, 1000)
		return () => clearInterval(intervalId);
	}, [dispatch]);

	const isPlaying = useSelector((state) => state.playbackState.is_playing);
	const playPauseClickHandler = () => {	
		isPlaying ? spotify.pause() : spotify.play();
	}

	const isShuffled = useSelector((state) => state.playbackState.shuffle_state)
	const shuffleClickHandler = () => {
		spotify.setShuffle(!isShuffled);
	}

	const repeatState = useSelector((state) => state.playbackState.repeat_state)
	const repeatClickHandler = () => {
		if (repeatState === 'off') {
			spotify.setRepeat('context');
		} else if (repeatState === 'context') {
			spotify.setRepeat('track');
		} else {
			spotify.setRepeat('off');
		}
	}

	const volumeChangeHandler = (event) => {
		spotify.setVolume(event.target.value);
		dispatch({type: 'setVolume', payload: event.target.value});

		event.target.style.backgroundSize = event.target.value * 100 / event.target.max + '% 100%'
	}

	const volumeLevel = useSelector((state) => state.volume);
	const volumeClickHandler = () => {
		if (volumeLevel > 0) {
			spotify.setVolume(0);
			dispatch({type: 'setVolume', payload: 0});
		} else {
			spotify.setVolume(75);
			dispatch({type: 'setVolume', payload: 75});
		}
	}

	console.log(useSelector((state) => state));
	return (
		<div className='footer'> 
			<div className='footer-left'>
				<div className='track-info'>
					<img src={useSelector((state) => state.playbackState).item.album.images[2].url} alt='cover' className='footer-track-cover'/>

					<div className='track-info-text'>
						<p className='footer-track-title'> {useSelector((state) => state.playbackState).item.name} </p>
						<p className='footer-track-artist'> {useSelector((state) => state.playbackState).item.artists.map((artist) => artist.name).join(', ')} </p>
					</div>

					{useSelector((state) => state.containsSavedTracks) 
						? <button> <FavoriteIcon className='footer-icon icon-heart-active'/> </button>
						: <button> <FavoriteBorderIcon className='footer-icon icon-heart'/> </button>
					}

					<button> <PictureInPictureAltIcon className='footer-icon TODO'/> </button>
				</div>
			</div>

			<div className='footer-center'>
				<div className='player-controls'>
					<button onClick={shuffleClickHandler}> 
						<ShuffleIcon className={isShuffled ? 'footer-icon icon-shuffle-active' : 'footer-icon icon-shuffle'}/>
					</button>

					<button onClick={() => spotify.skipToPrevious()}> 
						<SkipPreviousIcon className='footer-icon'/>
					</button>

					<button onClick={playPauseClickHandler}> 
						{isPlaying ? <PauseCircleFilledIcon className='footer-icon icon-play-pause'/> 
							: <PlayCircleFilledIcon className='footer-icon icon-play-pause'/>}
					</button>

					<button onClick={() => spotify.skipToNext()}> 
						<SkipNextIcon className='footer-icon'/>
					</button>

					<button onClick={repeatClickHandler}>
						{ repeatState === 'off' ? (<RepeatIcon className='footer-icon icon-repeat'/>) 
							: repeatState === 'context' ? (<RepeatIcon className='footer-icon icon-repeat-active'/>)
							: (<RepeatOneIcon className='footer-icon icon-repeat-active'/>)
						}
					</button>
				</div>

				<div className='progress-info'>
					<p className='track-progress'> {millisToMinutesAndSeconds(useSelector((state) => state.playbackState).progress_ms)} </p>

					<input type="range" min="0" 
						max={useSelector((state) => state.playbackState).item.duration_ms} 
						value={useSelector((state) => state.playbackState).progress_ms} 
						className='progress-slider' 
						onChange={(event) => {spotify.seek(event.target.value);}}
					/>

					<p className='track-duration'> {millisToMinutesAndSeconds(useSelector((state) => state.playbackState).item.duration_ms)} </p>
				</div>
			</div>

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
						value={useSelector((state) => state.volume)} 
						onChange={volumeChangeHandler} 
						className='volume-slider'
					/>

					<ZoomOutMapIcon className='footer-icon TODO'/>
				</div>
			</div> 
		</div>
	)
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default Footer