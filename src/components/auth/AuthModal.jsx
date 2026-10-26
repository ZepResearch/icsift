"use client"

import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Eye, EyeOff, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'react-hot-toast'

const TABS = [
  ['login', 'Sign in'],
  ['register', 'Create account'],
]

function TextField({ id, label, hint, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[15px]">
        {label}
      </label>
      <input id={id} aria-describedby={hint ? `${id}-hint` : undefined} className="herb-input mt-2" {...props} />
      {hint ? (
        <p id={`${id}-hint`} className="herb-muted mt-1.5 text-[14px]">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

function PasswordField({ id, label, value, onChange, shown, onToggle, autoComplete, hint }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[15px]">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          value={value}
          onChange={onChange}
          type={shown ? 'text' : 'password'}
          required
          autoComplete={autoComplete}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="herb-input pr-12"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 grid w-12 place-items-center text-[var(--ink-2)] hover:text-[var(--ink)]"
          aria-label={shown ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={shown}
        >
          {shown ? <EyeOff className="h-[18px] w-[18px]" strokeWidth={1.6} /> : <Eye className="h-[18px] w-[18px]" strokeWidth={1.6} />}
        </button>
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="herb-muted mt-1.5 text-[14px]">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

// Turns a PocketBase error into a sentence that names the problem and the fix.
function describeError(err, mode) {
  if (!err) return mode === 'login' ? 'Sign-in failed. Please try again.' : 'Your account could not be created. Please try again.'
  const status = err?.status
  if (mode === 'login' && (status === 400 || status === 401)) return 'That email or username and password do not match. Check them and try again.'
  if (status === 0 || status === undefined) return 'We could not reach the server. Check your connection and try again.'
  const details = err?.data?.data?.details || err?.data?.details || err?.data?.data || err?.details
  if (details && typeof details === 'object' && Object.keys(details).length) {
    return Object.entries(details)
      .map(([field, value]) => {
        const text = typeof value === 'object' && value?.message ? value.message : Array.isArray(value) ? value.join(', ') : String(value)
        return `${field.replace(/_/g, ' ')}: ${text}`
      })
      .join(' ')
  }
  return err?.data?.message || err?.message || 'Something went wrong. Please try again.'
}

export default function AuthModal() {
  const { isOpen, closeAuthModal, login, register, googleAuth, isLoading } = useAuth()
  const dialog = useRef(null)
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

  // Drive the native dialog from the auth context's open state.
  useEffect(() => {
    if (isOpen && !dialog.current?.open) dialog.current?.showModal()
    if (!isOpen && dialog.current?.open) dialog.current.close()
  }, [isOpen])

  const switchMode = (next) => {
    setMode(next)
    setFormError('')
    document.getElementById(`auth-tab-${next}`)?.focus()
  }

  const onTabKey = (event, index) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    switchMode(TABS[(index + step + TABS.length) % TABS.length][0])
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (mode === 'login') {
      const res = await login(identity || email || username, password)
      if (!res || res.ok === false) {
        const msg = describeError(res?.error, 'login')
        setFormError(msg)
        toast.error(msg)
      }
      return
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      setFormError('Enter a valid email address, like name@university.edu.')
      return
    }

    const uname = username.trim().toLowerCase().replace(/\s+/g, '_')
    const unameRe = /^[a-z0-9._-]{3,30}$/
    if (!unameRe.test(uname)) {
      setFormError('Choose a username of 3 to 30 characters: letters, numbers, dots, underscores or hyphens.')
      return
    }

    if (!phone || phone.trim().length < 6) {
      setFormError('Enter a phone number with its country code.')
      return
    }

    if (!country || country.trim().length < 2) {
      setFormError('Enter your country.')
      return
    }

    if (password.length < 8) {
      setFormError('Use a password of at least 8 characters.')
      return
    }

    if (password !== passwordConfirm) {
      setFormError('The two passwords do not match. Type them again.')
      return
    }

    const result = await register({ email, password, passwordConfirm, username: uname, name, phone_no: phone, country })
    if (!result || result.ok === false) {
      const msg = describeError(result?.error, 'register')
      setFormError(msg)
      toast.error(msg)
    }
  }

  return (
    <dialog
      ref={dialog}
      className="herb herb-dialog sm:!w-[min(500px,100vw)]"
      aria-labelledby="auth-title"
      onClose={() => isOpen && closeAuthModal()}
      onClick={(event) => event.target === dialog.current && !isLoading && dialog.current.close()}
    >
      {isOpen ? (
        <div className="flex h-full flex-col overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 id="auth-title" className="text-[2rem] leading-tight tracking-[-0.02em]">
                {mode === 'login' ? 'Welcome back.' : 'Create your account.'}
              </h2>
              <p className="herb-muted mt-2 text-[15.5px]">
                One Zep Research account for registration, paper submission and tracking.
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="grid h-10 w-10 shrink-0 place-items-center border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
              aria-label="Close sign-in"
            >
              <X className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </div>

          <div role="tablist" aria-label="Account" className="mt-8 flex gap-x-7 border-b border-[var(--rule)]">
            {TABS.map(([value, label], index) => (
              <button
                key={value}
                id={`auth-tab-${value}`}
                role="tab"
                type="button"
                aria-selected={mode === value}
                aria-controls="auth-panel"
                tabIndex={mode === value ? 0 : -1}
                onClick={() => switchMode(value)}
                onKeyDown={(event) => onTabKey(event, index)}
                className="herb-tab"
              >
                {label}
              </button>
            ))}
          </div>

          <form id="auth-panel" role="tabpanel" aria-labelledby={`auth-tab-${mode}`} onSubmit={onSubmit} className="mt-6 grid gap-5" aria-busy={isLoading}>
            {formError ? (
              <p role="alert" className="border border-[var(--ink)] px-4 py-3 text-[15.5px]">
                {formError}
              </p>
            ) : null}

            {mode === 'register' ? (
              <>
                <TextField id="auth-name" label="Full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                <TextField id="auth-email" label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                <TextField
                  id="auth-username"
                  label="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  hint="3 to 30 characters: letters, numbers, dots, underscores or hyphens."
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField id="auth-phone" label="Phone number" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
                  <TextField id="auth-country" label="Country" required value={country} onChange={(e) => setCountry(e.target.value)} autoComplete="country-name" />
                </div>
                <PasswordField
                  id="auth-password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  shown={showPassword}
                  onToggle={() => setShowPassword((s) => !s)}
                  autoComplete="new-password"
                  hint="At least 8 characters."
                />
                <PasswordField
                  id="auth-password-confirm"
                  label="Confirm password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  shown={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword((s) => !s)}
                  autoComplete="new-password"
                />
              </>
            ) : (
              <>
                <TextField
                  id="auth-identity"
                  label="Email or username"
                  required
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  autoComplete="username"
                />
                <PasswordField
                  id="auth-login-password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  shown={showPassword}
                  onToggle={() => setShowPassword((s) => !s)}
                  autoComplete="current-password"
                />
              </>
            )}

            <button type="submit" disabled={isLoading} data-primary className="herb-btn mt-1 w-full disabled:cursor-wait disabled:opacity-70">
              <span>{isLoading ? (mode === 'login' ? 'Signing in…' : 'Creating account…') : mode === 'login' ? 'Sign in' : 'Create account'}</span>
              <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
            </button>

            <div className="flex items-center gap-4 text-[14px] text-[var(--ink-2)]" aria-hidden="true">
              <span className="h-px flex-1 bg-[var(--rule)]" />
              <span className="herb-italic">or</span>
              <span className="h-px flex-1 bg-[var(--rule)]" />
            </div>

            <button type="button" onClick={googleAuth} className="herb-btn w-full">
              <span className="flex items-center gap-3">
                <svg viewBox="0 0 533.5 544.3" className="h-[18px] w-[18px]" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M533.5 278.4c0-17.4-1.6-34.4-4.7-51H272v96.8h146.9c-6.4 34.8-25.6 64.3-54.5 84.1v69.7h88.1c51.6-47.6 81-117.5 81-199.6z" fill="#4285F4" />
                  <path d="M272 544.3c73.7 0 135.6-24.4 180.7-66.1l-88.1-69.7c-24.5 16.4-56 26-92.6 26-71.3 0-131.8-48.1-153.6-112.7H29.5v70.9C74.8 483.4 167.6 544.3 272 544.3z" fill="#34A853" />
                  <path d="M118.4 323.8c-10.5-31.2-10.5-64.6 0-95.8V157.1H29.5c-38 74-38 161.8 0 235.8l88.9-69.1z" fill="#FBBC05" />
                  <path d="M272 107.7c39.7 0 75.4 13.6 103.6 40.4l77.8-77.8C407.1 24.7 344.1 0 272 0 167.6 0 74.8 60.9 29.5 157.1l88.9 70.9C140.2 156.2 200.7 107.7 272 107.7z" fill="#EA4335" />
                </svg>
                Continue with Google
              </span>
            </button>
          </form>

          <p className="herb-muted mt-8 border-t border-[var(--rule)] pt-5 text-[15px]">
            {mode === 'login' ? 'New here? ' : 'Already have an account? '}
            <button type="button" className="herb-link" onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Create an account' : 'Sign in instead'}
            </button>
          </p>
        </div>
      ) : null}
    </dialog>
  )
}
