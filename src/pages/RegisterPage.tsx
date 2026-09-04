import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const minimumPasswordLength = 8

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const emailIsValid = emailPattern.test(email.trim())
  const passwordIsValid = password.length >= minimumPasswordLength
  const passwordsMatch = password === confirmPassword
  const formIsValid = username.trim().length >= 3 && emailIsValid && passwordIsValid && passwordsMatch

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!formIsValid || loading) return

    setLoading(true)
    setError(null)

    const result = await register(username, email.trim(), password)
    setLoading(false)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error ?? 'Could not create your account.')
    }
  }

  return (
    <main className='flex min-h-screen w-full items-start justify-center p-20'>
      <div className='w-full max-w-xl'>
        <div className='mb-4'>
          <p className='font-mono text-gray-600'>TASKFLOW API</p>
          <h1 className='font-geist text-4xl font-semibold'>Register</h1>
          <p className='mt-2 max-w-md text-gray-600'>Create an account to manage your projects and tasks.</p>
        </div>

        <form onSubmit={handleSubmit} className='border-t border-gray-500 pt-4'>
          <div className='flex flex-col gap-6'>
            {error && (
              <p role='alert' className='border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700'>
                {error}
              </p>
            )}

            <label className='flex flex-col gap-2 font-mono text-sm text-gray-600'>
              Usuario
              <input
                className='border border-gray-400 bg-white px-3 py-3 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete='username'
                required
              />
            </label>

            <label className='flex flex-col gap-2 font-mono text-sm text-gray-600'>
              Email
              <input
                className='border border-gray-400 bg-white px-3 py-3 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900'
                type='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete='email'
                required
              />
              {email.length > 0 && !emailIsValid && <span className='text-xs text-red-700'>Enter a valid email address.</span>}
            </label>

            <label className='flex flex-col gap-2 font-mono text-sm text-gray-600'>
              Contraseña
              <div className='relative'>
                <input
                  className='w-full border border-gray-400 bg-white px-3 py-3 pr-11 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete='new-password'
                  required
                />
                <button
                  type='button'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer border border-gray-400 p-1 text-gray-600 transition hover:border-gray-900 hover:bg-white hover:text-gray-900'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password.length > 0 && !passwordIsValid && <span className='text-xs text-red-700'>Use at least {minimumPasswordLength} characters.</span>}
            </label>

            <label className='flex flex-col gap-2 font-mono text-sm text-gray-600'>
              Confirmar contraseña
              <div className='relative'>
                <input
                  className='w-full border border-gray-400 bg-white px-3 py-3 pr-11 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900'
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete='new-password'
                  required
                />
                <button
                  type='button'
                  aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
                  title={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer border border-gray-400 p-1 text-gray-600 transition hover:border-gray-900 hover:bg-white hover:text-gray-900'
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword.length > 0 && !passwordsMatch && <span className='text-xs text-red-700'>Passwords do not match.</span>}
            </label>

            <button
              type='submit'
              disabled={!formIsValid || loading}
              className='cursor-pointer border border-gray-900 bg-gray-900 px-4 py-3 font-mono text-white transition hover:bg-lime-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>

            <p className='text-center font-mono text-sm text-gray-600'>
              Already have an account?{' '}
              <Link to='/login' className='text-gray-900 underline decoration-lime-500 decoration-2 underline-offset-4 hover:text-lime-700'>
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}
