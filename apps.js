document.getElementById("bookForm").addEventListener("submit", function(event) {
    event.preventDefault();

/*we look for our form via the id: bookForm 
    We add an eventListener, type: submit
    we create a function called "event"
    .preventDefault will prevent the default submission activity
*/

const bookTitle = document.getElementById("Book_Title").value; 
const bookAuthor = document.getElementById("Book_Author").value;
const bookPublisher = document.getElementById("Book_Publisher").value;
const outputArea = document.getElementById("output_Area"); 

/*we want our information to become a new row in the table*/
const newRow = document.createElement("tr") 

/*since we created a new_row just above, we just add the tds now*/
newRow.innerHTML = `
    <td>${bookTitle}</td>
    <td>${bookAuthor}</td>
    <td>${bookPublisher}</td>
    `

//this allows us to add the new row (aka "tr" and the tds) into the existing table
outputArea.appendChild(newRow)

});
/*everything had to be INSIDE the eventListener 
    b/c without it, we are appending empty strings
    AKA we were submitting the form when there was nothing
    AKA the code was running right as the page loads which we do not want
*/

async function getBookData() {
    const url = ""
}



