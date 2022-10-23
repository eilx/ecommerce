import { ImgHTMLAttributes, useState } from 'react'

interface ImageLoaderProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string
	imgClassName?: string
}
export function ImageLoader (props: ImageLoaderProps) {
	const [ loading, setLoading ] = useState(true)

	return (
		<div className={props.className} aria-busy={loading}>
			<img {...props }
				className={props.imgClassName}
				onLoad={() => setLoading(false)}
			/>
		</div>
	)
}
