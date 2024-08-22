const myLibrary = [];

function Book(title, author, numOfPages, readBook) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.readBook = readBook;
}

Book.prototype.updateReadStatus = function() {
  if (this.readBook === true) {
    this.readBook = false;
  } else {
    this.readBook = true;
  }
}

function addBookToLibrary(book) {
  if (!myLibrary.includes(book)) {
    myLibrary.push(book);
  }

  // updates page with new book
  displayLibrary();
}

function displayLibrary() {
  // removes everything from the display (to prevent duplication)
  const booksContainer = document.querySelector(".books-container");
  booksContainer.replaceChildren();

  myLibrary.forEach((book, bookIndex) => {
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

    let readBook = document.createElement("button");
    readBook.classList.add("change-read-status-button");
    
    updateVisualReadStatus(book.readBook, readBook);

    readBook.addEventListener("click", e => {
      // changes read status to opposite
      book.updateReadStatus();

      e.target.replaceChildren();

      updateVisualReadStatus(book.readBook, e.target);
    })

    let removeBook = document.createElement("button");
    removeBook.appendChild(document.createTextNode("Remove"));
    removeBook.classList.add("remove-book-button");

    removeBook.addEventListener("click", e => {
      const bookCard = e.target.parentElement;
      const libraryIndex = bookCard.dataset.libraryIndex;
  
      // remove book from library
      myLibrary.splice(libraryIndex, 1);
      
      displayLibrary();
    })

    function updateVisualReadStatus(bookReadStatus, bookReadButton) {
      if (bookReadStatus) {
        bookReadButton.appendChild(document.createTextNode("Read"));
        bookReadButton.classList.add("read-book");
      } else {
        bookReadButton.appendChild(document.createTextNode("Unread"));
        bookReadButton.classList.add("unread-book");
      }
    }

    let divChildren = [title, author, numOfPages, readBook, removeBook];

    for (const child of divChildren) {
      newDiv.appendChild(child);
    }

    newDiv.dataset.libraryIndex = bookIndex; 

    let bookContainer = document.querySelector(".books-container");
    bookContainer.appendChild(newDiv);

  })
}

const newBookButton = document.querySelector(".new-book-button");
const modal = document.querySelector("#modal");
const closeModalButton = document.querySelector(".close-modal-button");

newBookButton.addEventListener("click", () => {
  modal.showModal();
})

closeModalButton.addEventListener("click", () => {
  if (modal.hasAttribute("open")) {
    modal.close();
  }
})

const form = document.querySelector(".new-book-form");

form.addEventListener("submit", e => {
  e.preventDefault();
  if (modal.hasAttribute("open")) {
    modal.close();
  }
  const formElements = document.querySelector(".new-book-form").elements;
  addBookToLibrary(
    new Book(
      formElements["book-title-input"].value,
      formElements["book-author-input"].value,
      formElements["book-number-of-pages-input"].value,
      formElements["book-read-check-input"].checked
    )
  );
})

displayLibrary();
