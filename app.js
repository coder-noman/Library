// get founded book
const foundedBook = document.getElementById('founded-books');
//  get book items
const bookDiv = document.getElementById('book-items');

// load data function
const loadData = () => {
    // clear book div
    bookDiv.innerHTML = "";
    // clear founded book
    foundedBook.innerHTML = "";
    // get input value
    const input = document.getElementById('input-value');
    const inputValue = input.value;
    //check input value
    if (inputValue.length > 0) {
        document.getElementById("error-message").innerHTML = "";
        // clear input value
        input.value = "";
        //start spinner
        document.getElementById("spinner").classList.remove("d-none");
        // fetching url
        const url = `HTTPS://openlibrary.org/search.json?q=${inputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.docs))
    } else {
        // show error
        document.getElementById("error-message").innerHTML =
            "<h4 class='text-center p-2 bg-danger mt-3 text-white'>Please enter a Book name...</h4>";
    }

}
// display data function
const displayData = data => {
    // stop spinner
    document.getElementById("spinner").classList.add("d-none");
    // book cover and author check
    const newArray = data.filter(book => book.cover_i !== undefined && book.author_name !== undefined);
    // founded book value
    foundedBook.innerText = newArray.length;
    // creating book div
    newArray.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
       <div class="card">
      <img width="80" height="300px" src="HTTPS://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
      <div class="card-body ">
        <h4 class="card-title text-center">${book.title}</h4>
        <p class="card-text"><b>Author :</b> ${book.author_name}</p>
        <p><b>Publisher :</b> ${book.publisher}</p>
        <h6>First Publish : ${book.first_publish_year}</h6>
      </div>
       `
        bookDiv.appendChild(div);
    });
}
