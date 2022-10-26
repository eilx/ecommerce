import css from './css/Home.module.css'

import iconPico from '../assets/icons/pico.svg'
import iconReact from '../assets/icons/react.svg'
import iconReactRouter from '../assets/icons/react-router.svg'
import iconSWR from '../assets/icons/swr.svg'
import iconTypescript from '../assets/icons/typescript-icon.svg'
import iconVite from '../assets/icons/vitejs.svg'
import { Link } from 'react-router-dom'

export default function Home () {
	const ShopLink = <Link to='/shop'>pages over here</Link>

	return <>
		<h2>FakeStore</h2>
		<p>
			A front-end to <a href='https://fakestoreapi.com'>Fakestoreapi</a>
			&nbsp;using &quot;Modern Technologies&quot; to display the { ShopLink },
			which you really should be looking at instead...
		</p>

		<details>
			<summary>Technologies used:</summary>

			<ul className={css.techs}>
				<li><a href='https://picocss.com/'>
					<img src={iconPico}/>
					<h6>PicoCSS</h6>
				</a></li>
				<li><a href='https://reactjs.org/'>
					<img src={iconReact} />
					<h6>React</h6>
				</a></li>
				<li><a href='https://reactrouter.com/'>
					<img src={iconReactRouter} />
					<h6>React Router</h6>
				</a></li>
				<li><a href='https://swr.vercel.app/'>
					<img src={iconSWR} />
					<h6>SWR</h6>
				</a></li>
				<li><a href='https://typescriptlang.org/'>
					<img src={iconTypescript} />
					<h6>Typescript</h6>
				</a></li>
				<li><a href='https://vitejs.dev/'>
					<img src={iconVite} />
					<h6>Vite</h6>
				</a></li>
			</ul>
			<small>
				Also thanks to
				&nbsp;<a href='https://github.com/pmndrs/zustand'>Zustand</a> and
				&nbsp;<a href='https://github.com/gilbarbara/logos'>Gil Barbara</a>
				&nbsp;(Couldn&apos;t find icons for these 🙃)
			</small>
		</details>
	</>
}
