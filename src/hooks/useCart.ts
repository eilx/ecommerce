import create from 'zustand'

interface CartState {
	/** A map of all products in the cart and their amount */
	cart: Map<IProduct, number>,
	/** Updates a product's amount by some change */
	update: (product: IProduct, change: number) => void
}

export const useCart = create<CartState>((set, get) => ({
	cart:
		new Map()
	,
	update:
		(product: IProduct, change: number) => {
			const cart = get().cart
			const amount = (cart.get(product) ?? 0) + change

			if (0 < amount)
				cart.set(product, amount)
			else
				cart.delete(product)

			set(() => ({ cart }))
		}
	,
}))
