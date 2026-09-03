import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import ProjectPage from './pages/ProjectPage'
import { ProtectedRoute } from './ProtectedRoute'
import { AppLayout } from './AppLayout'

const theme = createTheme()
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="relative flow-root min-h-screen w-full bg-[#f5f3ee]">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e7eb 1px, transparent 1px),
              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10">
          <AuthProvider>
            <BrowserRouter basename={routerBasename}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/projects/:projectId" element={<ProjectPage />} />
                  </Route>
                </Route>
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </div>
      </div>
    </ThemeProvider>
  )
}

