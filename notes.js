const fs = require('fs');
const chalk = require('chalk');

// add note function, takes the title and body of the note
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => {
    return note.title === title;
  });
  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen('New note added.'));
  } else {
    console.log(chalk.bgRed('Note title taken.'));
  }
};

// load notes function loads notes from notes.json
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (e) {
    return [];
  }
};

// save notes function saves notes to notes.json
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

// remove note function takes the title of the node and remove it.
const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  if (newNotes.length === notes.length) {
    console.log(chalk.bgRed('There is no Note with this title.'));
  } else {
    saveNotes(newNotes);
    console.log(chalk.bgGreen('Note removed.'));
  }
};

// list notes function lists all the notes
const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((note, i) => displayNote(note, i));
};

// read note function takes a title and return its note
const readNote = (title) => {
  const notes = loadNotes();
  const wantedNote = notes.find((note) => note.title === title);
  wantedNote
    ? displayNote(wantedNote, 'F')
    : console.log(chalk.bgRed('There is no Note with this title.'));
};

// display note function displays a note in a cool pattern
const displayNote = (note, i) => {
  i !== 'F' ? console.log(chalk.blue(`Note ${i + 1}: `)) : 0;
  console.log(chalk.green(`   ${note.title}`));
  console.log(chalk.green(`       ${note.body}`));
};

// export our functions
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
