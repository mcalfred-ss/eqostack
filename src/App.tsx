import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPostDetail from './pages/BlogPostDetail'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import BlogPosts from './pages/admin/BlogPosts'
import BlogPostForm from './pages/admin/BlogPostForm'
import Contacts from './pages/admin/Contacts'
import Projects from './pages/admin/Projects'
import ProjectForm from './pages/admin/ProjectForm'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogPostDetail /></Layout>} />
        <Route path="/projects/:id" element={<Layout><ProjectDetail /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/careers" element={<Layout><Careers /></Layout>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute>
              <BlogPosts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/new"
          element={
            <ProtectedRoute>
              <BlogPostForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/:id/edit"
          element={
            <ProtectedRoute>
              <BlogPostForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects/new"
          element={
            <ProtectedRoute>
              <ProjectForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects/:id/edit"
          element={
            <ProtectedRoute>
              <ProjectForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

