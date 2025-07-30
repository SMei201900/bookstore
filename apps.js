const outputArea = document.getElementById("output_Area");
const bookForm = document.getElementById("bookForm")

function addBookToTable(title, author, publisher, id=null) {
    const newRow = document.createElement("tr");
    
    newRow.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${publisher || "NA"}</td>
        <td>
            ${id ? `<button class="deletebtn" data-id="${id}">Delete</button>` : ''}
        </td>
        `; 

    //this allows us to add the new row (aka "tr" and the tds) into the existing table at the end 
    outputArea.appendChild(newRow); 

    if (id) {
        const dltBtn = newRow.querySelector(".deletebtn");
        dltBtn.addEventListener("click", function () {
            const bookID = this.dataset.id;

            fetch(`https://bookstore-api-six.vercel.app/api/books/${bookID}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(() => {
                newRow.remove();
            })
            .catch(error => {
                console.error("Failed to delete book from list:", error);
                alert("Oops! Something went wrong while deleting the book. Please try again.")
            });
        });
    }
}

//calling the bookstore api 
document.addEventListener("DOMContentLoaded", () => {
    fetch('https://bookstore-api-six.vercel.app/api/books')
    .then(response => response.json())
    .then(data => {
        data.forEach(book => {
            addBookToTable(book.title, book.author, book.publisher, book.id)
        }); 
    }).catch(error => {
        console.error("Error loading books:", error)
    });
});

//addds user-typed info into the table 
bookForm.addEventListener("submit", function(event) {
    event.preventDefault();
        /*this is the same as writing 
            document.getElementById("bookForm")
                .addEventListener("submit", function(event) {
                    event.preventDefault(); } 
        */ 
    const title = document.getElementById("Book_Title").value; 
    const author = document.getElementById("Book_Author").value;
    const publisher = document.getElementById("Book_Publisher").value;

    const newRow = document.createElement("tr");

//the POST request requirement AKA add the user-typed info into the API/SERVER 
    fetch('https://bookstore-api-six.vercel.app/api/books', {
        method: 'POST',
        body: JSON.stringify({title, author, publisher}),
        headers: {'Content-Type': 'application/json', }
    }).then(response => response.json())
    .then(json => {
        addBookToTable(json.title, json.author, json.publisher, json.id);

    }).catch(error => {
        console.error("Failed to add book to server:", error)
        alert("Oops! Something went wrong while adding the book. Please try again.")
    });

    bookForm.reset();
}); 



/*.title, .author, .publisher is from the API where its written like such; see below 
[
  {
    "id": 1,
    "title": "adeo victus coniuratio trado vitiosus",
    "author": "Melinda Dietrich",
    "isbn": "764bdc47-3037-4583-b7b8-6ef1ab7ee0f6",
    "publishedDate": "2021-01-07T21:57:20.000Z",
    "publisher": "Nitzsche Group",
    "genre": "thema",
    "description": "Adsuesco odio ubi spargo cenaculum distinctio. Xiphias temporibus audacia cuius articulus adficio benigne subseco aptus ullus. Verecundia virtus creator.",
    "pageCount": 896,
    "language": "ja",
    "createdAt": "2024-08-02T01:19:12.000Z",
    "updatedAt": "2024-08-02T01:19:12.000Z"
  }, ---------- ]

*/