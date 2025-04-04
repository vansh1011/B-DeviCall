import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Authentication from './pages/Authentication'
import { AuthProvider } from './Context/AuthContext'
import VideoMeetComponent from './pages/VideoMeet'
import  Home from './pages/Home'
import History from './pages/history'
function App() {


  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Landing />} />

            <Route path='/auth' element={<Authentication />} />

            <Route path='/home' s element={<Home />} />
            <Route path='/history' element={<History />} />
            <Route path='/:url' element={<VideoMeetComponent />} />
          </Routes>
        </AuthProvider>

      </Router>
    </>
  )
}

export default App
