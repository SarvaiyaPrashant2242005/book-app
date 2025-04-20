import { db } from "../firebase-config";
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

const bookCollectionRef = collection(db, "books");

export const bookService = {
  getAllBooks: () => {
    return getDocs(bookCollectionRef);
  },
  addBook: (newBook) => {
    return addDoc(bookCollectionRef, newBook);
  },
  deleteBook: async (id) => {
    const bookRef = doc(db, "books", id);
    await deleteDoc(bookRef);
  },
  updateBook: async (id, updatedBook) => {
    const bookRef = doc(db, "books", id);
    await updateDoc(bookRef, updatedBook);
  },
};
