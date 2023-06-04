import { useRef, useEffect, useState, type ImgHTMLAttributes } from 'react'

interface LazyImageProps {
  src: string
  onLazyLoad?: (img: HTMLImageElement) => void
}

type ImageNative = ImgHTMLAttributes<HTMLImageElement>

type Props = LazyImageProps & ImageNative

export const LazyImage = ({ src, onLazyLoad, ...imgProps }: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null)
  const [currentSrc, setCurrentSrc] = useState('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=')

  useEffect(() => {
    // nuevo observador
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // onIntersection
        if (entry.isIntersecting) {
          console.log('Loaded image')
          setCurrentSrc(src)
        }
      })
    })

    // observe node
    if (node.current != null) {
      observer.observe(node.current)

      if (onLazyLoad != null) {
        onLazyLoad(node.current)
      }
    }

    // desconectar
    return () => {
      observer.disconnect()
    }
  }, [src, onLazyLoad])

  return <img ref={node} src={currentSrc} {...imgProps} />
}
