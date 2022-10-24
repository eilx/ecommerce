import create from 'zustand'

interface State {
	cart: Map<IProduct, number>
}

interface Actions {
	/** Updates a product's amount by some change */
	update: (product: IProduct, change: number) => void
	/** Empties the cart */
	reset: () => void
}

export const useCart = create<State & Actions>((set, get) => ({
	cart: new Map(),

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
	reset:
		() => {
			set({ cart: new Map() })
		}
	,
}))
