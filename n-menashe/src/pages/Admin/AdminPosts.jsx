import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiFileText,
  FiHeart, FiMessageCircle, FiEye, FiSend
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

  h2 { color: #fff; font-size: 22px; font-weight: 800; }
  .sub { color: #666; font-size: 13px; margin-top: 3px; }
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
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;

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
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover { color: #ffd700; border-color: rgba(255, 215, 0, 0.3); }
`

// ── Post cards ───────────────────────────────────────────────────
const PostCard = styled.div`
  background: linear-gradient(135deg, #131313 0%, #101010 100%);
  border: 1px solid #1e1e1e;
  border-radius: 18px;
  padding: 18px 20px;
  display: flex;
  gap: 16px;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(255, 215, 0, 0.25);

    .p-actions { opacity: 1; }
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const PostAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${p => p.$color || 'linear-gradient(135deg, #ffd700, #f5a623)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0a0a;
  font-weight: 800;
  font-size: 15px;
  flex-shrink: 0;
`

const PostBody = styled.div`
  flex: 1;
  min-width: 0;
`

const PostTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;

  .p-author {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }

  .p-time {
    color: #444;
    font-size: 12px;
  }

  .p-status {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 50px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: ${p => p.$status === 'published' ? 'rgba(81, 207, 102, 0.1)' : 'rgba(255, 215, 0, 0.1)'};
    color: ${p => p.$status === 'published' ? '#51cf66' : '#ffd700'};
    border: 1px solid ${p => p.$status === 'published' ? 'rgba(81, 207, 102, 0.25)' : 'rgba(255, 215, 0, 0.25)'};
  }
`

const PostText = styled.p`
  color: #999;
  font-size: 13px;
  line-height: 1.7;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &.hebrew {
    direction: rtl;
    text-align: right;
    font-family: 'David', 'SBL Hebrew', 'Noto Serif Hebrew', serif;
    color: #c9b98a;
  }
`

const PostStats = styled.div`
  display: flex;
  gap: 16px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #444;
    font-size: 12px;

    svg { font-size: 13px; }
  }
`

const PostSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;

  @media (max-width: 640px) {
    flex-direction: row;
  }
`

const SideBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #161616;
  border: 1px solid #242424;
  color: #666;
  font-size: 15px;
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
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #3a3a3a;

  svg { font-size: 40px; margin-bottom: 12px; }
  p { font-size: 14px; }
`

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const initialPosts = [
  {
    id: 1,
    author: 'Nishmat Menashe',
    initials: 'NM',
    color: 'linear-gradient(135deg, #ffd700, #f5a623)',
    time: '2 hours ago',
    text: 'ברוכים הבאים לקהילת N-Menashe! Welcome to our community. Here we share art, teachings, and heritage from the community.',
    status: 'published',
    likes: 47,
    comments: 12,
    views: 320,
  },
  {
    id: 2,
    author: 'David Cohen',
    initials: 'DC',
    color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    time: '5 hours ago',
    text: 'New video series on the weekly parasha is now live in the Videos section. Check it out!',
    status: 'published',
    likes: 23,
    comments: 5,
    views: 180,
  },
  {
    id: 3,
    author: 'Sarah Levi',
    initials: 'SL',
    color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    time: '1 day ago',
    text: 'שיר השירים — קטע נגינה חדש. A new musical piece inspired by the Song of Songs. Listen in the Audio section.',
    status: 'draft',
    likes: 0,
    comments: 0,
    views: 0,
  },
  {
    id: 4,
    author: 'Nishmat Menashe',
    initials: 'NM',
    color: 'linear-gradient(135deg, #ffd700, #f5a623)',
    time: '3 days ago',
    text: 'Exploring the deep symbolism in traditional Jewish art. Each piece tells a story spanning generations.',
    status: 'published',
    likes: 156,
    comments: 34,
    views: 1200,
  },
]

const AdminPosts = () => {
  const [posts, setPosts] = useState(initialPosts)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = posts.filter(p => {
    const matchSearch =
      p.text.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  const counts = {
    all: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft: posts.filter(p => p.status === 'draft').length,
  }

  const isHebrew = (text) => /[\u0590-\u05FF]/.test(text)

  return (
    <PageWrapper>
      <PageHead>
        <div>
          <h2>Post Management</h2>
          <div className="sub">Moderate feed posts and announcements</div>
        </div>
        <PrimaryBtn><FiPlus /> New Post</PrimaryBtn>
      </PageHead>

      <FilterRow>
        <SearchBox>
          <FiSearch />
          <input
            type="text"
            placeholder="Search posts or authors..."
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

      {filtered.length === 0 ? (
        <EmptyState>
          <FiFileText />
          <p>No posts found.</p>
        </EmptyState>
      ) : (
        <PostList>
          {filtered.map(post => (
            <PostCard key={post.id}>
              <PostAvatar $color={post.color}>{post.initials}</PostAvatar>
              <PostBody>
                <PostTop $status={post.status}>
                  <span className="p-author">{post.author}</span>
                  <span className="p-time">{post.time}</span>
                  <span className="p-status">
                    {post.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </PostTop>
                <PostText className={isHebrew(post.text) ? 'hebrew' : ''}>
                  {post.text}
                </PostText>
                <PostStats>
                  <span><FiHeart /> {post.likes}</span>
                  <span><FiMessageCircle /> {post.comments}</span>
                  <span><FiEye /> {post.views}</span>
                </PostStats>
              </PostBody>
              <PostSide className="p-actions">
                <SideBtn title="Edit"><FiEdit2 /></SideBtn>
                <SideBtn title="Publish" style={{ color: '#51cf66' }}>
                  <FiSend />
                </SideBtn>
                <SideBtn
                  className="danger"
                  title="Delete"
                  onClick={() => setPosts(posts.filter(p => p.id !== post.id))}
                >
                  <FiTrash2 />
                </SideBtn>
              </PostSide>
            </PostCard>
          ))}
        </PostList>
      )}
    </PageWrapper>
  )
}

export default AdminPosts