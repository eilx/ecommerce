import { StrictMode, Suspense, lazy, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import {
	createBrowserRouter, createRoutesFromElements, Route, RouterProvider
} from 'react-router-dom'

import Root from './routes/Root'
import './main.css'

const Home = lazy(() => import('./routes/Home'))
const Shop = lazy(() => import('./routes/Shop'))
const Product = lazy(() => import('./routes/Product'))
const Error = lazy(() => import('./routes/Error'))

const Suspended = ({ route }: { route: ReactNode }) =>
	<Suspense fallback={<div aria-busy />}>
		{ route }
	</Suspense>

const router = createBrowserRouter(createRoutesFromElements(
	<Route path='/' element={<Root />} errorElement={<Error />}>
		<Route index            element={<Suspended route={<Home    />} />} />
		<Route path='/shop'     element={<Suspended route={<Shop    />} />} />
		<Route path='/shop/:id' element={<Suspended route={<Product />} />} />
	</Route>
), { basename: '/ecommerce' })

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
