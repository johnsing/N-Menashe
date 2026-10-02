import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import {
  FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal,
  FiImage, FiVideo, FiMusic, FiSend
} from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  padding: 50px 24px;
  background: linear-gradient(135deg, #1a1a1a 0%, #161616 100%);
  border-radius: 16px;
  border: 1px solid #2a2a2a;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 60%);
    pointer-events: none;
  }

  h1 {
    font-size: 42px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    background: linear-gradient(135deg, #ffd700, #ffed4a, #f5a623);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 6px;
    position: relative;
  }

  p {
    color: #888;
    font-size: 15px;
    position: relative;
  }

  @media (max-width: 768px) {
    padding: 36px 20px;
    h1 { font-size: 30px; letter-spacing: 2px; }
  }
`

const Composer = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 24px;
  transition: border-color 0.25s ease;

  &:focus-within {
    border-color: rgba(255, 215, 0, 0.4);
  }
`

const ComposerTop = styled.div`
  display: flex;
  gap: 12px;
`

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0a0a;
  font-weight: 800;
  font-size: 16px;
  flex-shrink: 0;
`

const ComposerInput = styled.textarea`
  flex: 1;
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  font-size: 15px;
  font-family: inherit;
  resize: none;
  min-height: 52px;
  transition: all 0.25s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 215, 0, 0.4);
  }

  &::placeholder {
    color: #444;
  }
`

const ComposerActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-left: 56px;
`

const ComposerTools = styled.div`
  display: flex;
  gap: 4px;
`

const ToolButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: #666;
  font-size: 18px;
  transition: all 0.25s ease;

  &:hover {
    color: #ffd700;
    background: rgba(255, 215, 0, 0.08);
  }
`

const PostButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 700;
  border-radius: 50px;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.3);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const PostCard = styled.article`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: border-color 0.25s ease;

  &:hover {
    border-color: rgba(255, 215, 0, 0.2);
  }
`

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;

  .post-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${props => props.$color || 'linear-gradient(135deg, #ffd700, #f5a623)'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
    font-weight: 800;
    font-size: 15px;
    flex-shrink: 0;
  }

  .post-user {
    flex: 1;
    min-width: 0;

    .name {
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .time {
      color: #666;
      font-size: 12px;
    }
  }

  .more-btn {
    color: #666;
    font-size: 18px;
    padding: 6px;
    border-radius: 8px;
    transition: all 0.25s ease;

    &:hover {
      color: #ffd700;
      background: rgba(255, 215, 0, 0.08);
    }
  }
`

const VerifiedBadge = styled.span`
  color: #ffd700;
  font-size: 13px;
`

const PostContent = styled.div`
  padding: 0 20px 14px;

  .text {
    color: #ddd;
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: ${props => props.$hasMedia ? '14px' : '0'};
    white-space: pre-wrap;

    &.hebrew {
      direction: rtl;
      text-align: right;
      font-family: 'David', 'SBL Hebrew', 'Noto Serif Hebrew', serif;
      font-size: 17px;
      color: #f5e6b8;
    }
  }
`

const PostMedia = styled.div`
  margin: 0;
  border-top: 1px solid #2a2a2a;
  border-bottom: 1px solid #2a2a2a;
  background: #111;

  img, video {
    width: 100%;
    max-height: 480px;
    object-fit: cover;
    display: block;
  }
`

const MediaType = styled.div`
  position: relative;
  padding: 40px 20px;
  text-align: center;
  background: linear-gradient(135deg, #141414, #1a1a1a);

  .media-icon {
    font-size: 40px;
    color: #ffd700;
    margin-bottom: 10px;
  }

  .media-label {
    color: #888;
    font-size: 13px;
  }
`

const PostActions = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 8px;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 50px;
  color: ${props => props.$liked ? '#ffd700' : '#666'};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease;

  svg {
    font-size: 17px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: rgba(255, 215, 0, 0.08);
    color: #ffd700;

    svg { transform: scale(1.15); }
  }

  .count {
    font-size: 13px;
  }
`

const PostTypeTag = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 50px;
  color: #ffd700;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.2);
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #444;

  svg {
    font-size: 48px;
    margin-bottom: 16px;
    color: #2a2a2a;
  }

  p {
    font-size: 15px;
  }
`

