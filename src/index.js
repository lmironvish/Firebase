import {initializeApp} from 'firebase/app'
import {
  getFirestore, collection, getDocs, addDoc, deleteDoc, doc
}from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD0YGr_sCf08TdVdpp71MfP5WP5yJKTVCM",
  authDomain: "fir-9-test-226c4.firebaseapp.com",
  projectId: "fir-9-test-226c4",
  storageBucket: "fir-9-test-226c4.appspot.com",
  messagingSenderId: "710714601989",
  appId: "1:710714601989:web:4be60f55b44738cca1e26c"
};

//init app
initializeApp(firebaseConfig)

// init services
const database = getFirestore()

// collection ref
const colRef = collection(database, 'books')

// get collection data
getDocs(colRef)
  .then((snapshot) =>{
    let books = []
    snapshot.docs.forEach((doc) =>{
        books.push({...doc.data(), id: doc.id, })
    })
    console.log(books);
  })
  .catch(err => {
    console.log(err.message);
  })


// adding document

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() =>{
    addBookForm.reset()
  })
  .catch(err =>{
    console.log(err.message);
  })
})

// deleting document

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(database, 'books', deleteBookForm.id.value)
  deleteDoc(docRef)
    .then(() =>{
      deleteBookForm.reset()
    })
    .catch(err =>{
      console.log(err.message);
    })
})
