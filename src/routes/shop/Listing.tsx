import { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'
import css from '../css/Shop.module.css'

interface ListingProps {
	product: IProduct,
	onCategory: MouseEventHandler<HTMLButtonElement>
}

/** Shop listing (separated for cleanliness) */

export default function Listing ({ product, onCategory }: ListingProps) {
	return (
		<li className={css.listing}>
			<Link to={`/shop/${product.id}`}>
				<article>
					<header className={css.image}>
						<img src={product.image} />
					</header>

					<section className={css.information}>
						<div className={css.bar}>
							<button
								className={`outline ${css.category}`}
								onClick={onCategory}
							>
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
	)
}
