import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { useTheme } from './hooks/useTheme'
import Home from './pages/Home'
import Generator from './pages/Generator'
import Responses from './pages/Responses'
import Dashboard from './pages/Dashboard'
import FormView from './pages/FormView'
import FormResponses from './pages/FormResponses'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Layout theme={theme} onToggleTheme={toggleTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form/:formId" element={<FormView />} />
        <Route path="/form/:formId/responses" element={<FormResponses />} />
        <Route path="/responses" element={<Responses />} />
      </Routes>
    </Layout>
  )
}
