import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import AdminNav from '../../components/admin/AdminNav'
import { Save, ArrowLeft, Upload, Image as ImageIcon, X, Plus } from 'lucide-react'

const ProjectForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    variants: [] as string[],
    download_url: '',
    order_index: 0,
    published: true,
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEditing)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [newVariant, setNewVariant] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      fetchProject()
    }
  }, [id])

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      if (data) {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          image: data.image || '',
          variants: data.variants || [],
          download_url: data.download_url || '',
          order_index: data.order_index || 0,
          published: data.published !== undefined ? data.published : true,
        })
        if (data.image) {
          setImagePreview(data.image)
        }
      }
    } catch (error) {
      console.error('Error fetching project:', error)
      alert('Failed to load project')
      navigate('/admin/projects')
    } finally {
      setFetching(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `project-images/${fileName}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        // If bucket doesn't exist, try blog-images as fallback
        if (uploadError.message.includes('Bucket not found')) {
          const { data: fallbackData, error: fallbackError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false,
            })
          
          if (fallbackError) {
            alert('Storage bucket not found. Please create a "project-images" or "blog-images" bucket in Supabase Storage.')
            setUploading(false)
            return
          }

          const { data: urlData } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath)

          if (urlData?.publicUrl) {
            setFormData({ ...formData, image: urlData.publicUrl })
            setImagePreview(urlData.publicUrl)
          }
        } else {
          throw uploadError
        }
      } else {
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(filePath)

        if (urlData?.publicUrl) {
          setFormData({ ...formData, image: urlData.publicUrl })
          setImagePreview(urlData.publicUrl)
        }
      }

      setUploadProgress(100)
    } catch (error: any) {
      console.error('Error uploading image:', error)
      alert(error.message || 'Failed to upload image')
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  const addVariant = () => {
    if (newVariant.trim() && !formData.variants.includes(newVariant.trim())) {
      setFormData({
        ...formData,
        variants: [...formData.variants, newVariant.trim()],
      })
      setNewVariant('')
    }
  }

  const removeVariant = (index: number) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const projectData: any = {
        ...formData,
      }

      if (isEditing) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('projects').insert([projectData])
        if (error) throw error
      }

      navigate('/admin/projects')
    } catch (error: any) {
      console.error('Error saving project:', error)
      alert(error.message || 'Failed to save project')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNav />
      
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/projects')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white">
                {isEditing ? 'Edit Project' : 'New Project'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Mobile App - Task Manager"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder="Describe your project..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Image
                <span className="text-xs text-gray-500 ml-2">
                  (Recommended: 4:3 ratio, max 5MB)
                </span>
              </label>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4 relative">
                  <div className="relative w-full max-w-md">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-auto rounded-lg border-2 border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null)
                        setFormData({ ...formData, image: '' })
                        if (fileInputRef.current) fileInputRef.current.value = ''
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Area */}
              {!imagePreview && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <ImageIcon className="mx-auto text-gray-500 mb-4" size={48} />
                  <p className="text-gray-400 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}

              {/* Upload Progress */}
              {uploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Uploading...</span>
                    <span className="text-sm text-gray-400">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Or use URL (fallback) */}
              {!imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2 text-center">Or enter image URL:</p>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value })
                      setImagePreview(e.target.value || null)
                    }}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}
            </div>

            {/* Variants */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Variants (e.g., iOS, Android, Web)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newVariant}
                  onChange={(e) => setNewVariant(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addVariant()
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter variant name"
                />
                <button
                  type="button"
                  onClick={addVariant}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
              {formData.variants.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.variants.map((variant, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {variant}
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-primary-400 hover:text-primary-300"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Download URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Download URL
              </label>
              <input
                type="url"
                value={formData.download_url}
                onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com/download/app.apk"
              />
            </div>

            {/* Order Index */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Order Index (for sorting)
              </label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Published Checkbox */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-300">Published</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ProjectForm
