'use strict';

// Constants and variables
const searchBtn = document.getElementById('searchBtn');
const printFile = document.getElementById("printFile");
const results = document.getElementById("results");
const addBtn = document.getElementById('addBtn');
const form = document.getElementById('formFile');
const saveFileBtn = document.getElementById('saveBooksFile');
const deleteBtn = document.getElementById('deleteBtn');

let fileContent;
let readBooks;
let bookArr;

//Creating a new book
let book = { name: this.name, writer: this.writer, isbn: this.isbn, year: this.published };

//streaming file to text
const streamToText = async (blob) => {
    const readableStream = await blob.getReader();
    const chunk = await readableStream.read();
    return new TextDecoder('utf-8').decode(chunk.value);
};

// reading uploaded file into fileContent and printing it visible to user.
form.addEventListener('change', (e) => {
    let file = document.getElementById('formFile').files[0];
    (async () => {
        fileContent = await file.text();
        let text ="This is content of uploaded file: \n";
           if(fileContent){
               readBooks=fileContent.split(/\r?\n/);
               console.log(readBooks+"\nTest file content has been loaded, readBooks splitted")
               readBooks.forEach(element=> text+=`<p>${element}</p>`);
           }
        printFile.innerHTML+=text;
            //Saving file if user presses save books btn
           saveFileBtn.addEventListener('click', e => {
               if (confirm("Are you sure you want to save?") == true) {
                   let bits;
                   for (let i = 0; readBooks.length > i; i++) {
                       bits = readBooks[i].split("/");
                       console.log(bits + "bits")
                       book.name = bits[0];
                       book.writer = bits[1]
                       book.isbn = bits[2]
                       book.year = bits[3]
                       console.log(JSON.stringify(book) + "click saveFiledBtn: Test here is a book");
                       getStoredBooks();
                       localStorage.setItem("books", JSON.stringify(book));
                       bookArr.push(book);
                       localStorage.setItem("allBooks", JSON.stringify(bookArr))
                   }
                   location.reload();
               }

           })

    })();
});

//adding event listener for click and saving user input to localStorage
addBtn.addEventListener('click', (e)=> {
    //getting stored books from local storage
    getStoredBooks();
    //taking userinput
        let bookName = document.getElementById("bookName").value;
        let writer = document.getElementById("writer").value;
        let isbn = document.getElementById("isbn").value;
        let published = document.getElementById("published").value;

    //Creating a new book from user input
        if (bookName.length > 0 && writer.length > 0 && isbn.length > 0 && published.length == 4){
            book = { name: bookName, writer: writer, isbn: isbn, year: published};
            //adding input to local storage
            localStorage.setItem("books", JSON.stringify(book));
            bookArr.push(book);
            localStorage.setItem("allBooks", JSON.stringify(bookArr))
        }
})

//adding eventListener to listen for searching saved books and file content and printing both our.
searchBtn.addEventListener('click', (e)=>{
    let text = "";
    //emptying the results if they are searched already
    results.innerHTML+=text;
    let item = localStorage.getItem("allBooks");
    text+= `<p>${item}</p>`
    results.innerHTML+=text;
});

//possibility to delete all books from localStorage
deleteBtn.addEventListener('click', e =>{;
    if (confirm("Are you sure you want to delete all books?") == true){
        console.log("deleteBtn clicked OK");
        localStorage.clear();
    }
    location.reload();

})


// function to get stored books from local strorage.
let getStoredBooks= ()=> {
    bookArr = JSON.parse(localStorage.getItem("allBooks"))
    if (bookArr === null) {
        bookArr = [];
    }
    return bookArr;
}