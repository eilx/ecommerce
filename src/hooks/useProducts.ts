import useSWR from 'swr'

const api = 'https://fakestoreapi.com/products'

const fetcher = async <T> (api: string) => {
	const res = await fetch(api)

	if (!res.ok || res.status == 404)
		throw new Error()

	return res.json() as Promise<T>
}

/** Returns an array of products from fakestoreapi (undefined when fetching) */
export const useProducts = () => {
	const { data, error } = useSWR(api, fetcher<IProduct[]>)
	if (error) throw error

	return data
}

/** Returns a list of valid product categories */
export const useProductCategories = () => {
	const { data, error } = useSWR(`${api}/categories`, fetcher<string[]>)
	if (error) throw error

	return data
}
