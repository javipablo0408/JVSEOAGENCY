'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { ExternalLink, Github, Star } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  technologies: string[]
  project_url: string | null
  github_url: string | null
  featured: boolean
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setProjects(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <section id="proyectos" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return null
  }

  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <section id="proyectos" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
            Nuestros Proyectos
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Descubre algunos de nuestros trabajos más destacados
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6 sm:mb-8 px-4">
              <Star className="text-yellow-500" size={20} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Proyectos Destacados</h3>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-0">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            {featuredProjects.length > 0 && (
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 px-4 sm:px-0">Más Proyectos</h3>
            )}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${featured ? 'border-2 border-yellow-200' : ''}`}>
      {project.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          {featured && (
            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Star size={14} />
              Destacado
            </div>
          )}
        </div>
      )}
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{project.title}</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="bg-primary-100 text-primary-700 text-xs px-2 sm:px-3 py-1 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm sm:text-base"
            >
              <ExternalLink size={16} />
              Ver Proyecto
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-gray-400 transition text-sm sm:text-base"
            >
              <Github size={16} />
              Código
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

