import { MouseEventHandler, useState } from 'react'

import { useCart } from '../../hooks'
import css from '../css/Shop.module.css'

interface ButtonProps { product: IProduct }
export default function Button ({ product }: ButtonProps) {
	const [ hovered, setHovered ] = useState(false)
	const update = useCart(state => state.update)

	const onClick: MouseEventHandler = event => {
		// Seems 0 for mouse, 1 for touchscreen?
		if (event.buttons) return
		event.preventDefault()
		update(product, 1)
	}

	return (
		<button
			className={css.price}
			onClick={onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{ hovered
				? 'Add to cart'
				: `$${product.price.toFixed(2)}`
			}
		</button>
	)
}
