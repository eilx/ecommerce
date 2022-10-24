import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useCart } from '../../hooks'
import svg from '../../assets/shopping-cart.svg'
import css from '../css/Root.Cart.module.css'

type CartItemProps = {
	data: [IProduct, number]
	onUpdate: (product: IProduct, amount: number) => void
	onMove: () => void
}
const CartItem = ({ data: [product, amount], onUpdate, onMove }: CartItemProps) =>
	<li className={css.item}>
		<img className={css.image} src={product.image} />
		<Link to={`/shop/${product.id}`} className={css.details} onClick={onMove}>
			<h6>{ product.title }</h6>
			<p>${ product.price.toFixed(2) }</p>
		</Link>
		<div className={css.buttons}>
			<button onClick={() => onUpdate(product, 1)}> + </button>
			<div>{ amount }</div>
			<button onClick={() => onUpdate(product, -1)}> - </button>
		</div>
	</li>

export default function Cart () {
	const ref = useRef<HTMLElement>(null)
	const [ open, setOpen ] = useState(false)
	const { cart, update, reset } = useCart(state => (
		{ ...state, cart: [...state.cart] }
	))
	const size = cart.reduce((sum, [, amount]) =>
		sum + amount
	, 0)
	const total = cart.reduce((sum, [product, amount]) =>
		sum + product.price * amount
	, 0)

	useEffect(() => {
		if (cart.length == 0) setOpen(false)
	}, [cart.length])

	useEffect(() => {
		const handler = (event: MouseEvent) => {
			const isOutside = ref.current?.contains(event.target as Node)
			if (!isOutside) setOpen(false)
		}

		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [ref])

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.key == 'Escape') setOpen(false)
		}

		document.addEventListener('keydown', handler)
		return () => document.removeEventListener('keydown', handler)
	}, [])

	return !cart.length ? null : <>
		<button
			className={css.toggler}
			onClick={() => setOpen(!open)}
		>
			<img src={svg} />
			<div className={css.count}>{ size }</div>
		</button>

		<dialog open={open}>
			<article ref={ref}>
				<header className={css.header}>
					<a className='close' onClick={() => setOpen(false)} />
					<h2>Cart Total: ${total.toFixed(2)}</h2>
				</header>

				<ul className={css.list}>
					{ cart.map(entry =>
						<CartItem
							key={entry[0].id}
							data={entry}
							onUpdate={update}
							onMove={() => setOpen(false)}
						/>
					)}
				</ul>

				<footer>
					<button onClick={reset}>Purchase</button>
				</footer>
			</article>
		</dialog>
	</>
}
