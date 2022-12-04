import { useState, useEffect, useRef } from 'react'

import { collection, addDoc, getDocs } from 'firebase/firestore'
import { app, database } from '../firebase/firebaseConfig'
import styles from '../styles/notes.module.scss'
import { QuillEditor } from '../utils/quillEditor'
import { addItem, getItems } from '../firebase/fireActions'
import { GetNote } from '../pages'
export interface INote {
  id?: string
  title: string
  text: string
}

const NotesActions = ({ getNote }: { getNote: (id: string) => void }) => {
  const [notes, setNotes] = useState<INote[] | []>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const saveNote = async () => {
    if (title === '' || text === '') {
      return
    }
    try {
      await addItem({ title, text })

      setTitle('')
      setText('')
      getNotes()
      inputRef.current?.focus()
    } catch (err) {
      console.log('error: ', err)
    }
  }
  const onEditorChange = (changes: string) => {
    setText(changes)
  }
  const getNotes = async () => {
    const arr: any = await getItems()
    setNotes([...arr])
  }

  useEffect(() => {
    getNotes()
  }, [])
  console.log(title, text)

  return (
    <>
      <div className={styles.btnContainer}>
        <button
          className={styles.button}
          onClick={() => setIsVisible(!isVisible)}
        >
          {!isVisible ? 'Add a New Note' : 'Hide a New Note'}
        </button>
        {isVisible && (
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              className={styles.input}
              placeholder='Enter the Title..'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <div className={styles.ReactQuill}>
              <QuillEditor value={text} onChange={onEditorChange} />
            </div>
            <button className={styles.saveBtn} onClick={saveNote}>
              Save Note
            </button>
          </div>
        )}
      </div>
      <div>
        {notes.map((note) => {
          return (
            <div
              key={note.id}
              className={styles.notesInner}
              onClick={() => getNote(note.id!)}
            >
              <h3>{note.title}</h3>
              {/* removing html tags from string */}
              <p>{note.text.replace(/(<([^>]+)>)/gi, '')}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default NotesActions
