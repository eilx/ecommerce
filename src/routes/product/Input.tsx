import { clamp } from '../../utils'
import { input } from '../css/Product.module.css'

interface InputProps {
	value: number
	max?: number
	min?: number
	onChange: (change: number) => void
}
export default function Input ({ value, onChange, min=0, max=100 }: InputProps) {
	return (
		<div className={input}>
			<button disabled={value <= min} onClick={() => onChange(value - 1)}>
				-
			</button>

			<input
				value={value}
				inputMode='numeric'
				pattern='/d*'
				onChange={e => onChange(
					clamp(parseInt(e.target.value) || 0, min, max)
				)}
			/>

			<button disabled={value >= max} onClick={() => onChange(value + 1)}>
				+
			</button>
		</div>
	)
}
