import BookType from "../../types/index";

const filterBooksByRead = (BookData: BookType[]): BookType[] => {
  const readBooks = BookData.filter((book) => {
    return book["Exclusive Shelf"] === "read";
  });

  return readBooks;
};

const filterReadBooksByYear = (
  BookData: BookType[],
  year: number
): BookType[] => {
  const bookReturn: BookType[] = [];
  // Date format: "2020/05/06"
  BookData.forEach((book) => {
    if (book["Date Read"] !== "") {
      const bookReadDate = new Date(book["Date Read"]).getFullYear();
      if (bookReadDate === year) {
        bookReturn.push(book);
      }
    }
  });

  return bookReturn;
};

const filterReadBooksByMonthAndYear = (
  BookData: BookType[],
  month: number | null,
  year: number | null
): BookType[] => {
  const bookReturn: BookType[] = [];
  BookData.forEach((book) => {
    const bookReadDate = new Date(book["Date Read"]);

    if (book["Date Read"] !== "") {
      if (month && year) {
        if (
          bookReadDate.getFullYear() === year &&
          bookReadDate.getMonth() === month
        ) {
          bookReturn.push(book);
        }
      }
      if (month && !year) {
        if (bookReadDate.getMonth() === month) {
          bookReturn.push(book);
        }
      }
      if (!month && year) {
        if (bookReadDate.getFullYear() === year) {
          bookReturn.push(book);
        }
      }
    }
  });
  return bookReturn;
};

const filterBooksByDate = (
  BookData: BookType[],
  month: number | null,
  year: number | null
): BookType[] => {
  const bookReturn: BookType[] = [];
  BookData.forEach((book) => {
    // If the books have a date read.

    if (book["Date Read"] !== "") {
      // Create a javascript date object
      const bookReadDate = new Date(book["Date Read"]);
      const bookReadDateYear = bookReadDate.getFullYear();
      const bookReadDateMonth = bookReadDate.getMonth();
      // if year and month are null return an empty array
      if (month === null && year === null) {
        return;
      }
      // if year has value but month does not return books matching the year
      if (month === null && year !== null) {
        if (bookReadDateYear === year) {
          bookReturn.push(book);
        }
      }
      // if month has value but year does not return books matching the year
      if (month !== null && year === null) {
        if (bookReadDateMonth === month) {
          bookReturn.push(book);
        }
      }
      // if year has value and month has value return books matching month and year
      if (month !== null && year !== null) {
        if (bookReadDateYear === year && bookReadDateMonth === month) {
          bookReturn.push(book);
        }
      }
    }
  });
  return bookReturn;
};

const filterReadBooksByUserRating = (
  BookData: BookType[],
  rating: number
): BookType[] => {
  const bookReturn: BookType[] = [];
  BookData.forEach((book) => {
    if (book["Date Read"] !== "") {
      if (book["My Rating"] === rating) {
        bookReturn.push(book);
      }
    }
  });
  return bookReturn;
};

// Returns the years that there are dates for.
// IE if there were books read in 2016, return that
// date. Allows us to show the correct number of years
// based off of data instead of hard coding.
const getYearsByBookData = (BookData: BookType[]): number[] => {
  const yearsRead: number[] = [];
  BookData.forEach((book) => {
    if (book["Date Read"] !== "") {
      const bookReadYear = new Date(book["Date Read"]).getFullYear();
      if (yearsRead.indexOf(bookReadYear) === -1) {
        yearsRead.push(bookReadYear);
      }
    }
  });
  return yearsRead.sort();
};

const getPageCounts = (BookData: BookType[]): number => {
  let count = 0;
  BookData.forEach((book) => {
    if (book["Number of Pages"]) {
      count += book["Number of Pages"];
    }
  });

  return count;
};
export {
  filterBooksByRead,
  filterReadBooksByYear,
  filterReadBooksByMonthAndYear,
  filterReadBooksByUserRating,
  filterBooksByDate,
  getYearsByBookData,
  getPageCounts,
};
