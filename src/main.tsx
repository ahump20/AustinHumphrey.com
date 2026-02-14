import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Origin from './pages/Origin'
import OriginMemphis from './pages/OriginMemphis'
import OriginTexas from './pages/OriginTexas'
import OriginJourney from './pages/OriginJourney'
import Resume from './pages/Resume'
import Work from './pages/Work'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="origin" element={<Origin />} />
          <Route path="origin/memphis" element={<OriginMemphis />} />
          <Route path="origin/texas" element={<OriginTexas />} />
          <Route path="origin/journey" element={<OriginJourney />} />
          <Route path="resume" element={<Resume />} />
          <Route path="work" element={<Work />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
