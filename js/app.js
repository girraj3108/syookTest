showNotesList();
let title = document.getElementById("addTitle");
let description = document.getElementById("addDescription");

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addNotes)

let isDuplicateTitle = false;


/**
 * function to add a note to the local storage
 */
function addNotes() {

    let singleNote = {
        title: title.value,
        description: description.value
    }

    let notes = localStorage.getItem("notes");

    /**
     * validation if fields are not empty
     */
    if (title.value === "" || description.value === "") {
        return alert("Please fill the title and description")
    }

    if (notes == null) {
        notesList = [];
    } else {
        notesList = JSON.parse(notes);
    }

    /**
     * validation for duplicate title
     */
    const titles = notesList.map(notes => notes.title);
    titles.map(notetitle => {
        if (notetitle === title.value) {
            isDuplicateTitle = true;
            return alert("duplicate title not allowed");
        } else {
            return "";
        }
    })

    if (!isDuplicateTitle) {
        notesList.push(singleNote)
        localStorage.setItem("notes", JSON.stringify(notesList));
        title.value = "";
        description.value = "";
    }
    showNotesList();
}

/**
 * function to show the Notes List  from LocalStorage
 */
function showNotesList() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesList = [];
    } else {
        notesList = JSON.parse(notes);
    }

    let html = "";
    notesList.forEach(function (element, index) {
        html += `
        <div class="card-wrapper">
                <div class="card-content-wrapper">
                    <div class="card-title">${element.title}</div>
                    <div class="card-description">${element.description}</div>
                </div>
               <div class="button-wrapper">
               <button id="${index}" class="card-btn" onClick="deleteNote(this.id)">delete</button>
               <button id="${index}" class="card-btn edit-btn"  onClick="editNote(this.id)">Edit</button>
               </div>
        </div>
        `
    })

    let notesElem = document.getElementById("notes");
    if (notesList.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `No notes here .... please add some to see here!`
    }
}

/**
 * function to delete a Note
 */
function deleteNote(index) {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesList = [];
    } else {
        notesList = JSON.parse(notes);
    }

    notesList.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesList));
    showNotesList();
}

let noteSearch = document.getElementById("noteSearch");
noteSearch.addEventListener("input", searchNotes)

/**
 * function to edit the note
 */
function editNote(index) {
    let addBtn = document.getElementById("addBtn");
    let editBtn = document.getElementById("editBtn");
    let saveIndex = document.getElementById("saveIndex");
    saveIndex.value = index;

    let notes = localStorage.getItem("notes");
    notesList = JSON.parse(notes);

    title.value = notesList[index].title;
    description.value = notesList[index].description;

    addBtn.style.display = "none";
    editBtn.style.display = "block";

    editBtn.addEventListener("click", function () {
        notesList[saveIndex.value] = {
            title: title.value,
            description: description.value
        }

        /**
         * validation if fields are not empty
         */
        if (title.value === "" || description.value === "") {
            return alert("Please fill the title and description")
        }

        addBtn.style.display = "block";
        editBtn.style.display = "none";
        localStorage.setItem("notes", JSON.stringify(notesList));
        title.value = "";
        description.value = "";
    })
}

/**
 * function to search the note
 */
function searchNotes() {
    let searchBoxValue = noteSearch.value.toLowerCase();

    let cardNotes = document.getElementsByClassName("card-wrapper");
    Array.from(cardNotes).forEach((card) => {
        let cardTitle = card.getElementsByTagName("p")[0].innerText;
        let cardDescription = card.getElementsByTagName("p")[1].innerText;
        if (cardTitle.includes(searchBoxValue) || cardDescription.includes(searchBoxValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    })
}