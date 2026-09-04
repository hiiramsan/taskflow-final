import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('ana')
  const [password, setPassword] = useState('ana123')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await login(username, password)
    setLoading(false)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error ?? 'No se pudo iniciar sesión.')
    }
  }

  return (
    <main className='flex min-h-screen w-full items-start justify-center p-20'>
      <div className='w-full max-w-xl'>
        <div className='mb-2'>
          <p className='font-mono text-gray-600'>TASKFLOW API</p>
          <h1 className='font-geist text-4xl font-semibold'>Login</h1>
          <p className='mt-2 max-w-md text-gray-600'>Sign in to manage your projects and tasks.</p>
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
                onChange={(e) => setUsername(e.target.value)}
                autoComplete='username'
              />
            </label>

            <label className='flex flex-col gap-2 font-mono text-sm text-gray-600'>
              Contraseña
              <input
                className='border border-gray-400 bg-white px-3 py-3 font-sans text-base text-gray-900 outline-none transition focus:border-gray-900'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
              />
            </label>

            <button
              type='submit'
              disabled={loading}
              className='border border-gray-900 bg-gray-900 px-4 py-3 font-mono text-white transition hover:bg-lime-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'
            >
              {loading ? 'Loggin in...' : 'Log In'}
            </button>

            <p className='text-center font-mono text-sm text-gray-600'>
              Dont have an account?{' '}
              <Link to='/register' className='text-gray-900 underline decoration-lime-500 decoration-2 underline-offset-4 hover:text-lime-700'>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}