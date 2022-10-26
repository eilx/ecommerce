import { NavLink, Outlet } from 'react-router-dom'

import Cart from './root/Cart'
import css from './css/Root.module.css'

export default function Root () {
	const classes = ({ isActive } : { isActive: boolean }) =>
		`${css.link} ${isActive && css.active}`

	return <>
		<header className={css.header}>
			<nav><ul>
				<li><NavLink to='/' className={classes} end>
					Home
				</NavLink></li>
				<li><NavLink to='/shop' className={classes} end>
					Shop
				</NavLink></li>
			</ul></nav>
		</header>

		<Cart />

		<main className='container'>
			<Outlet />
		</main>
	</>
}
