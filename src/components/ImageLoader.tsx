import { ImgHTMLAttributes, useState } from 'react'

interface ImageLoaderProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string
	imgClassName?: string
}

/**
 * Returns a div-contained image with an aria-busy whilst loading
 * @param imgClassName - The className for the contained img tag
 */

export function ImageLoader (props: ImageLoaderProps) {
	const [ loading, setLoading ] = useState(true)

	return (
		<div className={props.className} aria-busy={loading}>
			<img {...props}
				className={props.imgClassName}
				onLoad={() => setLoading(false)}
			/>
		</div>
	)
}
