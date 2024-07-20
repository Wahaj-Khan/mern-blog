import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Projects from './pages/Projects'
import Header from './components/Header'
import Footer from './components/Footer'
import PublicRoute from './components/Routing/PublicRoute'
import PrivateRoute from './components/Routing/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes accessible only by unauthenticated users */}
        <Route path="/sign-in" element={<PublicRoute element={<SignIn />} />} />
        <Route path="/sign-up" element={<PublicRoute element={<SignUp />} />} />

        {/* Private Routes accessible only by authenticated users */}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/about" element={<PrivateRoute element={<About />} />} />
        <Route path="/projects" element={<PrivateRoute element={<Projects />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App