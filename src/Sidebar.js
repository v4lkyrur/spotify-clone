import React from 'react'
import { useSelector } from 'react-redux'
import './Sidebar.css'
import SidebarMenuItem from './SidebarMenuItem'
import Playlists from './Playlists'

import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';

function Sidebar() {
	const bodyContentTitle = useSelector((state) => state.bodyContent)

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

			<Playlists />
		</div>
	)
}

export default Sidebar