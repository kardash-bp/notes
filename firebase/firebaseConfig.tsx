// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  CollectionReference,
  collection,
  DocumentData,
  FieldValue,
  Primitive,
} from 'firebase/firestore'
import { INote } from '../components/NotesActions'
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,

  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,

  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,

  databaseURL: 'https://fire-project-71ce6.firebaseio.com',

  storageBucket: 'fire-project-71ce6.appspot.com',

  messagingSenderId: '557583706820',

  appId: process.env.NEXT_PUBLIC_APP_ID,
}

// Initialize Firebase
type WithFieldValue<T> =
  | T
  | (T extends Primitive
      ? T
      : {
          [K in keyof T]: FieldValue | WithFieldValue<T[K]>
        })

type PartialWithFieldValue<T> = Partial<WithFieldValue<T>>
export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
// This is just a helper to add the type to the db responses
const createCollection = <T,>(collectionName: string) => {
  return collection(
    database,
    collectionName
  ) as CollectionReference<DocumentData>
}
export const notesCol = createCollection<INote[]>('notes')
