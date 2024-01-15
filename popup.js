document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('note-input');
    const saveButton = document.getElementById('save-button');
    const savedNotesContainer = document.getElementById('saved-notes');

    saveButton.addEventListener('click', function () {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            saveNote(noteText);
            noteInput.value = '';
        }
    });

    // Load existing notes on popup open
    loadNotes();

    // Function to save a note
    function saveNote(note) {
        chrome.storage.sync.get({ notes: [] }, function (data) {
            const notes = data.notes;
            notes.push(note);
            chrome.storage.sync.set({ notes: notes }, function () {
                loadNotes();
            });
        });
    }

    // Function to load saved notes
    function loadNotes() {
        chrome.storage.sync.get({ notes: [] }, function (data) {
            const notes = data.notes;
            savedNotesContainer.innerHTML = '';
            notes.forEach(function (note) {
                const noteElement = document.createElement('div');
                noteElement.className = 'saved-note';
                noteElement.textContent = note;
                savedNotesContainer.appendChild(noteElement);
            });
        });
    }
});
