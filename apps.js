document.addEventListener("DOMContentLoaded", () => {
    fetch('https://bookstore-api-six.vercel.app/api/books').then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch book data");
        } return response.json(); 
    }).then(data => {
        const outputArea = document.getElementById("output_Area");
        //
        data.forEach(book => {
            const newRow = document.createElement("tr");
        
            newRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publisher || "NA"}</td>
            `; 

            //this allows us to add the new row (aka "tr" and the tds) into the existing table at the end 
            outputArea.appendChild(newRow); 
        }); 
    }).catch(error => {
        console.error("Error loading books:", error)
    });
});


document.getElementById("bookForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const bookTitle = document.getElementById("Book_Title").value; 
    const bookAuthor = document.getElementById("Book_Author").value;
    const bookPublisher = document.getElementById("Book_Publisher").value;

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.publisher || "NA"}</td>
        `; 

    outputArea.appendChild(newRow); 

    document.getElementById("bookForm").reset() //clear the form after submission 

})

/*everything had to be INSIDE the eventListener 
    b/c without it, we are appending empty strings
    AKA we were submitting the form when there was nothing
    AKA the code was running right as the page loads which we do not want
*/

/*testing to see if the branch was created*/

