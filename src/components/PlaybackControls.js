import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { msToMinAndSec } from '../helperFunctions'

import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import { setPlaybackState, selectPlaybackItem, selectIsPlayingState, selectShuffleState, 
	selectRepeatState, selectProgress, setProgress } from '../slices/playbackSlice'

function PlaybackControls({ spotify }) {
	let dispatch = useDispatch();
	let playbackItemId;

	useEffect(() => {
		const intervalId = setInterval(() => {
			spotify.getMyCurrentPlaybackState().then((playbackState) => {
				if (playbackState) {
					dispatch(setPlaybackState(playbackState));

					playbackItemId = playbackState.item.id;
				}
			});
		}, 1000)
		return () => clearInterval(intervalId);
	}, []);

	const isPlaying = useSelector(selectIsPlayingState);
	const playPauseClickHandler = () => {	
		isPlaying ? spotify.pause() : spotify.play();
	}

	const isShuffled = useSelector(selectShuffleState)
	const shuffleClickHandler = () => {
		spotify.setShuffle(!isShuffled);
	}

	const repeatState = useSelector(selectRepeatState)
	const repeatClickHandler = () => {
		if (repeatState === 'off') {
			spotify.setRepeat('context');
		} else if (repeatState === 'context') {
			spotify.setRepeat('track');
		} else {
			spotify.setRepeat('off');
		}
	}
	
	const seekHandler = (event) => {
		spotify.seek(event.target.value);
		dispatch(setProgress(event.target.value));		
	}

	return (
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
				<p className='track-progress'> {msToMinAndSec(useSelector(selectProgress))} </p>

				<input type="range" min="0" 
					max={useSelector(selectPlaybackItem).duration_ms} 
					value={useSelector(selectProgress)} 
					className='progress-slider' 
					onChange={seekHandler}
				/>

				<p className='track-duration'> {msToMinAndSec(useSelector(selectPlaybackItem).duration_ms)} </p>
			</div>
		</div>
	)
}

export default PlaybackControls