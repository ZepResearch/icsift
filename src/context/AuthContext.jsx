"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import pb from '@/lib/zep-pocketbase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(pb.authStore.model || null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onChange = () => setUser(pb.authStore.model || null)
    pb.authStore.onChange(onChange)
    return () => {
      try {
        pb.authStore.offChange(onChange)
      } catch (e) {}
    }
  }, [])

  const login = async (identity, password) => {
    setIsLoading(true)
    try {
      const authData = await pb.collection('users').authWithPassword(identity, password)
      setUser(pb.authStore.model || authData.record || null)
      setIsOpen(false)
      return { ok: true, authData }
    } catch (err) {
      return { ok: false, error: err }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async ({ email, password, passwordConfirm, username, name, phone_no, country }) => {
    setIsLoading(true)
    try {
      // create user record (PocketBase requires passwordConfirm)
      const record = await pb.collection('users').create({
        email,
        password,
        passwordConfirm: passwordConfirm || password,
        username: username || email,
        name,
        phone_no,
        country,
      })
      // auto-login after register
      await pb.collection('users').authWithPassword(email, password)
      setUser(pb.authStore.model || record)
      setIsOpen(false)
      return { ok: true, record }
    } catch (err) {
      return { ok: false, error: err }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    pb.authStore.clear()
    setUser(null)
  }

  const openAuthModal = () => setIsOpen(true)
  const closeAuthModal = () => setIsOpen(false)

  const googleAuth = async () => {
    if (typeof window === 'undefined') return
    // Prefer the SDK flow, but fall back to a full redirect if the SDK popup/iframe fails.
    try {
      const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' })
      // update local state and close modal on success
      setUser(pb.authStore.model || authData.record || null)
      setIsOpen(false)
      return { ok: true, authData }
    } catch (err) {
      console.warn('authWithOAuth2 failed, falling back to redirect flow', err)
    }

    try {
      const methods = await pb.collection('users').listAuthMethods()
      const provider = methods?.oauth2?.providers?.find((p) => p.name === 'google')
      const url = provider?.authURL || provider?.authUrl
      if (url) {
        // close modal before redirecting
        setIsOpen(false)
        // Some authURL values may be missing redirect_uri; let PocketBase handle it when possible.
        window.location.href = url
      } else {
        console.error('Google auth provider URL not available', methods)
      }
    } catch (err) {
      console.error('Failed to initiate Google OAuth redirect', err)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, isOpen, openAuthModal, closeAuthModal, googleAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
