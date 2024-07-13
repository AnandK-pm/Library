document.addEventListener("DOMContentLoaded", function() {
    const addbook = document.querySelector(".addbook");
    const dialog = document.querySelector("dialog");
    const close = document.querySelector(".close");
    const submit = document.querySelector("#submit");
    const bookcontainer = document.querySelector(".card-container")
    
    const myLibrary = [{title:"Harry Potter",author:"JK Rowling",year:1990,genre:"Fantasy",read:false},
                       {title:"Alchemist",author:"Paulo Coelho",year:2010,genre:"Adventure",read:false},
                       {title:"Game of Thrones",author:"George RR Martin",year:2000,genre:"Fantasy",read:false},
                       {title:"Song of Ice and Fire",author:"George RR Martin",year:1990,genre:"Fantasy",read:false},
                       {title:"Two States",author:"Chetan Bhagat",year:2010,genre:"Romance",read:false},
                       {title:"Harry Potter",author:"JK Rowling",year:1990,genre:"Fantasy",read:false}
    ];
    
    function reset() {
        const name_text = document.querySelector("#name");
        const author_text = document.querySelector("#author");
        const year_text = document.querySelector("#year");
        const genre_text = document.querySelector("#genre"); 
        
        name_text.value = '';
        author_text.value = '';
        year_text.value = '';
        genre_text.value = '';
    }
    
    function Book(title, author, year, genre) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
        this.read = false;
        
    }
    
    function addBookToLibrary() {
        const name_text = document.querySelector("#name");
        const author_text = document.querySelector("#author");
        const year_text = document.querySelector("#year");
        const genre_text = document.querySelector("#genre"); 

        const title = name_text.value;
        const author = author_text.value;
        const year = year_text.value;
        const genre = genre_text.value;

        if (title === '' || author === '') {
            alert('Please fill out all required fields.');
            return;
        }

        const book = new Book(title, author, year, genre); 
        myLibrary.push(book);
        displayBooks();
    }
    function displayBooks()
    {
        bookcontainer.innerHTML = '';
        myLibrary.forEach((book,index) => 
        {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");  
            if(book.read)
            {
                bookDiv.classList.add("read");
            }
            bookDiv.innerHTML = 
            `  <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Year: ${book.year}</p>
                <p>Genre: ${book.genre}</p>
                
            `;

            bookcontainer.appendChild(bookDiv);
            const removebtn = document.createElement("button");
            removebtn.classList.add("removebtn");
            removebtn.textContent = 'Remove';
            bookDiv.appendChild(removebtn);
            removebtn.addEventListener("click",(e)=>{
                myLibrary.splice(index,1)
                console.log(myLibrary);
                bookcontainer.removeChild(bookDiv);
                displayBooks();
            })

            const readbtn = document.createElement("button");
            readbtn.classList.add("readbtn");
            bookDiv.appendChild(readbtn);
            readbtn.textContent = book.read ? "Mark Unread" : "Mark Read";
            readbtn.addEventListener("click",()=>{
                if(book.read === false)
                {
                    readbtn.textContent = "mark unread"
                    bookDiv.classList.remove("book")
                    bookDiv.classList.add("read");
                    book.read= true;
                }
                else
                {
                    readbtn.textContent = "mark read";
                    bookDiv.classList.remove("read");
                    bookDiv.classList.add("book");
                    book.read = false;
                }
                
            })
            
        }
        )
    }
    
    addbook.addEventListener("click", () => {
        dialog.showModal();
    });
    
    close.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
    });
    
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        addBookToLibrary();
        dialog.close();
        console.log(myLibrary);
        reset();
    });
});
