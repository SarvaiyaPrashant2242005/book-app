import React, { useEffect, useState } from "react";
import { bookService } from "../Services/firebase-services";
import "./ListBooks.css";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState({ id: "", title: "", author: "", status: "Available" });
  const [newBook, setNewBook] = useState({ title: "", author: "", status: "Available" });

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await bookService.getAllBooks();
    const newdata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setBooks(newdata);
  };

  const handleDelete = async (id) => {
    await bookService.deleteBook(id);
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleUpdateClick = (book) => {
    setCurrentBook(book);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await bookService.updateBook(currentBook.id, {
      title: currentBook.title,
      author: currentBook.author,
      status: currentBook.status,
    });
    setShowModal(false);
    getBooks();
  };

  const handleCurrentBookChange = (e) => {
    const { name, value } = e.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const handleNewBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) {
      alert("Please fill in all fields");
      return;
    }
    await bookService.addBook(newBook);
    setNewBook({ title: "", author: "", status: "Available" });
    getBooks();
  };

  return (
    <div className="book-management">
      <div className="header">
        <h1>Book Management System</h1>
      </div>

      <div className="container">
        <div className="add-book-section">
          <h2>Add New Book</h2>
          <form onSubmit={handleAddBook} className="add-book-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newBook.title}
                onChange={handleNewBookChange}
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={newBook.author}
                onChange={handleNewBookChange}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={newBook.status}
                onChange={handleNewBookChange}
              >
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>

            <button type="submit" className="btn btn-add">Add Book</button>
          </form>
        </div>

        <div className="book-list-section">
          <h2>Book Collection</h2>
          <div className="table-container">
            <table className="book-table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book, index) => (
                    <tr key={book.id}>
                      <td>{index + 1}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>
                        <span className={`status ${book.status === "Available" ? "available" : "not-available"}`}>
                          {book.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-update"
                            onClick={() => handleUpdateClick(book)}
                          >
                            Update
                          </button>
                          <button 
                            className="btn btn-delete"
                            onClick={() => handleDelete(book.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-books">No books available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Update Book</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label htmlFor="update-title">Title</label>
                  <input
                    type="text"
                    id="update-title"
                    name="title"
                    value={currentBook.title}
                    onChange={handleCurrentBookChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="update-author">Author</label>
                  <input
                    type="text"
                    id="update-author"
                    name="author"
                    value={currentBook.author}
                    onChange={handleCurrentBookChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="update-status">Status</label>
                  <select
                    id="update-status"
                    name="status"
                    value={currentBook.status}
                    onChange={handleCurrentBookChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-cancel" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-confirm">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManagement;