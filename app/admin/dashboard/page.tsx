'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase-client'
import { LogOut, Mail, Phone, Calendar, MessageSquare, Plus, FolderOpen, Trash2, Edit2, Upload, X, FileText } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  created_at: string
}

interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  technologies: string[]
  project_url: string | null
  github_url: string | null
  featured: boolean
  created_at: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image_url: string | null
  author_name: string
  meta_title: string | null
  meta_description: string | null
  keywords: string[]
  published: boolean
  featured: boolean
  views: number
  published_at: string | null
  created_at: string
}

export default function DashboardPage() {
  const { signOut } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState<'contacts' | 'projects' | 'blog'>('contacts')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image_url: '',
    technologies: '',
    project_url: '',
    github_url: '',
    featured: false,
  })
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  useEffect(() => {
    loadContacts()
    loadProjects()
    loadBlogPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadContacts = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setContacts(data)
    }
    setLoading(false)
  }

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setProjects(data)
    }
  }

  const loadBlogPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setBlogPosts(data)
    }
  }

  const handleLogout = async () => {
    await signOut()
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este proyecto?')) return

    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (!error) {
      loadProjects()
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen válido')
      return
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB')
      return
    }

    setUploadingImage(true)

    try {
      // Crear preview local primero
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Verificar que el usuario esté autenticado
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Debes estar autenticado para subir imágenes')
      }

      // Generar nombre único para el archivo
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `projects/${fileName}`

      // Verificar si el bucket existe
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
      
      if (bucketError) {
        console.error('Error al listar buckets:', bucketError)
        throw new Error('Error al acceder a Storage. Verifica la configuración.')
      }

      const bucketExists = buckets?.some(b => b.name === 'project-images')
      
      if (!bucketExists) {
        // Intentar crear el bucket si no existe (solo si tienes permisos)
        const { error: createError } = await supabase.storage.createBucket('project-images', {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          fileSizeLimit: 5242880 // 5MB
        })
        
        if (createError) {
          console.error('Error al crear bucket:', createError)
          throw new Error('El bucket "project-images" no existe. Por favor, créalo manualmente en Supabase Storage y configúralo como público.')
        }
      }

      // Subir imagen a Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('project-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        })

      if (uploadError) {
        console.error('Error de upload:', uploadError)
        
        // Mensajes de error más específicos
        if (uploadError.message.includes('Bucket not found')) {
          throw new Error('El bucket "project-images" no existe. Créalo en Supabase Storage.')
        } else if (uploadError.message.includes('new row violates row-level security')) {
          throw new Error('Error de permisos. Verifica las políticas de Storage en Supabase.')
        } else if (uploadError.message.includes('The resource already exists')) {
          // Si el archivo ya existe, usar upsert
          const { error: upsertError } = await supabase.storage
            .from('project-images')
            .update(filePath, file, {
              cacheControl: '3600',
              contentType: file.type
            })
          
          if (upsertError) {
            throw upsertError
          }
        } else {
          throw uploadError
        }
      }

      // Obtener URL pública de la imagen
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath)

      if (!publicUrl) {
        throw new Error('No se pudo obtener la URL pública de la imagen')
      }

      setProjectForm({ ...projectForm, image_url: publicUrl })
      setUploadSuccess(true)
      setUploadError(null)
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setUploadSuccess(false)
      }, 3000)
      
      console.log('Imagen subida exitosamente:', publicUrl)
    } catch (error: any) {
      console.error('Error al subir imagen:', error)
      
      // Mensaje de error más descriptivo
      let errorMessage = error.message || 'Error desconocido al subir la imagen'
      
      // Mensajes más específicos
      if (errorMessage.includes('Bucket not found') || errorMessage.includes('bucket')) {
        errorMessage = 'El bucket "project-images" no existe. Por favor, créalo en Supabase Storage y configúralo como público.'
      } else if (errorMessage.includes('row-level security') || errorMessage.includes('RLS')) {
        errorMessage = 'Error de permisos. Verifica las políticas de Storage en Supabase.'
      } else if (errorMessage.includes('authenticated')) {
        errorMessage = 'Debes estar autenticado para subir imágenes. Por favor, inicia sesión nuevamente.'
      }
      
      setUploadError(errorMessage)
      setUploadSuccess(false)
      
      // Ocultar mensaje de error después de 10 segundos
      setTimeout(() => {
        setUploadError(null)
      }, 10000)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault()

    const projectData = {
      title: projectForm.title,
      description: projectForm.description,
      image_url: projectForm.image_url || null,
      technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(t => t),
      project_url: projectForm.project_url || null,
      github_url: projectForm.github_url || null,
      featured: projectForm.featured,
    }

    if (editingProject) {
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editingProject.id)

      if (!error) {
        loadProjects()
        setShowProjectModal(false)
        setEditingProject(null)
        resetForm()
      }
    } else {
      const { error } = await supabase.from('projects').insert([projectData])

      if (!error) {
        loadProjects()
        setShowProjectModal(false)
        resetForm()
      }
    }
  }

  const resetForm = () => {
    setProjectForm({
      title: '',
      description: '',
      image_url: '',
      technologies: '',
      project_url: '',
      github_url: '',
      featured: false,
    })
    setImagePreview(null)
    setUploadError(null)
    setUploadSuccess(false)
  }

  const openEditModal = (project: Project) => {
    setEditingProject(project)
    setProjectForm({
      title: project.title,
      description: project.description,
      image_url: project.image_url || '',
      technologies: project.technologies.join(', '),
      project_url: project.project_url || '',
      github_url: project.github_url || '',
      featured: project.featured,
    })
    setImagePreview(project.image_url || null)
    setUploadError(null)
    setUploadSuccess(false)
    setShowProjectModal(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <p className="text-sm sm:text-base text-gray-600">JVSEOAGENCY</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/"
                className="text-sm sm:text-base text-gray-600 hover:text-primary-600 transition text-center sm:text-left"
              >
                Ver Sitio Web
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-600 hover:text-red-600 transition"
              >
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 sm:gap-4 mb-6 border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition whitespace-nowrap ${
              activeTab === 'contacts'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Contactos ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition whitespace-nowrap ${
              activeTab === 'projects'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Proyectos ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition whitespace-nowrap ${
              activeTab === 'blog'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText size={18} className="inline mr-2" />
            Blog ({blogPosts.length})
          </button>
        </div>

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : contacts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No hay contactos registrados aún.
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Teléfono</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mensaje</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Mail className="text-gray-400 hidden sm:block" size={16} />
                            <span className="font-medium text-gray-900 text-sm sm:text-base">{contact.name}</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-600 text-sm sm:text-base">{contact.email}</td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-600 text-sm sm:text-base hidden sm:table-cell">
                          {contact.phone || '-'}
                        </td>
                        <td className="px-3 sm:px-6 py-4 text-gray-600 max-w-xs sm:max-w-md truncate text-sm sm:text-base">{contact.message}</td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-500 text-xs sm:text-sm hidden md:table-cell">
                          {formatDate(contact.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Gestión de Proyectos</h2>
              <button
                onClick={() => {
                  resetForm()
                  setEditingProject(null)
                  setShowProjectModal(true)
                }}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary-700 transition text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Plus size={18} />
                Nuevo Proyecto
              </button>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
                  {project.image_url && (
                    <div className="relative w-full h-48">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      {project.featured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Destacado</span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition"
                      >
                        <Edit2 size={16} />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <FolderOpen className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No hay proyectos aún. Crea tu primer proyecto.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Blog Tab */}
      {activeTab === 'blog' && (
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Gestión del Blog</h2>
            <a
              href="/admin/blog/new"
              className="flex items-center gap-2 bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary-700 transition text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Plus size={18} />
              Nuevo Artículo
            </a>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
                {post.featured_image_url && (
                  <div className="relative w-full h-48">
                    <Image
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{post.title}</h3>
                    <div className="flex gap-2 ml-2">
                      {post.published && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Publicado</span>
                      )}
                      {post.featured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Destacado</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <span>{post.views} vistas</span>
                    {post.published_at && (
                      <span>• {formatDate(post.published_at)}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition text-sm"
                    >
                      <Edit2 size={16} />
                      Editar
                    </Link>
                    <button
                      onClick={async () => {
                        if (!confirm('¿Estás seguro de que quieres eliminar este artículo?')) return
                        const { error } = await supabase.from('blog_posts').delete().eq('id', post.id)
                        if (!error) loadBlogPosts()
                      }}
                      className="flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 transition text-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {blogPosts.length === 0 && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <FileText className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500">No hay artículos aún. Crea tu primer artículo.</p>
            </div>
          )}
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </h2>
            </div>
            <form onSubmit={handleSaveProject} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  required
                  rows={4}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen del Proyecto
                </label>
                
                {/* Preview de imagen */}
                {imagePreview && (
                  <div className="mb-4 relative h-48">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null)
                        setProjectForm({ ...projectForm, image_url: '' })
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Opción 1: Subir archivo */}
                <div className="mb-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploadingImage ? (
                        <>
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-2"></div>
                          <p className="text-sm text-gray-500">Subiendo imagen...</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                {/* Mensajes de éxito y error */}
                {uploadSuccess && (
                  <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                    ✅ Imagen subida exitosamente
                  </div>
                )}
                {uploadError && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                    <div className="font-semibold mb-2">❌ Error al subir imagen:</div>
                    <div className="mb-2">{uploadError}</div>
                    <div className="text-xs mt-2 pt-2 border-t border-red-200">
                      <strong>Verifica:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Que el bucket &quot;project-images&quot; exista en Supabase Storage</li>
                        <li>Que el bucket esté marcado como público</li>
                        <li>Que las políticas de Storage estén configuradas (ver STORAGE-SETUP.md)</li>
                        <li>Que estés autenticado correctamente</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Opción 2: URL manual (alternativa) */}
                <div className="text-sm text-gray-600 mb-2">O ingresa una URL:</div>
                <input
                  type="url"
                  value={projectForm.image_url}
                  onChange={(e) => {
                    setProjectForm({ ...projectForm, image_url: e.target.value })
                    setUploadError(null)
                    setUploadSuccess(false)
                    if (e.target.value) {
                      setImagePreview(e.target.value)
                    } else {
                      setImagePreview(null)
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tecnologías (separadas por comas)
                </label>
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="React, Next.js, TypeScript"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL del Proyecto
                  </label>
                  <input
                    type="url"
                    value={projectForm.project_url}
                    onChange={(e) => setProjectForm({ ...projectForm, project_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="https://proyecto.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de GitHub
                  </label>
                  <input
                    type="url"
                    value={projectForm.github_url}
                    onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="https://github.com/usuario/repo"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
                  Proyecto Destacado
                </label>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary-700 transition text-sm sm:text-base"
                >
                  {editingProject ? 'Actualizar' : 'Crear'} Proyecto
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProjectModal(false)
                    setEditingProject(null)
                    resetForm()
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

