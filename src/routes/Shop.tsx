import { MouseEventHandler, useState } from 'react'

import { useProducts, useProductCategories } from '../hooks'
import { Select } from '../components'
import Listing from './shop/Listing'
import css from './css/Shop.module.css'

type SorterType = keyof typeof sorters
type Sorter = (last: IProduct, next: IProduct) => number
const sorters = {
	'RATING': () => (
		(last, next) => next.rating.rate - last.rating.rate
	) as Sorter,
	'PRICE (HIGH)': () => (
		(last, next) => next.price - last.price
	) as Sorter,
	'PRICE (LOW)': () => (
		(last, next) => last.price - next.price
	) as Sorter,
}

// TODO: Set category to params
export default function Shop () {
	const products = useProducts()
	const categories = useProductCategories()
	const [ category, setCategory ] = useState<string | undefined>()
	const [ sorter, setSorter ] = useState<Sorter>(sorters['RATING'])

	const handleListingClick: MouseEventHandler = event => {
		event.preventDefault()
		const target = event.target as HTMLButtonElement
		setCategory(target.textContent as string)
	}

	return <>
		<div className={`grid ${css.options}`}>
			<label>
				<h3>CATEGORY</h3>
				<Select
					initial='ALL'
					items={categories}
					onChange={e => setCategory(e.target.value.toLowerCase())}
				/>
			</label>
			<label>
				<h3>SORT BY</h3>
				<Select
					items={Object.keys(sorters)}
					onChange={e => setSorter(sorters[e.target.value as SorterType])}
				/>
			</label>
		</div>

		<ul className={css.grid} aria-busy={!products}>
			{ products
				?.filter(product => !category || product.category == category)
				?.sort(sorter)
				?.map(product =>
					<Listing
						key={product.id}
						product={product}
						onClick={handleListingClick}
					/>
				)
			}
		</ul>
	</>
}
