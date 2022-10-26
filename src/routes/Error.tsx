import { Link, useRouteError } from 'react-router-dom'

import css from './css/Error.module.css'

interface RouteError {
	status: string
}

type ErrorMessageProps = { code: number }
const ErrorMessage = ({ code }: ErrorMessageProps) => {
	switch (code) {
	case 404:
		return <p>
			The page you&apos;re trying to access cannot be found.<br/>
			Perhaps you meant to go to the <Link to='/shop'>Shop</Link>?
		</p>
	default:
		return <p>
			Something very unexpected has occured. Perhaps try&nbsp;
			<Link to='/shop'>this link</Link>?<br/>
			If the error continues, let me know what went wrong&nbsp;
			<a href=''>here</a>!
		</p>
	}
}

export default function Error () {
	const error = useRouteError() as RouteError
	const code = +error.status || 500
	history.replaceState(null, '', 'error?' + new URLSearchParams({ code: code.toString() }))

	return (
		<div className={`${css.container}`}>
			<section>
				<h1>Oh no, {code}!</h1>
				<p>
					<ErrorMessage code={code} />
				</p>
			</section>
		</div>
	)
}
