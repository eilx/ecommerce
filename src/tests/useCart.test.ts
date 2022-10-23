import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { useCart } from '../hooks'

const product: IProduct = {
	id: 1, title: 'Test', price: 4.32, description: 'description',
	category: 'test', rating: { rate: 4.6, count: 235 }, image: 'n/a'
}

describe('useCart', () => {
	const { result } = renderHook(() => useCart())
	const { cart, update } = result.current

	it('adds a product when updated', () => {
		expect(cart).toStrictEqual(new Map())

		act(() => update(product, 1))
		expect(cart.get(product)).toBe(1)
	})

	it('updates a products amount', () => {
		act(() => update(product, 50))
		expect(cart.get(product)).toBe(51)
	})

	it('deletes a product when amount is 0 or lower', () => {
		act(() => update(product, -100))
		expect(cart.get(product)).toBe(undefined)
	})
})
