import {
  getNoteIndexedDB,
  addNoteIndexedDB,
  setNoteIndexedDB,
} from "./IndexedDB";
import { getNoteClound, insertNoteClound, setNoteClound } from "./Worker";

export async function syncCloundToIndexedDB(idUser, token) {
  let allNoteClound = await getNoteClound(token);
  allNoteClound = allNoteClound.res.note.results;
  let allNoteIndexedDB = await getNoteIndexedDB(idUser);
  console.log("teste", allNoteClound.length);
  let sizeClound = allNoteClound.length;
  let sizeIndexedDB = allNoteIndexedDB.length;
  let findNoteId;
  for (let i = 0; i < sizeClound; i++) {
    let noteIdClound = allNoteClound[i].noteId;
    let usersIdClound = allNoteClound[i].usersId;
    let titleClound = allNoteClound[i].title;
    let descriptionClound = allNoteClound[i].description;
    let lastUpdateClound = allNoteClound[i].lastUpdate;
    let deletedClound = allNoteClound[i].deleted;

    if (sizeClound > 0 && sizeIndexedDB > 0) {
      for (let i = 0; i < sizeIndexedDB; i++) {
        try {
          findNoteId = allNoteIndexedDB.find(
            (Element) => Element.noteId == noteIdClound
          );
        } catch (error) {
          findNoteId = "error500";
        }
        if (findNoteId != undefined) {
          let lastUpdateLocal = findNoteId.lastUpdate;
          let noteIdLocal = findNoteId.id;
          if (lastUpdateClound > lastUpdateLocal) {
            //const noteIdLocal = allNoteIndexedDB.find(Element => Element.noteId == noteIdClound).id
            await setNoteIndexedDB(
              noteIdLocal,
              noteIdClound,
              usersIdClound,
              titleClound,
              descriptionClound,
              lastUpdateClound,
              deletedClound
            );
            //this.allNoteIndexedDB = await getNoteIndexedDB(this.idUser);
          }
        } else {
          await addNoteIndexedDB(
            noteIdClound,
            usersIdClound,
            titleClound,
            descriptionClound,
            lastUpdateClound,
            deletedClound
          );
          break;
        }
      }
    } else if (sizeClound > 0 && sizeIndexedDB == 0) {
      for (let i = 0; i < sizeClound; i++) {
        noteIdClound = allNoteClound[i].noteId;
        usersIdClound = allNoteClound[i].usersId;
        titleClound = allNoteClound[i].title;
        descriptionClound = allNoteClound[i].description;
        lastUpdateClound = allNoteClound[i].lastUpdate;
        deletedClound = allNoteClound[i].deleted;
        await addNoteIndexedDB(
          noteIdClound,
          usersIdClound,
          titleClound,
          descriptionClound,
          lastUpdateClound,
          deletedClound
        );
      }
      // allNoteIndexedDB = await getNoteIndexedDB(idUser);
      // sizeLocal = allNoteIndexedDB.length;
      break;
    }
  }
}

export async function syncIndexedDBToClound(idUser, token) {
  let allNoteClound = await getNoteClound(token);
  allNoteClound = allNoteClound.res.note.results;
  let allNoteIndexedDB = await getNoteIndexedDB(idUser);
  console.log("teste", allNoteClound.length);
  let sizeClound = allNoteClound.length;
  let sizeIndexedDB = allNoteIndexedDB.length;
  let findNoteId;

  for (let i = 0; i < sizeIndexedDB; i++) {
    let idIndexedDB = allNoteIndexedDB[i].id
    let noteIdIndexedDB = allNoteIndexedDB[i].noteId;
    let usersIdIndexedDB = allNoteIndexedDB[i].usersId;
    let titleIndexedDB = allNoteIndexedDB[i].title;
    let descriptionIndexedDB = allNoteIndexedDB[i].description;
    let lastUpdateIndexedDB = allNoteIndexedDB[i].lastUpdate;
    let deletedIndexedDB = allNoteIndexedDB[i].deleted;

    if (sizeIndexedDB  > 0 && sizeClound > 0) {
      for (let i = 0; i < sizeClound; i++) {
        try {
          findNoteId = allNoteClound.find(
            (Element) => Element.noteId == noteIdIndexedDB
          );
        } catch (error) {
          findNoteId = "error500";
        }
        if (findNoteId != undefined) {
          let lastUpdateClound = findNoteId.lastUpdate;
          let noteIdClound = findNoteId.noteId;
          if (lastUpdateIndexedDB > lastUpdateClound) {
            //const noteIdLocal = allNoteIndexedDB.find(Element => Element.noteId == noteIdClound).id
            await setNoteClound(
              idIndexedDB,
              noteIdClound,
              idUser,
              titleIndexedDB,
              descriptionIndexedDB,
              deletedIndexedDB,
              token,
            );
            //this.allNoteIndexedDB = await getNoteIndexedDB(this.idUser);
          }
        } else {
          await insertNoteClound(
            titleIndexedDB,
            descriptionIndexedDB,
            token
          );
          i = sizeClound;
        }
      }
    } else if (sizeIndexedDB  > 0 && sizeClound == 0) {
      for (let i = 0; i < sizeClound; i++) {
        noteIdIndexedDB = allNoteIndexedDB[i].noteId;
        usersIdIndexedDB = allNoteIndexedDB[i].usersId;
        titleIndexedDB = allNoteIndexedDB[i].title;
        descriptionIndexedDB = allNoteIndexedDB[i].description;
        lastUpdateIndexedDB = allNoteIndexedDB[i].lastUpdate;
        deletedIndexedDB = allNoteIndexedDB[i].deleted;

        const noteInserted = await insertNoteClound(
          // noteIdIndexedDB,
          // usersIdIndexedDB,
          titleIndexedDB,
          descriptionIndexedDB,
          token
          // lastUpdateIndexedDB,
          // deletedIndexedDB
        );

        const lastUpdateClound = noteInserted.result.res.lastNote.lastUpdate
        console.log("lastUpdateClound",lastUpdateClound)

        await setNoteIndexedDB(idIndexedDB,noteIdIndexedDB,idUser,titleIndexedDB,descriptionIndexedDB,lastUpdateClound,deletedIndexedDB)

      }
      // allNoteIndexedDB = await getNoteIndexedDB(idUser);
      // sizeLocal = allNoteIndexedDB.length;
      break;
    }
  }
}
