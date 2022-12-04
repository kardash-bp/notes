import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Note from '../components/Note'
import NotesActions, { INote } from '../components/NotesActions'
import { getItem, getItems } from '../firebase/fireActions'
import styles from '../styles/Home.module.scss'
export type GetNote = (id: string) => void
export default function Home() {
  const [note, setNote] = useState<INote | undefined>(undefined)

  const getNote: GetNote = async (id = '0') => {
    if (id === '0') {
      const items: any = await getItems()
      setNote(items[0])
    }
    const note: any = await getItem(id)
    setNote(note)
  }
  useEffect(() => {
    getNote('0')
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>NextNotes</title>

        <meta name='description' content='This is Evernote Clone' />
        <link rel='icon' href='/notes.png' />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          {' '}
          <div className={styles.left}>
            <NotesActions getNote={getNote} />
          </div>
          <div className={styles.wrapper}>
            <Note note={note!} />
          </div>
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
