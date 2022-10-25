type Items = string[] | { [value: string]: string }

interface SelectProps {
	value?: string
	items: Items | undefined
	initial?: string
	onChange: (value: string) => void
}

/**
 * Returns a select menu populated by the given items
 * @param value - The value selected
 * @param items - A mapping of items value->display to list in the select
 * @param onChange - Callback when an item is selected
 * @param intitial - If truthy, inserts an initial item with this as the text
 */

export const Select = ({ items, initial, value, onChange }: SelectProps) =>
	<select value={value} onChange={e => onChange(e.target.value)}>
		{ initial && <option value=''>{ initial }</option> }

		{ Array.isArray(items)
			? items?.map(item =>
				<option key={item} value={item}>
					{ item }
				</option>
			)
			: Object.entries(items ?? {})?.map(([value, display]) =>
				<option key={value} value={value}>
					{ display }
				</option>
			)
		}
	</select>
