"use client"

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'react-hot-toast'

export default function AuthModal() {
  const { isOpen, closeAuthModal, login, register, googleAuth, isLoading } = useAuth()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [identity, setIdentity] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formError, setFormError] = useState('')

  if (!isOpen) return null

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (mode === 'login') {
      const res = await login(identity || email || username, password)
      if (!res || res.ok === false) {
        const msg = res?.error?.message || 'Login failed'
        setFormError(msg)
        toast.error(msg)
      }
      return
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      setFormError('Please enter a valid email address')
      return
    }

    const uname = username.trim().toLowerCase().replace(/\s+/g, '_')
    const unameRe = /^[a-z0-9._-]{3,30}$/
    if (!unameRe.test(uname)) {
      setFormError('Username must be 3-30 characters: letters, numbers, dot, underscore or hyphen')
      return
    }

    if (!phone || phone.trim().length < 6) {
      setFormError('Please enter a valid phone number')
      return
    }

    if (!country || country.trim().length < 2) {
      setFormError('Please enter your country')
      return
    }

    if (password.length < 8) {
      setFormError('Password must be at least 8 characters')
      return
    }

    if (password !== passwordConfirm) {
      setFormError('Passwords do not match')
      return
    }

    const result = await register({ email, password, passwordConfirm, username: uname, name, phone_no: phone, country })
    if (!result || result.ok === false) {
      let msg = 'Registration failed'
      const err = result?.error
      if (err) {
        const d = err?.data || err
        const details = err?.data?.data?.details || err?.data?.details || d?.details
        if (details && typeof details === 'object') {
          msg = Object.entries(details)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
            .join('; ')
        } else {
          msg = d?.message || err?.message || JSON.stringify(d)
        }
      }
      setFormError(msg)
      toast.error(msg)
      return
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{mode === 'login' ? 'Login to your account' : 'Create a new account'}</h3>
            <p className="mt-1 text-sm text-slate-500">Secure access for ICSIFT attendees and exhibitors.</p>
          </div>
          <button
            type="button"
            aria-label="Close authentication modal"
            className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            onClick={closeAuthModal}
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {formError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {formError}
            </div>
          )}

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700">Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200"
                  placeholder="icsift_user"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Phone number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200"
                  placeholder="+1 555 123 4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Country</label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200"
                  placeholder="Philippines"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((state) => !state)}
                  className="absolute inset-y-0 right-2 top-6 flex items-center rounded-full px-2 text-slate-500 transition hover:text-slate-900"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-slate-700">Confirm password</label>
                <input
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((state) => !state)}
                  className="absolute inset-y-0 right-2 top-6 flex items-center rounded-full px-2 text-slate-500 transition hover:text-slate-900"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </>
          )}

          {mode === 'login' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email or username</label>
                <input
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  required
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200"
                  placeholder="name@example.com or username"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((state) => !state)}
                  className="absolute inset-y-0 right-2 top-6 flex items-center rounded-full px-2 text-slate-500 transition hover:text-slate-900"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {mode === 'login' ? 'Login' : 'Create account'}
            </button>

            <button
              type="button"
              onClick={googleAuth}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <svg viewBox="0 0 533.5 544.3" className="h-4 w-4" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M533.5 278.4c0-17.4-1.6-34.4-4.7-51H272v96.8h146.9c-6.4 34.8-25.6 64.3-54.5 84.1v69.7h88.1c51.6-47.6 81-117.5 81-199.6z" fill="#4285F4"/>
                <path d="M272 544.3c73.7 0 135.6-24.4 180.7-66.1l-88.1-69.7c-24.5 16.4-56 26-92.6 26-71.3 0-131.8-48.1-153.6-112.7H29.5v70.9C74.8 483.4 167.6 544.3 272 544.3z" fill="#34A853"/>
                <path d="M118.4 323.8c-10.5-31.2-10.5-64.6 0-95.8V157.1H29.5c-38 74-38 161.8 0 235.8l88.9-69.1z" fill="#FBBC05"/>
                <path d="M272 107.7c39.7 0 75.4 13.6 103.6 40.4l77.8-77.8C407.1 24.7 344.1 0 272 0 167.6 0 74.8 60.9 29.5 157.1l88.9 70.9C140.2 156.2 200.7 107.7 272 107.7z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-slate-600">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button type="button" className="font-semibold text-green-600 hover:text-green-700" onClick={() => setMode('register')}>
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button type="button" className="font-semibold text-green-600 hover:text-green-700" onClick={() => setMode('login')}>
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
