const addBookForm = document.querySelector(".add")
const deleteBookForm = document.querySelector(".delete")
const updateForm = document.querySelector(".update")
const signupForm = document.querySelector(".signup")
const loginForm = document.querySelector(".login")
const logoutButton = document.querySelector(".logout")
const unsubButton = document.querySelector(".unsub")

import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD0YGr_sCf08TdVdpp71MfP5WP5yJKTVCM",
  authDomain: "fir-9-test-226c4.firebaseapp.com",
  projectId: "fir-9-test-226c4",
  storageBucket: "fir-9-test-226c4.appspot.com",
  messagingSenderId: "710714601989",
  appId: "1:710714601989:web:4be60f55b44738cca1e26c",
}

//init app
initializeApp(firebaseConfig)

// init services
const database = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(database, "books")

// queries

const q = query(colRef, orderBy("createAt"))
// real time collection data

const unsubCol = onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

// adding document

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createAt: serverTimestamp(),
  })
    .then(() => {
      addBookForm.reset()
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// deleting document

deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault()

  deleteDoc(doc(database, "books", deleteBookForm.id.value))
    .then(() => {
      deleteBookForm.reset()
    })
    .catch((err) => {
      console.log(err.message)
    })
})

updateForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const docRef = doc(database, "books", updateForm.id.value)
  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset()
  })
})

signupForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const pass = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, pass)
    .then((cred) => {
      console.log("Ура, ты появился: ", cred.user)
    })
    .catch((err) => {
      alert("Походу тебя не создали, какие-то траблы(", err.message)
    })
  signupForm.reset()
})

logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Разлогин)")
    })
    .catch((err) => {
      alert("Чет чел у тебя проблемы даже с разлогином(", err.message)
    })
})

loginForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const pass = loginForm.password.value

  signInWithEmailAndPassword(auth, email, pass)
    .then((cred) => {
      console.log("Харош, залогинился!", cred.user)
    })
    .catch((err) => {
      alert("Плох, не залогинился((", err.message)
    })
  loginForm.reset()
})

const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log(
    "Статус изменён(хз че за статус, походу ты разлогинился/залогинился). Ну почитай тут: ",
    user
  )
})

unsubButton.addEventListener("click", () => {
  console.log("Отписка")
  unsubCol()
  unsubAuth()
})
