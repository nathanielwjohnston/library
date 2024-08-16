const myLibrary = [];

function Book(title, author, numOfPages, readBook) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.readBook = readBook;
}

function addBookToLibrary(book) {
  if (!myLibrary.includes(book)) {
    myLibrary.push(book);
  }
}

const book1 = new Book("Eragon", "Christopher Paolini", 544, true);
const book2 = new Book("Atomic Habits", "James Clear", 320, true);
