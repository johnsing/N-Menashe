import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2,
  FiX, FiVideo, FiCheck, FiUpload
} from 'react-icons/fi'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.4s ease-out;
`

const PageHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  h2 {
    color: #fff;
    font-size: 22px;
    font-weight: 800;
  }

  .sub {
    color: #666;
    font-size: 13px;
    margin-top: 3px;
  }
`

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  color: #0a0a0a;
  font-size: 13px;
  font-weight: 700;
  border-radius: 12px;
  transition: all 0.25s ease;
  border: none;
  cursor: pointer;

  svg { font-size: 15px; }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(255, 215, 0, 0.3);
  }
`

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
  max-width: 340px;

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #444;
    font-size: 15px;
    pointer-events: none;
  }

  input {
    width: 100%;
    padding: 11px 14px 11px 40px;
    background: #141414;
    border: 1px solid #242424;
    border-radius: 12px;
    color: #fff;
    font-size: 13px;
    transition: all 0.25s ease;

    &:focus {
      outline: none;
      border-color: rgba(255, 215, 0, 0.4);
    }

    &::placeholder { color: #3a3a3a; }
  }
`

const FilterChips = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

const FChip = styled.button`
  padding: 8px 16px;
  background: ${p => p.$active ? 'rgba(255, 215, 0, 0.12)' : '#141414'};
  border: 1px solid ${p => p.$active ? 'rgba(255, 215, 0, 0.4)' : '#242424'};
  border-radius: 50px;
  color: ${p => p.$active ? '#ffd700' : '#777'};
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #ffd700;
    border-color: rgba(255, 215, 0, 0.3);
  }
`

const Panel = styled.div`
  background: linear-gradient(135deg, #131313 0%, #101010 100%);
  border: 1px solid #1e1e1e;
  border-radius: 18px;
  padding: 20px;
`

const TableWrap = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 680px;

  th {
    text-align: left;
    color: #444;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 10px 14px;
    border-bottom: 1px solid #1e1e1e;
    white-space: nowrap;
  }

  td {
    padding: 13px 14px;
    border-bottom: 1px solid #161616;
    vertical-align: middle;
  }

  tbody tr {
    transition: background 0.2s ease;

    &:hover { background: rgba(255, 255, 255, 0.015); }
    &:last-child td { border-bottom: none; }
  }
`

const VideoCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 240px;

  .v-thumb {
    width: 86px;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    background: #1a1a1a;
    border: 1px solid #242424;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;

    img { width: 100%; height: 100%; object-fit: cover; }

    .v-dur {
      position: absolute;
      bottom: 4px;
      right: 4px;
      background: rgba(0,0,0,0.85);
      color: #fff;
      padding: 1px 5px;
      border-radius: 4px;
      font-size: 9px;
      font-weight: 700;
    }
  }

  .v-info { min-width: 0; }

  .v-title {
    color: #ddd;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.35;
    margin-bottom: 3px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .v-url {
    color: #3f3f3f;
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 220px;
  }
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 700;
  background: ${p => p.$status === 'published' ? 'rgba(81, 207, 102, 0.1)' : 'rgba(255, 215, 0, 0.1)'};
  color: ${p => p.$status === 'published' ? '#51cf66' : '#ffd700'};
  border: 1px solid ${p => p.$status === 'published' ? 'rgba(81, 207, 102, 0.25)' : 'rgba(255, 215, 0, 0.25)'};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`

const CatTag = styled.span`
  display: inline-flex;
  padding: 4px 12px;
  background: #161616;
  border: 1px solid #242424;
  border-radius: 50px;
  color: #888;
  font-size: 11px;
  font-weight: 600;
`

const RowActions = styled.div`
  display: flex;
  gap: 6px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 9px;
    background: #161616;
    border: 1px solid #242424;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: #ffd700;
      border-color: rgba(255, 215, 0, 0.35);
    }

    &.danger:hover {
      color: #ff6b6b;
      border-color: rgba(255, 107, 107, 0.35);
    }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #3a3a3a;

  svg { font-size: 40px; margin-bottom: 12px; }
  p { font-size: 14px; }
`

