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

Book.equateWithID = function (id) {
    return function (book) {
        return book.id === id;
    };
};

function refreshLibraryContainer() {
    while (libraryContainer.firstChild) {
        libraryContainer.removeChild(libraryContainer.firstChild);
    }
    library.forEach((book) => {
        libraryContainer.appendChild(createBookElement(book));
    });
}

function bookClickHandler(e) {
    const bookElement = e.currentTarget;
    const book = library.find(Book.equateWithID(bookElement.dataset.id));
    book.toggleHasRead();
    refreshLibraryContainer();
}

function bookDoubleClickHandler(e) {
    const bookElement = e.target;
    library.splice(
        library.findIndex(Book.equateWithID(bookElement.dataset.id)),
        1,
    );
    refreshLibraryContainer();
}

function addToLibrary(name, author, year, genre) {
    const book = new Book(name, author, year, genre);
    library.push(book);
}

function createBookElement(book) {
    const bookElement = document.createElement("div");

    bookElement.className = book.hasRead
        ? Book.readClassName
        : Book.unreadClassName;
    bookElement.dataset.id = book.id;
    bookElement.innerText = book.name;

    bookElement.addEventListener("click", bookClickHandler);
    bookElement.addEventListener("dblclick", bookDoubleClickHandler);

    return bookElement;
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
    refreshLibraryContainer();
    e.preventDefault();
});

clearButton.addEventListener("click", (e) => {
    textInputs.forEach((textInput) => {
        textInput.value = "";
    });
    e.preventDefault();
});
