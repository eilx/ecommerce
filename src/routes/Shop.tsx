import { useSearchParams } from 'react-router-dom'

import { useProducts, useProductCategories } from '../hooks'
import { Select } from '../components'
import Listing from './shop/Listing'
import css from './css/Shop.module.css'
import { MouseEventHandler, useEffect } from 'react'

type Sorter = (last: IProduct, next: IProduct) => number
const sorters: Record<string, Sorter> = {
	'rating': (last, next) =>
		next.rating.rate - last.rating.rate
	,
	'price_high': (last, next) =>
		next.price - last.price
	,
	'price_low': (last, next) =>
		last.price - next.price
	,
}

/** The mapping between url display and Select display */
const sortMap = {
	rating: 'RATING',
	price_high: 'PRICE (HIGH)',
	price_low: 'PRICE (LOW)',
}

export default function Shop () {
	const products = useProducts() ?? []
	const categories = useProductCategories() ?? []
	const [ search, setSearch ] = useSearchParams()

	const _category = search.get('category') as string
	const category = categories.includes(_category) ? _category : ''
	const setCategory = (category: string) =>
		setSearch({ sort, category: category.toLowerCase() })

	const _sort = search.get('sort') as string
	const sort = Object.hasOwn(sortMap, _sort) ? _sort : 'rating'
	const setSort = (sort: string) =>
		setSearch({ sort, category })

	const handleCategoryClick: MouseEventHandler = event => {
		const target = event.target as HTMLButtonElement
		event.preventDefault()
		setCategory(target.textContent as string)
		scrollTo({ top: 0, behavior: 'smooth' })
	}

	// Reset invalid param values
	useEffect(() => history
		.replaceState(null, '', '?' + new URLSearchParams({ sort, category }))
	, [])

	return <>
		<div className={`grid ${css.options}`}>
			<label>
				<h3>CATEGORY</h3>
				<Select
					initial='ALL'
					value={category.toUpperCase()}
					items={categories?.map(cat => cat.toUpperCase())}
					onChange={setCategory}
				/>
			</label>
			<label>
				<h3>SORT BY</h3>
				<Select
					items={sortMap}
					onChange={setSort}
				/>
			</label>
		</div>

		<ul className={css.grid} aria-busy={!products}>
			{ products
				.filter(product => !category || product.category == category)
				.sort(sorters[sort])
				.map(product =>
					<Listing
						key={product.id}
						product={product}
						onCategory={handleCategoryClick}
					/>
				)
			}
		</ul>
	</>
}
