import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Feed, Home, Library, Audio,CategoryPage, BookPage, ChapterPage, Create } from '../../pages/index'
import { AdminLayout, Dashboard, AdminVideos, AdminAudio, AdminPosts, AdminLibrary, LibraryUpload, AdminUsers, AdminSettings } from '../../pages/Admin/index'
import Layout from '../Layout/Layout'


const AppRouter = () => (
  <Router>
    <Routes>
      {/* Admin routes — own layout, no site header/footer */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="videos" element={<AdminVideos />} />
        <Route path="audio" element={<AdminAudio />} />
        <Route path="posts" element={<AdminPosts />} />
        <Route path="library" element={<AdminLibrary />} />
         <Route path="library/upload" element={<LibraryUpload />} />

        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Site routes */}
      <Route path="*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library/>} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/book/:slug" element={<BookPage />} />
            <Route path="/chapter/:bookSlug/:chapterNumber" element={<ChapterPage />} />
            <Route path="/audio" element={<Audio/>} />
            <Route path="/feed" element={<Feed/>} />
            <Route path="/create" element={<Create />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  </Router>
)

export default AppRouter