import { useState } from 'react'

import { useCart } from '../../hooks'
import Input from './Input'
import { inCart } from '../../utils/styles.module.css'

interface ControlsProps { product: IProduct }
export default function Controls ({ product }: ControlsProps) {
	const { cart, update } = useCart()
	const current = cart.get(product) ?? 0
	const [ amount, setAmount ] = useState(current || 1)

	const handleClick = () => {
		update(product, amount - current)
		if (amount == 0) setAmount(1)
	}

	return <div className={current ? inCart : undefined}>
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
