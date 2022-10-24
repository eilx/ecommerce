import { useEffect, useState } from 'react'

import { useCart } from '../../hooks'
import Input from './Input'
import css from '../../utils/styles.module.css'

interface ControlsProps { product: IProduct }
/** State container for Product page controls */
export default function Controls ({ product }: ControlsProps) {
	const { cart, update } = useCart()
	const current = cart.get(product) ?? 0
	const [ amount, setAmount ] = useState(current || 1)

	useEffect(() => {
		setAmount(current || 1)
	}, [current])

	const handleClick = () => {
		update(product, amount - current)
	}

	return <div className={current ? css.inCart : undefined}>
		<Input value={amount} min={+!current} onChange={setAmount} />

		<button disabled={current==amount} onClick={handleClick}>
			{ !current
				? 'Add to cart'
				: current == amount
					? 'Added to cart'
					: 'Update cart'
			}
		</button>
	</div>
}
