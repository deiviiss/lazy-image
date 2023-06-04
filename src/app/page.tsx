'use client'
import { type NextPage } from 'next'
import { type MouseEventHandler, useState } from 'react'
import { LazyImage } from './components/LazyImage'

// generate a ramdon date between year 2020 and current date
const generateRandomDate = (): string => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const randomYear = Math.floor(Math.random() * (currentYear - 2020 + 1)) + 2020
  const randomMonth = Math.floor(Math.random() * 12) + 1
  const randomDay = Math.floor(Math.random() * 31) + 1

  const formattedYear = randomYear.toString()
  const formattedMonth = randomMonth.toString().padStart(2, '0')
  const formattedDay = randomDay.toString().padStart(2, '0')

  return `${formattedYear}-${formattedMonth}-${formattedDay}`
}

// generate simple unique id
const generateId = (): string => Math.random().toString(36).substring(2, 9)

// fetch api
interface ApiResponse {
  url: string
}

const fetchData = async (): Promise<string> => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=ieUsFTilVVT5DiV0SawYXGcsr4O0474k1IlHdeVJ&date=${generateRandomDate()}`)
    const data: ApiResponse = await response.json()
    return data.url
  } catch (error) {
    console.error('Error:', error)
    return ''
  }
}

const Home: NextPage = () => {
  const [images, setImages] = useState<ITypeImage[]>([])

  const handleImageError = (imageItem: ITypeImage): void => {
    imageItem.url = 'https://apod.nasa.gov/apod/image/2006/NGC1300HST1200.jpg'
    setImages([...images, imageItem])
  }

  const addNewImage: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()

    fetchData()
      .then((url) => {
        const newImageItem: ITypeImage = {
          id: generateId(), url
        }

        const img = new Image()
        img.onerror = async () => {
          console.error(`Error loading image: ${url}`)
          handleImageError(newImageItem)
        }
        img.src = url

        setImages([...images, newImageItem])
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <main className='container h-full mx-auto p-4 flex flex-col items-center'>
        <div className="pt-16 pb-4 px-4 sm:px-6 lg:px-8">
          <p className="text-base text-center leading-6 text-indigo-600 font-semibold tracking-wide uppercase">Course React with TypeScript</p>
          <h3 className="mt-2 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-800 sm:text-4xl sm:leading-10">Component Lazy Image</h3>
          <div className="max-w-xl mx-auto text-xl text-center text-gray-600 leading-7">
            <p className="mt-4 text-center">Las imágenes agregadas no se descargarán hasta que sean visibles en la pantalla, estás imágenes son tomadas de la API de la NASA.</p>
            <p className="mt-4">✨✨</p>
          </div>
        </div>
        <button className='py-[1.3em] px-[3em] text-[12px] uppercase tracking-[2.5px] font-medium text-black bg-blue-100 border-none rounded-full shadow-md transition-all duration-300 cursor-pointer outline-none my-[25px] hover:bg-blue-800 hover:text-white hover:shadow transform translate-y-[-7px] active:transform active:-translate-y-1' onClick={addNewImage}>add new</button>

        <div className="flex flex-wrap justify-center">
          {images.map((image) => (
            <div key={image.id} className="p-4">
              < LazyImage
                src={image.url}
                width={320}
                height={200}
                className='rounded bg-gray-300 object-cover' />
            </div>
          ))}
        </div>

      </main>
    </>
  )
}

export default Home
