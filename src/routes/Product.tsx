import { useParams, Link } from 'react-router-dom'

import { ImageLoader } from '../components'
import { useProducts } from '../hooks'
import Controls from './product/Controls'
import css from './css/Product.module.css'

export default function Product () {
	const id = Number(useParams().id)
	const products = useProducts()
	const product = products
		?.find(product => product.id == id)
	const category = product?.category.toUpperCase()

	return !product
		? <div aria-busy />
		: <>
			<nav aria-label='breadcrumb'><ul>
				<li><Link to='/shop'>
					SHOP
				</Link></li>

				<li><Link to={`/shop?category=${category}`}>
					{ category }
				</Link></li>

				<li><span>
					{ product.id }
				</span></li>
			</ul></nav>

			<section className={`grid ${css.container}`}>
				<ImageLoader className={css.image} src={product.image} />

				<div className={css.content}>
					<header>
						<h2 className={css.title}>
							{ product.title }
						</h2>
					</header>

					<div className={css.reviews}>
						<p>
							<span>{'★'.repeat(product.rating.rate)}</span>
							<span>{'☆'.repeat(5.99 - product.rating.rate)}</span>
						</p>
						<small>{ product.rating.count } ratings</small>
					</div>

					<p className={css.price}>
						${ product.price.toFixed(2) }
					</p>

					<p>{ product.description }</p>

					<Controls product={product} />
				</div>
			</section>
		</>
}
