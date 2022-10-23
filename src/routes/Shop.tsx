import { MouseEventHandler, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { useProducts } from '../hooks'
import Button from './shop/Button'
import css from './css/Shop.module.css'

type ListingProps = { product: IProduct, onClick: MouseEventHandler }
const Listing = ({ product, onClick }: ListingProps) =>
	<li className={css.listing}>
		<Link to={`/shop/${product.id}`}>
			<article>
				<header className={css.image}>
					<img src={product.image} />
				</header>

				<section className={css.information}>
					<div className={css.bar}>
						<button className={`outline ${css.category}`} onClick={onClick}>
							{ product.category.toUpperCase() }
						</button>

						<div>
							<span>{ '★'.repeat(product.rating.rate) }</span>
							<span>{ '☆'.repeat(5.99 - product.rating.rate) }</span>
						</div>
					</div>

					<h2>{ product.title }</h2>
					<p className={css.description}>
						{ product.description }
					</p>

					<Button product={product} />
				</section>
			</article>
		</Link>
	</li>

export default function Shop () {
	const products = useProducts()
	const [ category, setCategory ] = useState<string | undefined>()

	const handleClick: MouseEventHandler = event => {
		event.preventDefault()
		const target = event.target as HTMLButtonElement
		setCategory(target.textContent as string)
	}

	const listings = useMemo(() =>
		products?.map(product =>
			<Listing key={product.id} product={product} onClick={handleClick} />
		)
	, [products])

	return <>
		<p>{ category }</p>

		<ul className={css.grid} aria-busy={!products}>
			{ listings }
		</ul>
	</>
}
