interface BookType {
  "Book Id": number;
  Title: string;
  Author: string;
  "Author l-f": string;
  "Additional Authors": string;
  ISBN: string;
  ISBN13: number | null;
  "My Rating": number;
  "Average Rating": number;
  Publisher: string;
  Binding: string;
  "Year Published": number | null;
  "Original Publication Year": number | null;
  "Date Read": string;
  "Date Added": string;
  Bookshelves: string;
  "Bookshelves with positions": string;
  "Exclusive Shelf": string;
  "My Review": string;
  Spoiler: string;
  "Number of Pages": number;
  "Private Notes": string;
  "Read Count": number;
  "Recommended For": string;
  "Recommended By": string;
  "Owned Copies": number;
  "Original Purchase Date": string;
  "Original Purchase Location": string;
  Condition: string;
  "Condition Description": string;
  BCID: string;
}

export default BookType;
