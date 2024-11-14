import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Book from "./Book";

function App() {
  const [books, setBooks] = useState([]);
  const getData = async () => {
    const response = await axios.get(
      "https://potterapi-fedeperin.vercel.app/en/books"
    );
    setBooks(response?.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="flex gap-5 flex-wrap w-full">
        {books.map((book, index) => {
          return (
            <Book
              key={index}
              cover={book.cover}
              desc={book.description}
              title={book.title}
              pages={book.pages}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
