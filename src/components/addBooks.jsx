import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { bookService } from "../Services/firebase-services";
const AddBook = () => {
  const [formData, setformData] = useState({
    title: "",
    author: "",
    status: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    addBook();
  };
  const addBook = () => {
    const newBook = {
      title: formData.title,
      author: formData.author,
      status: formData.status,
    };
    var ret = bookService.addBook(newBook);
    console.log(ret);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };
  return (
    <div className="p-4 box">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup>
            <InputGroup.Text id="formBookTitle">Title</InputGroup.Text>
            <Form.Control
              name="title"
              type="text"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleChange}
            ></Form.Control>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <InputGroup.Text id="formBookAuthor">Author</InputGroup.Text>
            <Form.Control
              name="author"
              type="text"
              placeholder="Book Author"
              value={formData.author}
              onChange={handleChange}
            ></Form.Control>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <InputGroup.Text id="formBookStatus">Status</InputGroup.Text>
            <Form.Select
              aria-label="Default select example"
              onChange={handleChange}
              name="status"
            >
              <option>Open this select menu</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </Form.Select>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddBook;
