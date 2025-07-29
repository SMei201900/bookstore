const outputArea = document.getElementById("output_Area");
const bookForm = document.getElementById("bookForm")

function addBookToTable(title, author, publisher) {
    const newRow = document.createElement("tr");
    
    newRow.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${publisher || "NA"}</td>
        `; 

    //this allows us to add the new row (aka "tr" and the tds) into the existing table at the end 
    outputArea.appendChild(newRow); 
}

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

    addBookToTable(title, author, publisher)

    bookForm.reset() //clear the form after submission 
}); 

/*everything had to be INSIDE the addeventListener 
    b/c without it, we are appending empty strings
    AKA we were submitting the form when there was nothing
    AKA the code was running right as the page loads which we do not want
*/


/*testing to see if the branch was created*/

document.addEventListener("DOMContentLoaded", () => {
    fetch('https://bookstore-api-six.vercel.app/api/books').then(response => response.json()).then(data => {
        data.forEach(book => {
            addBookToTable(book.title, book.author, book.publisher)
        }); 
    }).catch(error => {
        console.error("Error loading books:", error)
    });
});