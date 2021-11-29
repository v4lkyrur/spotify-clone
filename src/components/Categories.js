import React from 'react'

function Categories({ items }) {
	let elements = items.map((item) => item = (
		<a className='category'>
			<div style={{backgroundImage: `url(${item.icons[0].url})`, backgroundSize: 'contain'}} className='category-div'>
				<h3 className='category-name'> { item.name } </h3>
			</div>
		</a>
	))

	return (
		<div className='section'>
			<h1 className='search-section-title'> Categories </h1>
			<div className='categories-container'>
				{ elements }
			</div>
		</div>
	)
}

export default Categories