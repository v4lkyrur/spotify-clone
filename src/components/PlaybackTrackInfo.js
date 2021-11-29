import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import usePictureInPicture from 'react-use-pip'

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PictureInPictureAltIcon from '@material-ui/icons/PictureInPictureAlt';

import { selectPlaybackItem, setContainsSavedTracks, selectContainsSavedTracks } from '../slices/playbackSlice'

function PlaybackTrackInfo({ spotify }) {
	let dispatch = useDispatch();
	let playbackItemId = useSelector(selectPlaybackItem).id;

	useEffect(() => {
		spotify.containsMySavedTracks([playbackItemId]).then((response) => {
			dispatch(setContainsSavedTracks(...response));
		});
	})

	return (
		<div className='footer-left'>
			<div className='track-info'>
				<img src={useSelector(selectPlaybackItem).album.images[2].url} alt='cover' className='footer-track-cover'/>

				<div className='track-info-text'>
					<p className='footer-track-title'> {useSelector(selectPlaybackItem).name} </p>
					<p className='footer-track-artist'> {useSelector(selectPlaybackItem).artists.map((artist) => artist.name).join(', ')} </p>
				</div>

				{ useSelector(selectContainsSavedTracks) 
					? <button onClick={() => spotify.removeFromMySavedTracks([playbackItemId])}> 
							<FavoriteIcon className='footer-icon icon-heart-active'/> 
						</button>
					: <button onClick={() => spotify.addToMySavedTracks([playbackItemId])}> 
							<FavoriteBorderIcon className='footer-icon icon-heart'/> 
						</button>
				}

				<button> <PictureInPictureAltIcon className='footer-icon TODO'/> </button>
			</div>
		</div>
	)
}

export default PlaybackTrackInfo