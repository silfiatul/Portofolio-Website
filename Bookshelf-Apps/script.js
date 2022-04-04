const bookshelf = []; // menampung array dari object bookshelf
const RENDER_EVENT = "render-bookshelf";
const SAVED_EVENT = "saved-book"; // agar dapat memudahkan dalam mengetahui bahwa pada setiap perubahan data bisa secara sukses memperbarui data pada storage
const STORAGE_KEY = "BOOKSHELF_APPS";

// listener yang akan menjalankan kode ketika semua elemen HTML sudah dimuat menjadi DOM dengan baik
document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
    const inputSearchBookTitle =  document.getElementById("searchBook");
    const searchSubmitBookTitle =  document.getElementById("searchBook");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    inputSearchBookTitle.addEventListener("keyup", function (event){
        event.preventDefault();
        searchBook();
    });

    searchSubmitBookTitle.addEventListener("submit", function (event){
        event.preventDefault();
        searchBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

// Membuat Bookshelf
function addBook() {
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const checkIsComplete = document.getElementById("inputBookIsComplete").checked;

    const generatedID = generateId();
    const bookshelfObject = generateBookshelfObject(generatedID, title, author, year, checkIsComplete);
    bookshelf.push(bookshelfObject);
   
    const incompleteBOOKSHELFList = document.getElementById("incompleteBookshelfList");
    incompleteBOOKSHELFList.innerHTML = "";

    const completeBOOKSHELFList = document.getElementById("completeBookshelfList");
    completeBOOKSHELFList.innerHTML = "";

    if(checkIsComplete){
        completeBOOKSHELFList.append(bookshelfObject);
    }else{
        incompleteBOOKSHELFList.append(bookshelfObject);
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// membuat identitas unik pada setiap item book
function generateId() {
    return +new Date();
}

const checkbox = document.getElementById("inputBookIsComplete");
let check = false;

checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    check = true;
    document.querySelector("span").innerText = "Selesai dibaca";

  } else {
    check = false;
    document.querySelector("span").innerText = "Belum selesai dibaca";
  }
});

// membuat sebuah object di JavaScript dari data yang sudah disediakan dari inputan
function generateBookshelfObject(id, title, author, year, checkIsComplete) {
    return {
        id,
        title,
        author,
        year,
        checkIsComplete
    }
}

// event listener untuk menampilkan book yang tersimpan dalam array
document.addEventListener(RENDER_EVENT, function () {
    // console.log(bookshelf);
    const incompleteBOOKSHELFList = document.getElementById("incompleteBookshelfList");
    incompleteBOOKSHELFList.innerHTML = "";

    const completeBOOKSHELFList = document.getElementById("completeBookshelfList");
    completeBOOKSHELFList.innerHTML = "";
    
    for(BookshelfItem of bookshelf){
        const bookshelfElement = makeBookshelf(BookshelfItem);
        if(BookshelfItem.checkIsComplete){
            completeBOOKSHELFList.append(bookshelfElement);
        }else{
            incompleteBOOKSHELFList.append(bookshelfElement);
        }
    }
});

// Ekstrak data yang ditampilkan
function makeBookshelf(bookshelfObject) {
 
    const textTitle = document.createElement("h2");
    textTitle.innerText = bookshelfObject.title;
  
    const textAuthor = document.createElement("h4");
    textAuthor.innerText = "Penulis: " + bookshelfObject.author;

    const textYear = document.createElement("p");
    textYear.innerText = "Tahun Terbit: " + bookshelfObject.year;
  
    const textContainer = document.createElement("section");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuthor, textYear);
  
    const container = document.createElement("section");
    container.classList.add("item", "shadow")
    container.append(textContainer);
    container.setAttribute("id", `bookshelf-${bookshelfObject.id}`); // konfigurasi id
    
    const buttonContainer =  document.createElement("section");
    buttonContainer.classList.add("action");
  
    if(bookshelfObject.checkIsComplete){
        const undoButton = document.createElement("button");
        undoButton.classList.add("blue");
        undoButton.innerText = "Belum selesai dibaca";
        undoButton.addEventListener("click", function () {
            undoBookFromComplete(bookshelfObject.id);
        });
   
        const trashButton = document.createElement("button");
        trashButton.classList.add("red");
        trashButton.innerText = "Hapus buku";
        trashButton.addEventListener("click", function () {
            removeBookFromComplete(bookshelfObject.id);
        });

        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement("button");
        checkButton.classList.add("blue");
        checkButton.innerText = "Selesai dibaca";
        checkButton.addEventListener("click", function () {
            addBookToComplete(bookshelfObject.id);
        });

        const trashButton = document.createElement("button");
        trashButton.classList.add("red");
        trashButton.innerText = "Hapus buku";
        trashButton.addEventListener("click", function () {
            removeBookFromComplete(bookshelfObject.id);
        });
   
        container.append(checkButton, trashButton);
    }

    return container;
}

