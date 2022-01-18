import React from "react";

interface Book {
  title: string;
  bn: number;
}

const BookComponent: React.FC<Book> = (props) => {
  const { title, bn } = props;
  return (
    <h6>
      {bn} - {title}
    </h6>
  );
};

export default BookComponent;
