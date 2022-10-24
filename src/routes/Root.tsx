import { Link, Outlet } from 'react-router-dom'

import Cart from './root/Cart'
import css from './css/Root.module.css'

export default function Root () {
	return <>
		<header className={css.header}>
			<nav><ul>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/shop'>Shop</Link></li>
			</ul></nav>
		</header>

		<Cart />

		<main className='container'>
			<Outlet />
		</main>
	</>
}
