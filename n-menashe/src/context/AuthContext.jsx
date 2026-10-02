// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, auth } from '../utils/supabase'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isModerator, setIsModerator] = useState(false)
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        checkUserRole(session.user)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          await checkUserRole(session.user)
        } else {
          setIsAdmin(false)
          setIsModerator(false)
          setPermissions([])
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const checkUserRole = async (user) => {
    try {
      // Check if user is admin from user metadata or database
      const { data, error } = await supabase
        .from('profiles')
        .select('role, permissions')
        .eq('id', user.id)
        .single()

      if (error) throw error

      setIsAdmin(data?.role === 'admin')
      setIsModerator(data?.role === 'moderator' || data?.role === 'admin')
      setPermissions(data?.permissions || [])
    } catch (error) {
      console.error('Error checking user role:', error)
      setIsAdmin(false)
      setIsModerator(false)
      setPermissions([])
    }
  }

  const signUp = async (email, password, username) => {
    return await auth.signUp(email, password, username)
  }

  const signIn = async (email, password) => {
    return await auth.signIn(email, password)
  }

  const signOut = async () => {
    return await auth.signOut()
  }

  const resetPassword = async (email) => {
    return await auth.resetPassword(email)
  }

  const hasPermission = (permission) => {
    return permissions.includes(permission) || isAdmin
  }

  const value = {
    user,
    session,
    loading,
    isAdmin,
    isModerator,
    permissions,
    hasPermission,
    signUp,
    signIn,
    signOut,
    resetPassword,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}