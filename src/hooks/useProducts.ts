import useSWR from 'swr'

const api = 'https://fakestoreapi.com/products'

/** Returns an array of products from fakestoreapi (undefined when fetching) */
export const useProducts = () => {
	const { data } = useSWR(api, () => fetch(api)
		.then(response => response.json() as Promise<IProduct[]>)
	)

	return data
}
