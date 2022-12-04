import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

export interface EditorProps {
  value?: string
  onChange?: (changes: string) => void
}
export const QuillEditor = (props: EditorProps) => {
  const [value, setValue] = useState<string>(props.value || '')

  const handleChange = (content: string) => {
    setValue(content)
    if (props.onChange) {
      props.onChange(content)
    }
  }
  useEffect(() => {
    if (props.value === '') {
      setValue(props.value)
    }
  }, [props.value])

  return (
    <ReactQuill
      modules={modules}
      theme='snow'
      placeholder='Start writing...'
      value={value}
      onChange={handleChange}
    />
  )
}
