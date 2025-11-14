import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen pt-24 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Artículo no encontrado
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          El artículo que buscas no existe o ha sido eliminado.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
        >
          <ArrowLeft size={18} />
          Volver al blog
        </Link>
      </div>
    </main>
  )
}

