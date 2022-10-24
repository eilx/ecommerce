import { EventHandler, ChangeEvent } from 'react'

type SelectProps = {
	items?: string[]
	initial?: string
	defaultValue?: string
	onChange: EventHandler<ChangeEvent<HTMLSelectElement>>
}

/**
 * Returns a select menu populated by the given items
 * @param items - The items listed in the menu
 * @param intitial - If truthy, inserts an initial item with this as the text
 * @param defaultValue - The value initially selected
 * @param onChange - Callback when an item is selected
 */

export const Select = ({ items, initial, defaultValue, onChange }: SelectProps) =>
	<select defaultValue={defaultValue} onChange={onChange}>
		{ initial &&
			<option value=''>{ initial }</option>
		}
		{items?.map(item =>
			<option key={item} value={item}>
				{ item }
			</option>
		)}
	</select>
