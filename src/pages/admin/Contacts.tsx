import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import AdminNav from '../../components/admin/AdminNav'
import { Mail, Check, Archive, Search, Eye, X } from 'lucide-react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  created_at: string
  read_at?: string
  replied_at?: string
}

const Contacts = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const updateData: any = { status: newStatus }
      
      if (newStatus === 'read' && !contacts.find(c => c.id === id)?.read_at) {
        updateData.read_at = new Date().toISOString()
      }
      if (newStatus === 'replied') {
        updateData.replied_at = new Date().toISOString()
      }

      const { error } = await supabase
        .from('contact_submissions')
        .update(updateData)
        .eq('id', id)

      if (error) throw error
      fetchContacts()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: contacts.length,
    new: contacts.filter((c) => c.status === 'new').length,
    read: contacts.filter((c) => c.status === 'read').length,
    replied: contacts.filter((c) => c.status === 'replied').length,
    archived: contacts.filter((c) => c.status === 'archived').length,
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNav />
      
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-white">Contact Submissions</h1>
          <p className="text-gray-400 text-sm mt-1">Manage and respond to contact form submissions</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Object.entries(statusCounts).map(([status, count]) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                    statusFilter === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                </button>
              ))}
            </div>

            {/* Contacts List */}
            {loading ? (
              <div className="text-center text-white py-12">Loading...</div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="mx-auto text-gray-600 mb-4" size={48} />
                <p className="text-gray-400">No contacts found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredContacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedContact(contact)}
                    className={`bg-gray-800 rounded-lg p-4 border cursor-pointer transition-colors ${
                      selectedContact?.id === contact.id
                        ? 'border-primary-500'
                        : 'border-gray-700 hover:border-gray-600'
                    } ${
                      contact.status === 'new' ? 'bg-primary-500/5' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-white">{contact.name}</h3>
                          {contact.status === 'new' && (
                            <span className="px-2 py-0.5 bg-primary-600 text-white text-xs font-semibold rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-1">{contact.email}</p>
                        <p className="text-sm font-medium text-gray-300">{contact.subject}</p>
                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{contact.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(contact.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedContact ? (
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Contact Details</h2>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Name</label>
                    <p className="text-white font-semibold">{selectedContact.name}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-primary-400 hover:underline"
                      >
                        {selectedContact.email}
                      </a>
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Subject</label>
                    <p className="text-white">{selectedContact.subject}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Message</label>
                    <p className="text-white whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Submitted</label>
                    <p className="text-white text-sm">
                      {new Date(selectedContact.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <p className="text-white capitalize">{selectedContact.status}</p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-700 space-y-2">
                    {selectedContact.status === 'new' && (
                      <button
                        onClick={() => updateStatus(selectedContact.id, 'read')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                      >
                        <Check size={18} />
                        Mark as Read
                      </button>
                    )}
                    {selectedContact.status !== 'replied' && (
                      <button
                        onClick={() => updateStatus(selectedContact.id, 'replied')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        <Check size={18} />
                        Mark as Replied
                      </button>
                    )}
                    {selectedContact.status !== 'archived' && (
                      <button
                        onClick={() => updateStatus(selectedContact.id, 'archived')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                      >
                        <Archive size={18} />
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                <Eye className="mx-auto text-gray-600 mb-4" size={48} />
                <p className="text-gray-400">Select a contact to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Contacts
