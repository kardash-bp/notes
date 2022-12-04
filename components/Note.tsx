import { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import styles from '../styles/notes.module.scss'
import { QuillEditor } from '../utils/quillEditor'
import { delItem, updateItem } from '../firebase/fireActions'
import { INote } from './NotesActions'

const Note = ({ note }: { note: INote }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const getEditData = () => {
    setIsEdit(true)
  }
  const onEditorChange = (changes: string) => {
    setText(changes)
  }
  useEffect(() => {
    if (!note) return
    console.log(note)

    if (Object.keys(note).length > 0) {
      setText(note.text)
      setTitle(note.title)
    }
  }, [note])
  console.log(note)

  if (!note) {
    return (
      <div>
        <h2>Please select note</h2>
      </div>
    )
  } else {
    return (
      <>
        {isEdit ? (
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder='Enter the Title..'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className={styles.ReactQuill}>
              <QuillEditor value={text} onChange={onEditorChange} />
            </div>
            <button
              className={styles.saveBtn}
              onClick={() => updateItem(note.id!, title, text)}
            >
              Update Note
            </button>
          </div>
        ) : (
          <>
            <h2>{title}</h2>
            <div>{text && parse(text)}</div>
            <button className={styles.editBtn} onClick={getEditData}>
              Edit
            </button>
            <button className={styles.deleteBtn} onClick={delItem(note.id!)}>
              Delete
            </button>
          </>
        )}
      </>
    )
  }
}

export default Note