// Sample data — replace with Supabase fetch later
const samplePosts = [
  {
    id: 1,
    author: 'Nishmat Menashe',
    initials: 'NM',
    color: 'linear-gradient(135deg, #ffd700, #f5a623)',
    verified: true,
    time: '2 hours ago',
    text: 'ברוכים הבאים לקהילת N-Menashe!\nWelcome to our community. Here we share art, teachings, and heritage from the community. Stay tuned for new content every week.',
    hebrew: false,
    media: null,
    type: null,
    likes: 47,
    comments: 12,
  },
  {
    id: 2,
    author: 'David Cohen',
    initials: 'DC',
    color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    verified: false,
    time: '5 hours ago',
    text: 'New video series on the weekly parasha is now live in the Videos section. Check it out!',
    hebrew: false,
    media: null,
    type: { kind: 'video', link: '/videos', label: 'Watch Video' },
    likes: 23,
    comments: 5,
  },
  {
    id: 3,
    author: 'Sarah Levi',
    initials: 'SL',
    color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    verified: false,
    time: '1 day ago',
    text: 'שיר השירים — קטע נגינה חדש\nA new musical piece inspired by the Song of Songs. Listen in the Audio section.',
    hebrew: true,
    media: { kind: 'audio' },
    type: { kind: 'audio', link: '/audio', label: 'Listen' },
    likes: 89,
    comments: 21,
  },
  {
    id: 4,
    author: 'Nishmat Menashe',
    initials: 'NM',
    color: 'linear-gradient(135deg, #ffd700, #f5a623)',
    verified: true,
    time: '3 days ago',
    text: 'Exploring the deep symbolism in traditional Jewish art. Each piece tells a story spanning generations.',
    hebrew: false,
    media: { kind: 'image', src: '/assets/feed-art.jpg', alt: 'Jewish art' },
    type: null,
    likes: 156,
    comments: 34,
  },
]

const Feed = () => {
  const [posts, setPosts] = useState(samplePosts)
  const [newPost, setNewPost] = useState('')
  const [likedPosts, setLikedPosts] = useState(new Set())

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const next = new Set(prev)
      if (next.has(postId)) {
        next.delete(postId)
      } else {
        next.add(postId)
      }
      return next
    })

    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, likes: p.likes + (likedPosts.has(postId) ? -1 : 1) }
          : p
      )
    )
  }

  const handlePost = () => {
    if (!newPost.trim()) return
    const post = {
      id: Date.now(),
      author: 'You',
      initials: 'YO',
      color: 'linear-gradient(135deg, #ffd700, #f5a623)',
      verified: false,
      time: 'Just now',
      text: newPost,
      hebrew: /[\u0590-\u05FF]/.test(newPost),
      media: null,
      type: null,
      likes: 0,
      comments: 0,
    }
    setPosts([post, ...posts])
    setNewPost('')
  }

  const isHebrewText = (text) => /[\u0590-\u05FF]/.test(text)

  return (
    <Container>
      <PageHeader>
        <h1>Feed</h1>
        <p>Community updates, teachings & inspiration</p>
      </PageHeader>

      <Composer>
        <ComposerTop>
          <Avatar>YO</Avatar>
          <ComposerInput
            placeholder="Share something with the community..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows={2}
          />
        </ComposerTop>
        <ComposerActions>
          <ComposerTools>
            <ToolButton title="Add image"><FiImage /></ToolButton>
            <ToolButton title="Add video"><FiVideo /></ToolButton>
            <ToolButton title="Add audio"><FiMusic /></ToolButton>
          </ComposerTools>
          <PostButton onClick={handlePost} disabled={!newPost.trim()}>
            <FiSend /> Post
          </PostButton>
        </ComposerActions>
      </Composer>

      {posts.length === 0 ? (
        <EmptyState>
          <FiMessageCircle />
          <p>No posts yet. Be the first to share!</p>
        </EmptyState>
      ) : (
        posts.map(post => (
          <PostCard key={post.id}>
            <PostHeader $color={post.color}>
              <div className="post-avatar">{post.initials}</div>
              <div className="post-user">
                <div className="name">
                  {post.author}
                  {post.verified && <VerifiedBadge>✓</VerifiedBadge>}
                </div>
                <div className="time">{post.time}</div>
              </div>
              <button className="more-btn" aria-label="More options">
                <FiMoreHorizontal />
              </button>
            </PostHeader>

            <PostContent $hasMedia={!!post.media}>
              <div className={`text ${isHebrewText(post.text) ? 'hebrew' : ''}`}>
                {post.text}
              </div>
              {post.media?.kind === 'image' && (
                <PostMedia>
                  <img src={post.media.src} alt={post.media.alt || ''} loading="lazy" />
                </PostMedia>
              )}
              {post.media?.kind === 'audio' && (
                <PostMedia>
                  <MediaType>
                    <FiMusic className="media-icon" />
                    <div className="media-label">Audio Track</div>
                  </MediaType>
                </PostMedia>
              )}
            </PostContent>

            {post.type && (
              <div style={{ padding: '0 20px 12px' }}>
                <PostTypeTag to={post.type.link}>
                  {post.type.kind === 'video' ? <FiVideo /> : <FiMusic />}
                  {post.type.label}
                </PostTypeTag>
              </div>
            )}

            <PostActions>
              <ActionButton
                $liked={likedPosts.has(post.id)}
                onClick={() => toggleLike(post.id)}
              >
                {likedPosts.has(post.id) ? <FaHeart /> : <FiHeart />}
                <span className="count">{post.likes}</span>
              </ActionButton>
              <ActionButton>
                <FiMessageCircle />
                <span className="count">{post.comments}</span>
              </ActionButton>
              <ActionButton>
                <FiShare2 />
              </ActionButton>
            </PostActions>
          </PostCard>
        ))
      )}
    </Container>
  )
}

export default Feed