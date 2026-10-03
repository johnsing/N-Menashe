import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { FiUpload, FiImage, FiVideo, FiMusic, FiFileText } from 'react-icons/fi'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 42px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    background: linear-gradient(135deg, #ffd700, #ffed4a, #f5a623);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
  }

  p {
    color: #888;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    h1 { font-size: 28px; letter-spacing: 2px; }
  }
`

const UploadCard = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #161616 100%);
  border: 2px dashed #2a2a2a;
  border-radius: 20px;
  padding: 60px 32px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 32px;

  &:hover {
    border-color: rgba(255, 215, 0, 0.4);
    background: rgba(255, 215, 0, 0.02);
  }

  .upload-icon {
    font-size: 48px;
    color: #ffd700;
    margin-bottom: 16px;
  }

  h3 {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  p {
    color: #666;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    .upload-icon { font-size: 36px; }
  }
`

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 32px;
`

const TypeCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 16px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  color: #888;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease;

  svg {
    font-size: 26px;
  }

  &:hover {
    border-color: rgba(255, 215, 0, 0.4);
    color: #ffd700;
    transform: translateY(-3px);
  }

  &.active {
    border-color: #ffd700;
    background: rgba(255, 215, 0, 0.08);
    color: #ffd700;
  }
`

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    color: #888;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  input, textarea, select {
    width: 100%;
    padding: 14px 16px;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 12px;
    color: #fff;
    font-size: 15px;
    transition: all 0.25s ease;

    &:focus {
      border-color: #ffd700;
      outline: none;
    }

    &::placeholder {
      color: #444;
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  color: #0a0a0a;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 215, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const mediaTypes = [
  { id: 'image', label: 'Image', icon: FiImage },
  { id: 'video', label: 'Video', icon: FiVideo },
  { id: 'audio', label: 'Audio', icon: FiMusic },
  { id: 'document', label: 'Document', icon: FiFileText }
]

const Create = () => {
  const [selectedType, setSelectedType] = useState('image')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Container>
      <PageHeader>
        <h1>Create</h1>
        <p>Share your content with the community</p>
      </PageHeader>

      <UploadCard>
        <FiUpload className="upload-icon" />
        <h3>Upload your media</h3>
        <p>PNG, JPG, MP4, MP3, PDF and more</p>
      </UploadCard>

      <TypeGrid>
        {mediaTypes.map(({ id, label, icon: Icon }) => (
          <TypeCard
            key={id}
            type="button"
            className={selectedType === id ? 'active' : ''}
            onClick={() => setSelectedType(id)}
          >
            <Icon />
            <span>{label}</span>
          </TypeCard>
        ))}
      </TypeGrid>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Give your content a title"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Tell the community about your content"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="nature, design, inspiration"
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={!title.trim() || !description.trim()}>
          Publish
        </SubmitButton>
      </form>
    </Container>
  )
}

export default Create