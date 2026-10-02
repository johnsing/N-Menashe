// utils/bible.js
import bibleData from '../data/bible.json'

export const categories = bibleData.categories

// Get all categories
export const getAllCategories = () => {
  return categories
}

// Get category by slug
export const getCategoryBySlug = (slug) => {
  return categories.find(cat => cat.slug === slug)
}

// Get all books from a category
export const getBooksByCategory = (categorySlug) => {
  const category = getCategoryBySlug(categorySlug)
  return category ? category.books : []
}

// Get book by slug across all categories
export const getBookBySlug = (bookSlug) => {
  for (const category of categories) {
    const book = category.books.find(b => b.slug === bookSlug)
    if (book) return { ...book, category: category.slug }
  }
  return null
}

// Get chapters of a book
export const getBookChapters = (bookSlug) => {
  const book = getBookBySlug(bookSlug)
  return book ? book.chaptersData || [] : []
}

// Get verses of a chapter with both Hebrew and English
export const getChapterVerses = (bookSlug, chapterNumber) => {
  const book = getBookBySlug(bookSlug)
  if (!book || !book.chaptersData) return []
  const chapter = book.chaptersData.find(ch => ch.number === chapterNumber)
  return chapter ? chapter.versesData || [] : []
}

// Get verse by book, chapter, and verse number with both languages
export const getVerse = (bookSlug, chapterNumber, verseNumber) => {
  const verses = getChapterVerses(bookSlug, chapterNumber)
  return verses.find(v => v.number === verseNumber)
}

// Search across all texts (search both Hebrew and English)
export const searchBible = (query, language = 'english') => {
  const results = []
  const searchTerm = query.toLowerCase()
  const textField = language === 'hebrew' ? 'hebrew' : 'english'
  
  for (const category of categories) {
    for (const book of category.books) {
      if (book.chaptersData) {
        for (const chapter of book.chaptersData) {
          if (chapter.versesData) {
            for (const verse of chapter.versesData) {
              const text = verse[textField] || ''
              if (text.toLowerCase().includes(searchTerm)) {
                results.push({
                  category: category.slug,
                  book: book.slug,
                  bookName: book.name,
                  chapter: chapter.number,
                  verse: verse.number,
                  hebrew: verse.hebrew,
                  english: verse.english
                })
              }
            }
          }
        }
      }
    }
  }
  
  return results
}

// Get total stats
export const getBibleStats = () => {
  let totalBooks = 0
  let totalChapters = 0
  let totalVerses = 0
  
  for (const category of categories) {
    totalBooks += category.books.length
    for (const book of category.books) {
      totalChapters += book.chapters || 0
      totalVerses += book.verses || 0
    }
  }
  
  return {
    categories: categories.length,
    books: totalBooks,
    chapters: totalChapters,
    verses: totalVerses
  }
}

// Get verse count with both languages available
export const getBilingualStats = () => {
  let hebrewCount = 0
  let englishCount = 0
  let bothCount = 0
  
  for (const category of categories) {
    for (const book of category.books) {
      if (book.chaptersData) {
        for (const chapter of book.chaptersData) {
          if (chapter.versesData) {
            for (const verse of chapter.versesData) {
              if (verse.hebrew) hebrewCount++
              if (verse.english) englishCount++
              if (verse.hebrew && verse.english) bothCount++
            }
          }
        }
      }
    }
  }
  
  return { hebrewCount, englishCount, bothCount }
}