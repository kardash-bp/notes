import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { INote } from '../components/NotesActions'
import { app, database, notesCol } from '../firebase/firebaseConfig'

//const firebaseInstance = collection(database, 'notes')

export const addItem = async (obj: { title: string; text: string }) => {
  return await addDoc(notesCol, obj)
}
export const getItems = async () => {
  try {
    const data = await getDocs(notesCol)
    const arr = data.docs.map((item) => {
      return { ...item.data(), id: item.id }
    })
    return arr as INote[]
  } catch (err) {
    console.log(err)
  }
}
export const getItem = async (id: string) => {
  if (id === '0') {
    const arr: any = await getItems()
    return arr[0]
  }
  const singleNote = doc(database, 'notes', id)
  const data = await getDoc(singleNote)
  const item = { ...data.data(), id: data.id }
  console.log(item)
  return item as INote
}
export const updateItem = async (id: string, title: string, text: string) => {
  try {
    const singleNote = doc(database, 'notes', id)
    await updateDoc(singleNote, { title, text })
    window.location.reload()
  } catch (err) {
    console.log(err)
  }
}
export const delItem = (id: string) => async () => {
  try {
    const singleNote = doc(database, 'notes', id)
    await deleteDoc(singleNote)
    window.location.reload()
  } catch (err) {
    console.log(err)
  }
}
