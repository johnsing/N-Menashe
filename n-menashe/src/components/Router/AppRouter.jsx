import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Feed, Home, Library, Audio, Videos, VideoPage, CategoryPage, BookPage, ChapterPage, Create } from '../../pages/index'
import Layout from '../Layout/Layout'


const AppRouter = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library/>} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/book/:slug" element={<BookPage />} />
        <Route path="/chapter/:bookSlug/:chapterNumber" element={<ChapterPage />} />
        <Route path="/videos" element={<Videos/>} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/audio" element={<Audio/>} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  </Router>
)

export default AppRouter