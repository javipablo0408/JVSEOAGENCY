'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Technologies() {
  const technologies = [
    {
      name: 'Next.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
      fallback: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png',
      url: 'https://nextjs.org',
    },
    {
      name: 'React',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      fallback: 'https://react.dev/favicon-32x32.png',
      url: 'https://react.dev',
    },
    {
      name: 'TypeScript',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
      fallback: 'https://www.typescriptlang.org/favicon-32x32.png',
      url: 'https://www.typescriptlang.org',
    },
    {
      name: 'Supabase',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
      fallback: 'https://supabase.com/favicon/favicon-32x32.png',
      url: 'https://supabase.com',
    },
    {
      name: 'n8n',
      logo: 'https://avatars.githubusercontent.com/u/45487711?s=200&v=4',
      fallback: 'https://n8n.io/favicon-32x32.png',
      url: 'https://n8n.io',
    },
    {
      name: 'WordPress',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg',
      fallback: 'https://s.w.org/favicon.ico',
      url: 'https://wordpress.org',
    },
    {
      name: 'Node.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
      fallback: 'https://nodejs.org/static/images/favicons/favicon-32x32.png',
      url: 'https://nodejs.org',
    },
    {
      name: 'Tailwind CSS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-plain.svg',
      fallback: 'https://tailwindcss.com/favicons/favicon-32x32.png',
      url: 'https://tailwindcss.com',
    },
  ]

  const TechCard = ({ tech, index }: { tech: typeof technologies[0]; index: number }) => {
    const [imgSrc, setImgSrc] = useState(tech.logo)
    const [hasError, setHasError] = useState(false)

    const handleError = () => {
      if (!hasError && tech.fallback) {
        setImgSrc(tech.fallback)
        setHasError(true)
      }
    }

    return (
      <a
        href={tech.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center justify-center p-6 rounded-xl border-2 border-gray-200 hover:border-primary-400 hover:shadow-xl transition-all duration-300 w-full h-36 bg-white hover:bg-primary-50"
        title={tech.name}
      >
        <div className="relative h-16 w-16 mb-4 flex items-center justify-center">
          {!hasError || tech.fallback ? (
            <Image
              src={imgSrc}
              alt={`${tech.name} logo`}
              width={64}
              height={64}
              className="object-contain group-hover:scale-110 transition-transform duration-300"
              onError={handleError}
              unoptimized
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg">
              <span className="text-primary-600 font-bold text-xs">{tech.name}</span>
            </div>
          )}
        </div>
        <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors text-center">
          {tech.name}
        </span>
      </a>
    )
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tecnologías que Utilizamos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trabajamos con las mejores herramientas y frameworks del mercado para crear soluciones de calidad
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 items-center justify-items-center">
          {technologies.map((tech, index) => (
            <TechCard key={index} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