// ── Modal ────────────────────────────────────────────────────────
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.25s ease;
`

const Modal = styled.div`
  background: #141414;
  border: 1px solid #262626;
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
`

const ModalHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #1e1e1e;

  h3 {
    color: #fff;
    font-size: 17px;
    font-weight: 800;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: #1a1a1a;
    border: 1px solid #262626;
    color: #777;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover { color: #ffd700; }
  }
`

const ModalBody = styled.div`
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Field = styled.div`
  label {
    display: block;
    color: #666;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  input, select, textarea {
    width: 100%;
    padding: 12px 14px;
    background: #0f0f0f;
    border: 1px solid #262626;
    border-radius: 12px;
    color: #fff;
    font-size: 14px;
    transition: all 0.25s ease;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: rgba(255, 215, 0, 0.5);
      box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.07);
    }

    &::placeholder { color: #3a3a3a; }
  }

  textarea { min-height: 90px; resize: vertical; }
`

const DropZone = styled.div`
  border: 2px dashed #2a2a2a;
  border-radius: 14px;
  padding: 28px;
  text-align: center;
  color: #555;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.25s ease;

  svg {
    font-size: 28px;
    color: #ffd700;
    margin-bottom: 8px;
  }

  &:hover {
    border-color: rgba(255, 215, 0, 0.4);
    background: rgba(255, 215, 0, 0.03);
  }
`

const ModalFoot = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 18px 24px;
  border-top: 1px solid #1e1e1e;
`

const CancelBtn = styled.button`
  padding: 11px 20px;
  background: transparent;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  color: #888;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover { color: #fff; border-color: #3a3a3a; }
`

const SaveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 11px 24px;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  border: none;
  border-radius: 12px;
  color: #0a0a0a;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(255, 215, 0, 0.3);
  }
