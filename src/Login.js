import React from 'react'
import './Login.css'
import { loginURL } from './spotify.js'

function Login() {
	return (
		<div className='login'>
			<img 
				src='/logos-icons/Spotify_Logo_RGB_Green.png' 
				alt='logo'
			/>
			<a href={loginURL}>Login with Spotify</a>
			<p>clone by v4lkyrur</p>
		</div>
	)
}

export default Login