// fungsi check button untuk memindahkan dari rak yang selesai dibaca ke rak yang belum selesai dibaca
function addBookToComplete(bookId) {
    const bookTarget = findBook(bookId);
    if(bookTarget == null) return;
  
    bookTarget.checkIsComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// fungsi mencari buku sesuai dengan ID pada array
function findBook(bookId){
    for(bookItem of bookshelf){
        if(bookItem.id === bookId){
            return bookItem
        }
    }
    return null
}

// fungsi menghapus buku dari bookshelf 
function removeBookFromComplete(bookId) {
    const remove = window.confirm("Apakah anda yakin ingin menghapus buku ini?");
    if(remove){
        const bookTarget = findBookIndex(bookId);
        if(bookTarget === -1) return;
        bookshelf.splice(bookTarget, 1);
    
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
        alert("Buku berhasil dihapus");
    }else {
        alert("Buku gagal dihapus");
    }

}

// fungsi untuk mengimplementasikan findTodoIndex() yang berfungsi mencari buku berdasarkan index
function findBookIndex(bookId) {
    for(index in bookshelf){
        if(bookshelf[index].id === bookId){
            return index
        }
    }
    return -1
}
   
// fungsi untuk memindah kan buku ke rak yang belum selesai dibaca 
function undoBookFromComplete(bookId){
    const incompleteBOOKSHELFList = document.getElementById("incompleteBookshelfList");
    const bookTarget = findBook(bookId);
    if(bookTarget == null) return;
   
    bookTarget.checkIsComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// fungsi search
function searchBook() {
    const searchBookTitle = document.getElementById("searchBookTitle");
    const filter = searchBookTitle.value.toUpperCase();
    const bookItem = document.querySelectorAll("section.book_shelf > .book_list > .item");
    for (let i = 0; i < bookItem.length; i++) {
        txtValue = bookItem[i].textContent || bookItem[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            bookItem[i].style.display = "";
        } else {
            bookItem[i].style.display = "none";
        }
    }
}

// fungsi untuk menyimpan data dan perubahan pada storage secara langsung
function saveData() {
    if(isStorageExist()){
        const parsed = JSON.stringify(bookshelf);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
} 

// fungsi untuk mengecek type storage
function isStorageExist() /* boolean */ {
  if(typeof(Storage) === undefined){
      alert("Browser kamu tidak mendukung local storage");
      return false
  }
  return true;
}

// mengambil data dari local storage
document.addEventListener(SAVED_EVENT, function() {
    console.log(localStorage.getItem(STORAGE_KEY));
});

// fungsi untuk memuat data ketika Bookshelf apps dibuka
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
   
    let data = JSON.parse(serializedData);
   
    if(data !== null){
        for(book of data){
            bookshelf.push(book);
        }
    }
   
    document.dispatchEvent(new Event(RENDER_EVENT));
}