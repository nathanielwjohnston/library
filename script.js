const book1 = new Book("Eragon", "Christopher Paolini", 544, true);
const book2 = new Book("Atomic Habits", "James Clear", 320, true);

const myLibrary = [book1, book2, book1, book2, book1, book2, book1, book2, book1, book2,
  book1, book2, book1, book2, book1, book2, book1, book2, book1, book2,
  book1, book2, book1, book2, book1, book2, book1, book2, book1, book2,
  book1, book2, book1, book2, book1, book2, book1, book2, book1, book2,
  book1, book2, book1, book2, book1, book2, book1, book2, book1, book2,
  book1, book2, book1, book2, book1, book2, book1, book2, book1, book2
];

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

function displayLibrary() {
  myLibrary.forEach(book => {
    let newDiv = document.createElement("Div");
    newDiv.classList.add("book-card")

    let title = document.createElement("H3");
    title.appendChild(document.createTextNode(book.title));
    title.classList.add("book-title");

    let author = document.createElement("Div");
    author.appendChild(document.createTextNode(book.author));
    author.classList.add("book-author");

    let numOfPages = document.createElement("Div");
    numOfPages.appendChild(document.createTextNode(book.numOfPages)); 
    numOfPages.classList.add("book-page-numbers");

    let readBook = document.createElement("INPUT");
    readBook.setAttribute("type", "radio");
    readBook.classList.add("book-read-check");
    
    if (book.readBook) {
      readBook.checked = true;
    } else {
      readBook.checked = false;
    }

    let divChildren = [title, author, numOfPages, readBook];

    for (const child of divChildren) {
      newDiv.appendChild(child);
    }

    let bookContainer = document.querySelector(".books-container");
    bookContainer.appendChild(newDiv);

  })
}

displayLibrary();