`

const formatViews = (n) => {
  if (!n) return '0'
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(n)
}

const initialVideos = [
  { id: 'v1', title: 'Introduction to Torah Study', category: 'Torah', views: 15420, status: 'published', src: 'youtube.com/watch?v=dQw4w9WgXcQ', duration: '12:34', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' },
  { id: 'v2', title: 'The Prophets Explained', category: "Nevi'im", views: 8930, status: 'published', src: 'youtube.com/watch?v=9bZkp7q19f0', duration: '18:22', thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg' },
  { id: 'v3', title: 'Psalms of David', category: 'Ketuvim', views: 32100, status: 'published', src: 'youtube.com/watch?v=kJQP7kiw5Fk', duration: '25:10', thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg' },
  { id: 'v4', title: 'Hebrew Reading Practice', category: 'Education', views: 22150, status: 'draft', src: 'youtube.com/watch?v=JGwWNGJdvx8', duration: '15:45', thumbnail: 'https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg' },
  { id: 'v5', title: 'Jewish Art History', category: 'Art', views: 12400, status: 'published', src: 'youtube.com/watch?v=RgKAFK5djSk', duration: '22:18', thumbnail: 'https://img.youtube.com/vi/RgKAFK5djSk/maxresdefault.jpg' },
  { id: 'v6', title: 'Understanding Prayer', category: 'Prayer', views: 18700, status: 'draft', src: 'youtube.com/watch?v=OPf0YbXqDm0', duration: '19:55', thumbnail: 'https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg' },
]

const AdminVideos = () => {
  const [videos, setVideos] = useState(initialVideos)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'Torah', src: '', status: 'draft' })

  const categories = [...new Set(videos.map(v => v.category))]

  const filtered = videos.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || v.status === filter
    return matchSearch && matchFilter
  })

  const handleDelete = (id) => {
    setVideos(videos.filter(v => v.id !== id))
  }

  const toggleStatus = (id) => {
    setVideos(videos.map(v =>
      v.id === id
        ? { ...v, status: v.status === 'published' ? 'draft' : 'published' }
        : v
    ))
  }

  const handleSave = () => {
    if (!form.title.trim() || !form.src.trim()) return
    const newVideo = {
      id: `v${Date.now()}`,
      title: form.title,
      category: form.category,
      src: form.src,
      status: form.status,
      views: 0,
      duration: '0:00',
      thumbnail: '',
    }
    setVideos([newVideo, ...videos])
    setForm({ title: '', category: 'Torah', src: '', status: 'draft' })
    setShowModal(false)
  }

  const counts = {
    all: videos.length,
    published: videos.filter(v => v.status === 'published').length,
    draft: videos.filter(v => v.status === 'draft').length,
  }

  return (
    <PageWrapper>
      <PageHead>
        <div>
          <h2>Video Management</h2>
          <div className="sub">Add, edit, and organize your video content</div>
        </div>
        <PrimaryBtn onClick={() => setShowModal(true)}>
          <FiPlus /> Add Video
        </PrimaryBtn>
      </PageHead>

      <FilterRow>
        <SearchBox>
          <FiSearch />
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBox>
        <FilterChips>
          <FChip $active={filter === 'all'} onClick={() => setFilter('all')}>
            All ({counts.all})
          </FChip>
          <FChip $active={filter === 'published'} onClick={() => setFilter('published')}>
            Published ({counts.published})
          </FChip>
          <FChip $active={filter === 'draft'} onClick={() => setFilter('draft')}>
            Drafts ({counts.draft})
          </FChip>
        </FilterChips>
      </FilterRow>

      <Panel>
        {filtered.length === 0 ? (
          <EmptyState>
            <FiVideo />
            <p>No videos found. Add your first video!</p>
          </EmptyState>
        ) : (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>Video</th>
                  <th>Category</th>
                  <th>Views</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => (
                  <tr key={v.id}>
                    <td>
                      <VideoCell>
                        <div className="v-thumb">
                          {v.thumbnail && <img src={v.thumbnail} alt={v.title} loading="lazy" />}
                          <span className="v-dur">{v.duration}</span>
                        </div>
                        <div className="v-info">
                          <div className="v-title">{v.title}</div>
                          <div className="v-url">{v.src}</div>
                        </div>
                      </VideoCell>
                    </td>
                    <td><CatTag>{v.category}</CatTag></td>
                    <td>
                      <span style={{ color: '#ffd700', fontSize: 13, fontWeight: 700 }}>
                        {formatViews(v.views)}
                      </span>
                    </td>
                    <td>
                      <StatusBadge
                        $status={v.status}
                        onClick={() => toggleStatus(v.id)}
                        style={{ cursor: 'pointer' }}
                        title="Click to toggle status"
                      >
                        {v.status === 'published' ? 'Published' : 'Draft'}
                      </StatusBadge>
                    </td>
                    <td>
                      <RowActions>
                        <button title="Edit"><FiEdit2 /></button>
                        <button
                          className="danger"
                          title="Delete"
                          onClick={() => handleDelete(v.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </RowActions>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        )}
      </Panel>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHead>
              <h3>Add New Video</h3>
              <button onClick={() => setShowModal(false)}><FiX /></button>
            </ModalHead>
            <ModalBody>
              <Field>
                <label>Video Title</label>
                <input
                  type="text"
                  placeholder="e.g. Introduction to Torah Study"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Field>
              <Field>
                <label>YouTube URL</label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={form.src}
                  onChange={(e) => setForm({ ...form, src: e.target.value })}
                />
              </Field>
              <Field>
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  <option value="New">+ New Category</option>
                </select>
              </Field>
              <Field>
                <label>Description (optional)</label>
                <textarea placeholder="Short description of the video..." />
              </Field>
              <Field>
                <label>Thumbnail</label>
                <DropZone>
                  <FiUpload />
                  <div>Auto-fetch from YouTube, or click to upload</div>
                </DropZone>
              </Field>
            </ModalBody>
            <ModalFoot>
              <CancelBtn onClick={() => setShowModal(false)}>Cancel</CancelBtn>
              <SaveBtn onClick={handleSave}>
                <FiCheck /> Save Video
              </SaveBtn>
            </ModalFoot>
          </Modal>
        </ModalOverlay>
      )}
    </PageWrapper>
  )
}

export default AdminVideos