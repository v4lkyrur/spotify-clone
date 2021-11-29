import React from 'react'
import { useSelector } from 'react-redux'
import './Sidebar.css'
import SidebarMenuItem from '../components/SidebarMenuItem'
import Playlists from '../components/Playlists'

import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';

import { selectBodyContent } from '../slices/sessionSlice'

function Sidebar({ spotify }) {
	const bodyContentTitle = useSelector(selectBodyContent)

	return (
		<div className='sidebar'>
			<img src='/logos-icons/Spotify_Logo_RGB_White.png' alt='logo' id='sidebar-logo' />

			<div className='sidebar-menu'>
				<SidebarMenuItem text='Home' 
					Icon={bodyContentTitle === 'Home' ? HomeIcon : HomeOutlinedIcon} 
					className={`sidebar-menu-item ${bodyContentTitle === 'Home' ? 'active' : ''}`} 
				/>
				<SidebarMenuItem text='Search' 
					Icon={SearchIcon} 
					className={`sidebar-menu-item ${bodyContentTitle === 'Search' ? 'active' : ''}`} 
				/>
				<SidebarMenuItem text='Your Library' 
					Icon={bodyContentTitle === 'Your Library' ? LibraryMusicIcon : LibraryMusicOutlinedIcon} 
					className={`sidebar-menu-item ${bodyContentTitle === 'Your Library' ? 'active' : ''}`}
				/>
			</div>

			<br />
			<hr />
			<div className='playlists-container'>
				<Playlists />
			</div>
		</div>
	)
}

export default Sidebar