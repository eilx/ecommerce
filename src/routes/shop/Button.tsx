import { MouseEventHandler, useState } from 'react'

import { useCart } from '../../hooks'
import css from '../css/Shop.module.css'
import { inCart } from '../../utils/styles.module.css'

interface ButtonProps { product: IProduct }
export default function Button ({ product }: ButtonProps) {
	const [ hovered, setHovered ] = useState(false)
	const { cart, update } = useCart()
	const amount = cart.get(product)

	const onClick: MouseEventHandler = event => {
		// Seems 0 for mouse, 1 for touchscreen?
		if (event.buttons) return
		event.preventDefault()
		update(product, 1)
	}

	return (
		<button
			className={`${css.price} ${amount ? inCart : undefined}`}
			disabled={amount == 100}
			onClick={onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{ !hovered
				? `$${product.price.toFixed(2)}`
				: !amount
					? 'Add to cart'
					: `Cart: ${amount}`
			}
		</button>
	)
}
