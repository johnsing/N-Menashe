import { supabase } from '../utils/supabaseClient'

// ═══════════════════════════════════════════════════════════════
// VIDEOS
// ═══════════════════════════════════════════════════════════════
export const getVideos = async () => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const addVideo = async (video) => {
  const { data, error } = await supabase
    .from('videos')
    .insert([video])
    .select()
  if (error) throw error
  return data[0]
}

export const updateVideo = async (id, updates) => {
  const { data, error } = await supabase
    .from('videos')
    .update(updates)
    .eq('id', id)
    .select()
  if (error) throw error
  return data[0]
}

export const deleteVideo = async (id) => {
  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) throw error
}

// Auto-extract YouTube thumbnail + duration hint from URL
export const parseYouTube = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/)
  if (!match) return null
  const id = match[1]
  return {
    thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/watch?v=${id}`,
  }
}

// ═══════════════════════════════════════════════════════════════
// AUDIO
// ═══════════════════════════════════════════════════════════════
export const getAudioTracks = async () => {
  const { data, error } = await supabase
    .from('audio_tracks')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const addAudioTrack = async (track) => {
  const { data, error } = await supabase
    .from('audio_tracks')
    .insert([track])
    .select()
  if (error) throw error
  return data[0]
}

export const deleteAudioTrack = async (id) => {
  const { error } = await supabase.from('audio_tracks').delete().eq('id', id)
  if (error) throw error
}

// ═══════════════════════════════════════════════════════════════
// POSTS
// ═══════════════════════════════════════════════════════════════
export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const addPost = async (post) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
  if (error) throw error
  return data[0]
}

export const togglePostStatus = async (id, status) => {
  const { error } = await supabase
    .from('posts')
    .update({ status })
    .eq('id', id)
  if (error) throw error
}

export const deletePost = async (id) => {
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw error
}

// ═══════════════════════════════════════════════════════════════
// BIBLE — categories, books, chapters, verses
// ═══════════════════════════════════════════════════════════════
export const getBibleCategories = async () => {
  const { data, error } = await supabase
    .from('bible_categories')
    .select('*, bible_books(*)')
    .order('sort_order')
  if (error) throw error
  return data
}

export const addBook = async (book) => {
  const { data, error } = await supabase
    .from('bible_books')
    .insert([book])
    .select()
  if (error) throw error
  return data[0]
}

export const addChapter = async (bookId, number) => {
  const { data, error } = await supabase
    .from('bible_chapters')
    .insert([{ book_id: bookId, number }])
    .select()
  if (error) throw error
  return data[0]
}

export const addVerse = async (verse) => {
  // verse = { book_id, chapter_id, number, hebrew, english }
  const { data, error } = await supabase
    .from('bible_verses')
    .upsert([verse], { onConflict: 'chapter_id,number' })
    .select()
  if (error) throw error
  return data[0]
}

// Find a chapter id by book + number (needed before inserting a verse)
export const findChapter = async (bookId, number) => {
  const { data, error } = await supabase
    .from('bible_chapters')
    .select('id')
    .eq('book_id', bookId)
    .eq('number', number)
    .maybeSingle()
  if (error) throw error
  return data?.id || null
}

// ═══════════════════════════════════════════════════════════════
// USERS
// ═══════════════════════════════════════════════════════════════
export const getUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const toggleUserRole = async (id, role) => {
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', id)
  if (error) throw error
}

export const toggleUserActive = async (id, isActive) => {
  const { error } = await supabase
    .from('profiles')
    .update({ is_active: isActive })
    .eq('id', id)
  if (error) throw error
}

export const deleteUser = async (id) => {
  // Deletes from profiles; auth user must be removed from Supabase Dashboard
  const { error } = await supabase.from('profiles').delete().eq('id', id)
  if (error) throw error
}

// ═══════════════════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════════════════
export const getSettings = async () => {
  const { data, error } = await supabase.from('site_settings').select('*')
  if (error) throw error
  // Convert rows array → object
  return Object.fromEntries(data.map(row => [row.key, row.value]))
}

export const saveSettings = async (settingsObj) => {
  const rows = Object.entries(settingsObj).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }))
  const { error } = await supabase
    .from('site_settings')
    .upsert(rows, { onConflict: 'key' })
  if (error) throw error
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD STATS
// ═══════════════════════════════════════════════════════════════
export const getDashboardStats = async () => {
  const [videos, posts, users, audio] = await Promise.all([
    supabase.from('videos').select('id, views', { count: 'exact' }),
    supabase.from('posts').select('id', { count: 'exact' }),
    supabase.from('profiles').select('id', { count: 'exact' }),
    supabase.from('audio_tracks').select('id, plays'),
  ])

  const totalViews =
    (videos.data || []).reduce((s, v) => s + (v.views || 0), 0) +
    (audio.data || []).reduce((s, a) => s + (a.plays || 0), 0)

  return {
    totalViews,
    videos: videos.count || 0,
    posts: posts.count || 0,
    users: users.count || 0,
  }
}