const myLibrary = [];

/* Functions */

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
      if (e.target.classList.contains("read-book")) {
        e.target.classList.remove("read-book");
      } else if (e.target.classList.contains("unread-book")) {
        e.target.classList.remove("unread-book");
      }

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

    let divChildren = [title, author, numOfPages, readBook, removeBook];

    for (const child of divChildren) {
      newDiv.appendChild(child);
    }

    newDiv.dataset.libraryIndex = bookIndex; 

    let bookContainer = document.querySelector(".books-container");
    bookContainer.appendChild(newDiv);

  })
}

function updateVisualReadStatus(bookReadStatus, bookReadButton) {
  if (bookReadStatus) {
    bookReadButton.appendChild(document.createTextNode("Read"));
    bookReadButton.classList.add("read-book");
  } else {
    bookReadButton.appendChild(document.createTextNode("Unread"));
    bookReadButton.classList.add("unread-book");
  }
}

// Check book doesn't already exist in library
function checkBookExists(newBookTitle) {
  let matchingBooks = myLibrary.filter(book => {
    return book.title.toLowerCase() === newBookTitle.toLowerCase();
  })

  if (matchingBooks.length === 0) {
    return false;
  }

  return true;
}

function informUserOfDuplicateBook() {
  // inform user of duplicate using ::before
  let inputContainer = document.querySelector(".book-title-input-container");

  // toggle won't work as the class may already have been added
  // (which would remove it again)
  if (!inputContainer.classList.contains("book-title-input-duplicate")) {
    inputContainer.classList.add("book-title-input-duplicate");
  }
}

/* Event Listeners */

const newBookButton = document.querySelector(".new-book-button");
const modal = document.querySelector("#modal");

newBookButton.addEventListener("click", () => {
  modal.showModal();
})

const closeModalButton = document.querySelector(".close-modal-button");

closeModalButton.addEventListener("click", () => {
  if (modal.hasAttribute("open")) {
    modal.close();
    modal.querySelector("#new-book-form").reset();
  }
})

const form = document.querySelector(".new-book-form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const formElements = document.querySelector(".new-book-form").elements;
  const newBookTitle = formElements["book-title-input"].value;

  if (checkBookExists(newBookTitle)) {
    informUserOfDuplicateBook();
  } else {
    if (modal.hasAttribute("open")) {
      modal.close();
    }
    addBookToLibrary(
      new Book(
        formElements["book-title-input"].value,
        formElements["book-author-input"].value,
        formElements["book-number-of-pages-input"].value,
        formElements["book-read-check-input"].checked
      )
    );
    modal.querySelector("#new-book-form").reset();
  }
})

const bookTitleInput = document.querySelector(".new-book-form")
.elements["book-title-input"];

bookTitleInput.addEventListener("keyup", e => {
  if (checkBookExists(e.target.value)) {
    informUserOfDuplicateBook();
  } else {
    let inputContainer = document.querySelector(".book-title-input-container");

    if (inputContainer.classList.contains("book-title-input-duplicate")) {
      inputContainer.classList.remove("book-title-input-duplicate");
    }
  }
})


displayLibrary();