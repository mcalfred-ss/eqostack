import { supabase } from './supabase'
import { User } from '@supabase/supabase-js'

export interface AdminUser {
  id: string
  email: string
  full_name?: string
  role: 'admin' | 'editor'
}

export const auth = {
  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Check if user is admin
  async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser()
    if (!user) return false

    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single()

    return !error && !!data
  },

  // Get admin user details
  async getAdminUser(): Promise<AdminUser | null> {
    const user = await this.getCurrentUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error || !data) return null
    return data as AdminUser
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null)
    })
  },
}
