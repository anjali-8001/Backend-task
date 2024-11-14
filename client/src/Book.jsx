import React from "react";

const Book = ({ cover, desc, title, pages }) => {
  return (
    <div className="flex flex-col w-[150px]">
      <img src={cover} className="w-[150px] h-auto" alt="book_image" />
      <p className="text-red-700">{title}</p>
      <p>{desc}</p>
      <p>{pages}</p>
    </div>
  );
};

export default Book;
