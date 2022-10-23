import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './main.css'

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<div aria-busy />
	</StrictMode>
)
