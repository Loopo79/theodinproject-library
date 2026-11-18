const libraryContainer = document.querySelector(".library-container");
const submitButton = document.querySelector(
    ".form-container form button[type='submit']",
);
const clearButton = document.querySelector(
    ".form-container form button[type='clear']",
);
const textInputs = document.querySelectorAll(
    ".form-container form input[type='text']",
);
const bookNameInput = document.querySelector("#book-name");
const bookAuthorInput = document.querySelector("#book-author");
const bookYearInput = document.querySelector("#book-year");
const bookGenreInput = document.querySelector("#book-genre");

const library = new Array();

function Book(name, author, year, genre) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.hasRead = false;
}

Book.className = "book";
Book.readClassName = "book read";
Book.unreadClassName = "book";

Book.prototype.toggleHasRead = function () {
    this.hasRead = !this.hasRead;
};

function bookClickHandler(e) {
    const bookElement = e.target;
    const book = library.find((book) => book.id === bookElement.dataset.id);
    book.toggleHasRead();
    bookElement.className = book.hasRead
        ? Book.readClassName
        : Book.unreadClassName;
    console.log(book.id, bookElement.className);
}

function createBookElement(book) {
    const bookElement = document.createElement("div");
    bookElement.className = Book.className;

    bookElement.dataset.id = book.id;
    bookElement.dataset.name = book.name;
    bookElement.dataset.author = book.author;
    bookElement.dataset.year = book.year;
    bookElement.dataset.genre = book.genre;

    bookElement.innerText = book.name;

    bookElement.addEventListener("click", bookClickHandler);

    return bookElement;
}

function addToLibrary(name, author, year, genre) {
    const book = new Book(name, author, year, genre);
    library.push(book);
    libraryContainer.appendChild(createBookElement(book));
}

submitButton.addEventListener("click", (e) => {
    const bookName = bookNameInput.value;
    const bookAuthor = bookAuthorInput.value;
    const bookYear = bookYearInput.value;
    const bookGenre = bookGenreInput.value;

    if (bookName == "" || bookAuthor == "" || bookYear == "") {
        return;
    }

    addToLibrary(
        bookName.trim(),
        bookAuthor.trim(),
        bookYear.trim(),
        bookGenre.trim(),
    );
    e.preventDefault();
});

clearButton.addEventListener("click", (e) => {
    textInputs.forEach((textInput) => {
        textInput.value = "";
    });
    e.preventDefault();
});
