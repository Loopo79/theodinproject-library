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

function Book(name, year, author, genre) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.hasRead = false;
}

Book.prototype.read = function (hasRead) {
    this.hasRead = true;
};

function createBookElement(book) {
    const bookElement = document.createElement("div");
    bookElement.className = "book";

    bookElement.dataset.id = book.id;
    bookElement.dataset.name = book.name;
    bookElement.dataset.author = book.author;
    bookElement.dataset.year = book.year;
    bookElement.dataset.genre = book.genre;
    bookElement.dataset.hasRead = book.hasRead;

    bookElement.innerText = book.name;

    return bookElement;
}

function addToLibrary(name, year, author, genre) {
    const book = new Book(name, year, author, genre);
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
