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

function displayLibrary() {
  myLibrary.forEach(book => {
    let newDiv = document.createElement("Div");

    let title = document.createElement("H3");
    title.appendChild(document.createTextNode(book.title));

    let author = document.createElement("Div");
    author.appendChild(document.createTextNode(book.author));

    let numOfPages = document.createElement("Div");
    numOfPages.appendChild(document.createTextNode(book.numOfPages)) 

    let readBook = document.createElement("INPUT");
    readBook.setAttribute("type", "radio");
    
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

const book1 = new Book("Eragon", "Christopher Paolini", 544, true);
const book2 = new Book("Atomic Habits", "James Clear", 320, true);
