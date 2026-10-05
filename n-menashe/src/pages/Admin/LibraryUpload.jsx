import { useState, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import {
  FiArrowLeft, FiBook, FiBookOpen, FiAlignLeft,
  FiCheck, FiPlus, FiGlobe, FiLayers
} from 'react-icons/fi'
import { getAllCategories } from '../../utils/bible'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.4s ease-out;
  max-width: 760px;
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

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #888;
  font-size: 13px;
  padding: 9px 18px;
  border-radius: 12px;
  background: #141414;
  border: 1px solid #242424;
  transition: all 0.25s ease;

  svg { font-size: 14px; }

  &:hover {
    color: #ffd700;
    border-color: rgba(255, 215, 0, 0.35);
  }
`

// ── Tabs ─────────────────────────────────────────────────────────
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 16px;
  padding: 6px;
`

const Tab = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  color: #666;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
  background: transparent;

  svg { font-size: 16px; }

  &.active {
    background: linear-gradient(135deg, #ffd700, #f5a623);
    color: #0a0a0a;
    box-shadow: 0 4px 16px rgba(255, 215, 0, 0.25);
  }

  &:hover:not(.active) {
    color: #ffd700;
    background: rgba(255, 215, 0, 0.05);
  }

  @media (max-width: 480px) {
    font-size: 11px;
    padding: 10px 6px;
    gap: 5px;
  }
`

// ── Form panel ───────────────────────────────────────────────────
const Panel = styled.div`
  background: linear-gradient(135deg, #131313 0%, #101010 100%);
  border: 1px solid #1e1e1e;
  border-radius: 18px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 640px) {
    padding: 18px;
  }
`

const Field = styled.div`
  label {
    display: flex;
    align-items: center;
    gap: 7px;
    color: #666;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;

    .lang-tag {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.5px;

      &.he { background: rgba(255, 215, 0, 0.15); color: #ffd700; }
      &.en { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
    }
  }

  input, select, textarea {
    width: 100%;
    padding: 13px 15px;
    background: #0c0c0c;
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

    &::placeholder { color: #333; }

    &.error {
      border-color: rgba(255, 107, 107, 0.5);
    }
  }

  textarea {
    min-height: 110px;
    resize: vertical;
    line-height: 1.9;
  }

  .hebrew-input {
    direction: rtl;
    text-align: right;
    font-family: 'David', 'SBL Hebrew', 'Noto Serif Hebrew', serif;
    font-size: 18px;
    line-height: 2.1;
  }

  .field-error {
    color: #ff8080;
    font-size: 11px;
    margin-top: 5px;
  }

  .char-count {
    text-align: right;
    color: #333;
    font-size: 10px;
    margin-top: 4px;
  }
`

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

// ── Live preview ─────────────────────────────────────────────────
const PreviewSection = styled.div`
  .pv-label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;

    svg { color: #ffd700; }
  }
`

const ReaderPreview = styled.div`
  background: #0c0c0c;
  border: 1px solid #262626;
  border-radius: 14px;
  padding: 22px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #ffd700, #f5a623);
  }

  .pv-header {
    text-align: center;
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid #1a1a1a;

    .pv-book {
      color: #555;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 3px;
    }

    .pv-chapter {
      font-size: 28px;
      font-weight: 900;
      background: linear-gradient(135deg, #ffd700, #f5a623);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
`

const PreviewVerse = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;

  .pv-num {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.25);
    color: #ffd700;
    font-size: 13px;
    font-weight: 800;
    flex-shrink: 0;
  }

  .pv-verses {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .pv-he {
      direction: rtl;
      text-align: right;
      font-family: 'David', 'SBL Hebrew', 'Noto Serif Hebrew', serif;
      font-size: 19px;
      line-height: 2.1;
      color: #f5e6b8;
    }

    .pv-en {
      color: #999;
      font-size: 14px;
      line-height: 1.8;
      border-top: 1px solid #1a1a1a;
      padding-top: 12px;
    }

    .pv-empty {
      color: #333;
      font-size: 13px;
      font-style: italic;
    }
  }
`

// ── Buttons ──────────────────────────────────────────────────────
const SubmitBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  border: none;
  border-radius: 14px;
  color: #0a0a0a;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;

  svg { font-size: 17px; }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(255, 215, 0, 0.35);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const SuccessBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(81, 207, 102, 0.08);
  border: 1px solid rgba(81, 207, 102, 0.3);
  border-radius: 14px;
  color: #51cf66;
  font-size: 14px;
  font-weight: 600;
  animation: ${fadeIn} 0.4s ease;

  svg { font-size: 20px; flex-shrink: 0; }
`

const InfoNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(255, 215, 0, 0.04);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: 12px;
  color: #888;
  font-size: 12px;
  line-height: 1.6;

  svg { color: #ffd700; font-size: 16px; flex-shrink: 0; margin-top: 1px; }
`

const slugify = (text) =>
  text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const LibraryUpload = () => {
  const categories = getAllCategories()
  const [tab, setTab] = useState('verse')
  const [success, setSuccess] = useState(null)

  // Book form state
  const [bookForm, setBookForm] = useState({
    category: '',
    nameHe: '',
    nameEn: '',
    chapters: '',
    verses: '',
  })
  const [bookErrors, setBookErrors] = useState({})

  // Chapter form state
  const [chapterForm, setChapterForm] = useState({
    book: '',
    number: '',
  })
  const [chapterErrors, setChapterErrors] = useState({})

  // Verse form state
  const [verseForm, setVerseForm] = useState({
    book: '',
    chapter: '',
    number: '',
    hebrew: '',
    english: '',
  })
  const [verseErrors, setVerseErrors] = useState({})

  const books = useMemo(
    () => categories.flatMap(c => c.books),
    [categories]
  )

  const selectedVerseBook = books.find(b => b.name === verseForm.book || b.slug === verseForm.book)
  const selectedChapterBook = books.find(b => b.name === chapterForm.book || b.slug === chapterForm.book)

  const autoSlug = bookForm.nameEn ? slugify(bookForm.nameEn) : ''

  const clearMessages = () => setSuccess(null)

  // ── Book submit ──────────────────────────────────────────────
  const submitBook = () => {
    const errors = {}
    if (!bookForm.category) errors.category = 'Select a section'
    if (!bookForm.nameHe.trim()) errors.nameHe = 'Hebrew name is required'
    if (!bookForm.nameEn.trim()) errors.nameEn = 'English name is required'
    if (!bookForm.chapters || parseInt(bookForm.chapters) < 1) errors.chapters = 'Enter chapter count'

    setBookErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSuccess(`Book "${bookForm.nameEn}" added to ${bookForm.category} — slug: ${autoSlug}`)
    setBookForm({ category: '', nameHe: '', nameEn: '', chapters: '', verses: '' })
    setTimeout(() => setSuccess(null), 4000)
  }

  // ── Chapter submit ───────────────────────────────────────────
  const submitChapter = () => {
    const errors = {}
    if (!chapterForm.book) errors.book = 'Select a book'
    if (!chapterForm.number || parseInt(chapterForm.number) < 1) errors.number = 'Enter chapter number'

    setChapterErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSuccess(`Chapter ${chapterForm.number} added to "${chapterForm.book}"`)
    setChapterForm({ book: '', number: '' })
    setTimeout(() => setSuccess(null), 4000)
  }

  // ── Verse submit ─────────────────────────────────────────────
  const submitVerse = () => {
    const errors = {}
    if (!verseForm.book) errors.book = 'Select a book'
    if (!verseForm.chapter) errors.chapter = 'Select a chapter'
    if (!verseForm.number || parseInt(verseForm.number) < 1) errors.number = 'Enter verse number'
    if (!verseForm.hebrew.trim()) errors.hebrew = 'Hebrew text is required'
    if (!verseForm.english.trim()) errors.english = 'English text is required'

    setVerseErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSuccess(`Verse ${verseForm.chapter}:${verseForm.number} added to "${verseForm.book}"`)
    setVerseForm({ ...verseForm, number: '', hebrew: '', english: '' })
    setTimeout(() => setSuccess(null), 4000)
  }

  return (
    <PageWrapper>
      <PageHead>
        <div>
          <h2>Upload Content</h2>
          <div className="sub">Add books, chapters, and bilingual verses to the library</div>
        </div>
        <BackLink to="/admin/library">
          <FiArrowLeft /> Back to Library
        </BackLink>
      </PageHead>

      <Tabs>
        <button
          className={tab === 'book' ? 'active' : ''}
          onClick={() => { setTab('book'); clearMessages() }}
        >
          <FiBook /> Book
        </button>
        <button
          className={tab === 'chapter' ? 'active' : ''}
          onClick={() => { setTab('chapter'); clearMessages() }}
        >
          <FiBookOpen /> Chapter
        </button>
        <button
          className={tab === 'verse' ? 'active' : ''}
          onClick={() => { setTab('verse'); clearMessages() }}
        >
          <FiAlignLeft /> Verse
        </button>
      </Tabs>

      {success && (
        <SuccessBanner>
          <FiCheck /> {success}
        </SuccessBanner>
      )}

      {/* ── BOOK FORM ─────────────────────────────────────────── */}
      {tab === 'book' && (
        <Panel>
          <InfoNote>
            <FiLayers />
            A book belongs to a section (e.g. Torah, Prophets, Writings). The slug is auto-generated
            from the English name and used in URLs.
          </InfoNote>

          <Field>
            <label>Section / Category</label>
            <select
              className={bookErrors.category ? 'error' : ''}
              value={bookForm.category}
              onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })}
            >
              <option value="">— Select a section —</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            {bookErrors.category && <div className="field-error">{bookErrors.category}</div>}
          </Field>

          <TwoCol>
            <Field>
              <label>Book Name <span className="lang-tag he">עברית</span></label>
              <input
                type="text"
                className={`hebrew-input ${bookErrors.nameHe ? 'error' : ''}`}
                placeholder="שם הספר"
                value={bookForm.nameHe}
                onChange={(e) => setBookForm({ ...bookForm, nameHe: e.target.value })}
              />
              {bookErrors.nameHe && <div className="field-error">{bookErrors.nameHe}</div>}
            </Field>
            <Field>
              <label>English Name <span className="lang-tag en">EN</span></label>
              <input
                type="text"
                className={bookErrors.nameEn ? 'error' : ''}
                placeholder="e.g. Genesis"
                value={bookForm.nameEn}
                onChange={(e) => setBookForm({ ...bookForm, nameEn: e.target.value })}
              />
              {bookErrors.nameEn && <div className="field-error">{bookErrors.nameEn}</div>}
              {autoSlug && (
                <div className="char-count">URL slug: /book/{autoSlug}</div>
              )}
            </Field>
          </TwoCol>

          <TwoCol>
            <Field>
              <label>Number of Chapters</label>
              <input
                type="number"
                min="1"
                className={bookErrors.chapters ? 'error' : ''}
                placeholder="e.g. 50"
                value={bookForm.chapters}
                onChange={(e) => setBookForm({ ...bookForm, chapters: e.target.value })}
              />
              {bookErrors.chapters && <div className="field-error">{bookErrors.chapters}</div>}
            </Field>
            <Field>
              <label>Total Verses (optional)</label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 1533"
                value={bookForm.verses}
                onChange={(e) => setBookForm({ ...bookForm, verses: e.target.value })}
              />
            </Field>
          </TwoCol>

          <SubmitBtn onClick={submitBook}>
            <FiPlus /> Add Book
          </SubmitBtn>
        </Panel>
      )}

      {/* ── CHAPTER FORM ──────────────────────────────────────── */}
      {tab === 'chapter' && (
        <Panel>
          <InfoNote>
            <FiBookOpen />
            Chapters are added to an existing book. The chapter number must be unique within the book
            and less than or equal to the book's chapter count.
          </InfoNote>

          <Field>
            <label>Book</label>
            <select
              className={chapterErrors.book ? 'error' : ''}
              value={chapterForm.book}
              onChange={(e) => setChapterForm({ ...chapterForm, book: e.target.value, number: '' })}
            >
              <option value="">— Select a book —</option>
              {books.map(b => (
                <option key={b.id} value={b.name}>{b.name} ({b.englishName})</option>
              ))}
            </select>
            {chapterErrors.book && <div className="field-error">{chapterErrors.book}</div>}
          </Field>

          <Field>
            <label>Chapter Number</label>
            <input
              type="number"
              min="1"
              max={selectedChapterBook?.chapters || 999}
              className={chapterErrors.number ? 'error' : ''}
              placeholder={selectedChapterBook ? `1 – ${selectedChapterBook.chapters}` : 'e.g. 1'}
              value={chapterForm.number}
              onChange={(e) => setChapterForm({ ...chapterForm, number: e.target.value })}
            />
            {chapterErrors.number && <div className="field-error">{chapterErrors.number}</div>}
            {selectedChapterBook && (
              <div className="char-count">
                This book has {selectedChapterBook.chapters} chapters
              </div>
            )}
          </Field>

          <SubmitBtn onClick={submitChapter}>
            <FiPlus /> Add Chapter
          </SubmitBtn>
        </Panel>
      )}

      {/* ── VERSE FORM ────────────────────────────────────────── */}
      {tab === 'verse' && (
        <Panel>
          <TwoCol>
            <Field>
              <label>Book</label>
              <select
                className={verseErrors.book ? 'error' : ''}
                value={verseForm.book}
                onChange={(e) => setVerseForm({ ...verseForm, book: e.target.value, chapter: '' })}
              >
                <option value="">— Select a book —</option>
                {books.map(b => (
                  <option key={b.id} value={b.name}>{b.name} ({b.englishName})</option>
                ))}
              </select>
              {verseErrors.book && <div className="field-error">{verseErrors.book}</div>}
            </Field>
            <Field>
              <label>Chapter</label>
              <select
                className={verseErrors.chapter ? 'error' : ''}
                value={verseForm.chapter}
                onChange={(e) => setVerseForm({ ...verseForm, chapter: e.target.value })}
                disabled={!selectedVerseBook}
              >
                <option value="">
                  {selectedVerseBook ? '— Select chapter —' : 'Select a book first'}
                </option>
                {selectedVerseBook &&
                  Array.from({ length: selectedVerseBook.chapters }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>Chapter {n}</option>
                  ))
                }
              </select>
              {verseErrors.chapter && <div className="field-error">{verseErrors.chapter}</div>}
            </Field>
          </TwoCol>

          <Field>
            <label>Verse Number</label>
            <input
              type="number"
              min="1"
              className={verseErrors.number ? 'error' : ''}
              placeholder="e.g. 1"
              value={verseForm.number}
              onChange={(e) => setVerseForm({ ...verseForm, number: e.target.value })}
            />
            {verseErrors.number && <div className="field-error">{verseErrors.number}</div>}
          </Field>

          <Field>
            <label>Hebrew Text <span className="lang-tag he">עברית</span></label>
            <textarea
              className={`hebrew-input ${verseErrors.hebrew ? 'error' : ''}`}
              placeholder="בראשית ברא אלהים את השמים ואת הארץ"
              value={verseForm.hebrew}
              onChange={(e) => setVerseForm({ ...verseForm, hebrew: e.target.value })}
            />
            {verseErrors.hebrew && <div className="field-error">{verseErrors.hebrew}</div>}
            <div className="char-count">
              {verseForm.hebrew.length} characters · RTL
            </div>
          </Field>

          <Field>
            <label>English Text <span className="lang-tag en">EN</span></label>
            <textarea
              className={verseErrors.english ? 'error' : ''}
              placeholder="In the beginning, God created the heavens and the earth."
              value={verseForm.english}
              onChange={(e) => setVerseForm({ ...verseForm, english: e.target.value })}
            />
            {verseErrors.english && <div className="field-error">{verseErrors.english}</div>}
            <div className="char-count">
              {verseForm.english.length} characters
            </div>
          </Field>

          {/* Live reader preview */}
          <PreviewSection>
            <div className="pv-label">
              <FiGlobe /> Live Preview — how it appears in the reader
            </div>
            <ReaderPreview>
              <div className="pv-header">
                <div className="pv-book">
                  {verseForm.book || 'Book Name'} {verseForm.chapter && `· Chapter ${verseForm.chapter}`}
                </div>
                <div className="pv-chapter">{verseForm.chapter || '—'}</div>
              </div>
              <PreviewVerse>
                <span className="pv-num">{verseForm.number || '?'}</span>
                <div className="pv-verses">
                  {verseForm.hebrew ? (
                    <div className="pv-he">{verseForm.hebrew}</div>
                  ) : (
                    <div className="pv-empty">Hebrew text will appear here…</div>
                  )}
                  {verseForm.english ? (
                    <div className="pv-en">{verseForm.english}</div>
                  ) : (
                    <div className="pv-empty">English text will appear here…</div>
                  )}
                </div>
              </PreviewVerse>
            </ReaderPreview>
          </PreviewSection>

          <SubmitBtn onClick={submitVerse}>
            <FiPlus /> Add Verse
          </SubmitBtn>
        </Panel>
      )}
    </PageWrapper>
  )
}

export default LibraryUpload