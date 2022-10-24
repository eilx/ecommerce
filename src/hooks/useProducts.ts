import useSWR from 'swr'

const api = 'https://fakestoreapi.com/products'

/** Returns an array of products from fakestoreapi (undefined when fetching) */
export const useProducts = () => {
	const { data } = useSWR(api, () => fetch(api)
		.then(response => response.json() as Promise<IProduct[]>)
	)

	return data
}

/** Returns a list of valid product categories */
export const useProductCategories = () => {
	const apic = `${api}/categories`
	const { data } = useSWR(apic, () => fetch(apic)
		.then(response => response.json() as Promise<string[]>)
		.then(cats => cats.map(category => category.toUpperCase()))
	)

	return data
}
