const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  render();
}

function render() {
  let libraryBook = document.getElementById("library");
  libraryBook.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookElement = document.createElement("div");
    bookElement.innerHTML = `
      <div class="card"> 
        <h3 class="title">${book.title}</h3>
        <h4 class="author">${book.author}</h4>
        <div class="card-details">
          <p class="pages">${book.pages}</p>
          <p class="read">${book.read ? "Read" : "Not Read"}</p>
        </div>
        <button onClick="removeBook(${i})">Remove</button>
        <button onClick="toggleRead(${i})">Toggle</button>
      </div>`;
    libraryBook.appendChild(bookElement);
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}

function addBookToLibrary(event) {
  event.preventDefault(); 
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  render();
  document.getElementById("new-book-form").reset(); 
}

document.addEventListener("DOMContentLoaded", function() {
  let newBookbtn = document.getElementById("btn");
  if (newBookbtn) {
    newBookbtn.addEventListener("click", function() {
      let newBookForm = document.getElementById("new-book-form");
      if (newBookForm) {
        newBookForm.style.display = "block";
      } else {
        console.error("New book form element not found");
      }
    });
  } else {
    console.error("Add Book button element not found");
  }

  let newBookForm = document.getElementById("new-book-form");
  if (newBookForm) {
    newBookForm.addEventListener("submit", addBookToLibrary);
  } else {
    console.error("New book form element not found for submit event listener");
  }
});
