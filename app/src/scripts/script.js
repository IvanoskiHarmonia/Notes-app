// As soon as the page is loaded get the notes list
window.onload = function() {
    console.log(window.location.origin + '/notes');
    getListNotes();
}



// Changing the mode theme mode
function changeThemeMode() {
    // console.log(document.getElementById("slider-mode").checked)
    if(document.getElementById("slider-mode").checked) {
        console.log(document.getElementById("slider-mode").checked)
        document.getElementsByTagName("main")[0].classList.remove("light-mode");
        document.getElementsByTagName("main")[0].classList.add("dark-mode");
    }
    else {
        document.getElementsByTagName("main").color = "black";
        document.getElementsByTagName("main")[0].classList.remove("dark-mode");
        document.getElementsByTagName("main")[0].classList.add("light-mode");
    }
}




function getListNotes() {
    const xh = new XMLHttpRequest();
    xh.open("GET", window.location.origin + '/getAllNotes', true);
    xh.send(null);

    xh.onload = function() {
        const data = JSON.parse(xh.responseText);
        console.log(data);
        console.log("This is the 0 object " + data[0].nid);
        if(data[0].nid == null) {
            console.log("No notes found");
        } else {
            console.log("Notes found");
        }

        // Generating the notes list
        noteLists(data);
    }
}



const noteListContainer = document.getElementById('note-list-container');


// Function that generates the notes list
function noteLists(data) {


    const noteList = data.map(note => {
        return `<li onclick="displayNote(this)">
                    <p id="note-lists-id">${note.nid}</p>
                    <h4 id="note-lists-title" title="${note.ntitle}">${note.ntitle}</h4>
                    <h5 id="note-lists-date" title="${note.ndate}">${note.ndate}</h5>
                    <div class="note-text">
                        <p id="note-lists-note" title="${note.ntext}">${note.ntext}</p>
                    </div>
                </li>`;
    }).join('');

    noteListContainer.innerHTML = noteList;
}





// get the clicked note to be displayed in the note-list-container
const noteID_note = document.getElementById('noteId');
const noteTitle_note = document.getElementById('noteTitle');
const noteTime_note = document.getElementById('noteTime');
const noteText_note = document.getElementById('noteText');

function displayNote(ele) {
    noteID_note.value = ele.children[0].innerHTML;
    noteTitle_note.value = ele.children[1].innerHTML;
    noteTime_note.value = ele.children[2].innerHTML;
    noteText_note.value = ele.children[3].children[0].innerHTML;

    if($(".btn-save").hasClass("disabled")) {
        $(".btn-save").removeClass("disabled");
        $(".btn-delete").removeClass("disabled");
    }
}


// when note is is empty then disable the save button
$("#noteTitle").on("change keyup paste click", function(){
    checkHeader();
})

// check if there is any text in the header if not then disable the save button
function checkHeader() {
    if($("#noteTitle").val() == "") {
            $(".btn-save").addClass("disabled");
            $(".btn-delete").addClass("disabled");
    }
    else {
        $(".btn-save").removeClass("disabled");
        if($("#noteId").val().length > 0) {
            $(".btn-delete").removeClass("disabled");
        }
    }
}







//  change action when certain button is clicked.
$(".btn-delete").click(function() {
    var text = "Are you sure you want to delete this note?";
    if (confirm(text)) {
        $(this).closest("form").attr("action", "/deleteNote");  // delete the note
        $(this).closest("form").submit();
    } else {
        return false;
    }
});

$(".btn-save").click(function() {
    $(this).closest("form").attr("action", "/saveNote");     
});




// Checking if any note is displayed in the note-list-container
function checkId(ele) {
    if (ele.children[0].innerHTML == "") {
        console.log(false);
    } else {
        console.log(true);
    }
}