import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LazyImage',
  description: 'Un componente genérico de React para cargar imágenes con lazy loading'
}

export default function RootLayou ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
