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
            await setNoteIndexedDB(
              noteIdLocal,
              noteIdClound,
              usersIdClound,
              titleClound,
              descriptionClound,
              lastUpdateClound,
              deletedClound
            );
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
      break;
    }
  }
}

export async function syncIndexedDBToClound(idUser, token) {
  let allNoteClound = await getNoteClound(token);
  allNoteClound = allNoteClound.res.note.results;
  let allNoteIndexedDB = await getNoteIndexedDB(idUser);
  let sizeClound = allNoteClound.length;
  let sizeIndexedDB = allNoteIndexedDB.length;
  let findNoteId;
  let noteInsertedClound;
  let noteSetedClound;
  let idNoteInsertedClound;

  if (sizeIndexedDB > 0) {
    for (let i = 0; i < sizeIndexedDB; i++) {
      let idIndexedDB = allNoteIndexedDB[i].id;
      let noteIdIndexedDB = allNoteIndexedDB[i].noteId;
      let usersIdIndexedDB = allNoteIndexedDB[i].usersId;
      let titleIndexedDB = allNoteIndexedDB[i].title;
      let descriptionIndexedDB = allNoteIndexedDB[i].description;
      let lastUpdateIndexedDB = allNoteIndexedDB[i].lastUpdate;
      let deletedIndexedDB = allNoteIndexedDB[i].deleted;

      if (sizeClound > 0) {
        if (noteIdIndexedDB === null) {
          noteInsertedClound = await insertNoteClound(
            titleIndexedDB,
            descriptionIndexedDB,
            token
          );

          const lastUpdateInsertedNoteClound =
            noteInsertedClound.res.lastNote.results[0].lastUpdate;
          idNoteInsertedClound =
            noteInsertedClound.res.lastNote.results[0].noteId;


          await setNoteIndexedDB(
            idIndexedDB,
            idNoteInsertedClound,
            idUser,
            titleIndexedDB,
            descriptionIndexedDB,
            lastUpdateInsertedNoteClound,
            deletedIndexedDB
          );
          if (deletedIndexedDB != null) {
            const deleted = "deleted";
            noteSetedClound = await setNoteClound(
              idNoteInsertedClound,
              titleIndexedDB,
              descriptionIndexedDB,
              deleted,
              token
            );
  
            const lastUpdateSetedNoteClound =
            noteSetedClound.res.lastNote.results[0].lastUpdate;
            const idNoteSetedClound =
            noteSetedClound.res.lastNote.results[0].noteId;
            const deletedSetedNoteClound = noteSetedClound.res.lastNote.results[0].deleted;
  
            await setNoteIndexedDB(
              idIndexedDB,
              idNoteSetedClound,
              idUser,
              titleIndexedDB,
              descriptionIndexedDB,
              lastUpdateSetedNoteClound,
              deletedSetedNoteClound
            );
          }
        } else {
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
              await setNoteClound(
                noteIdClound,
                titleIndexedDB,
                descriptionIndexedDB,
                deletedIndexedDB,
                token
              );
            }
          }
        }
      } else if (sizeClound == 0) {
        for (let i = 0; i < sizeIndexedDB; i++) {
          noteIdIndexedDB = allNoteIndexedDB[i].noteId;
          usersIdIndexedDB = allNoteIndexedDB[i].usersId;
          titleIndexedDB = allNoteIndexedDB[i].title;
          descriptionIndexedDB = allNoteIndexedDB[i].description;
          lastUpdateIndexedDB = allNoteIndexedDB[i].lastUpdate;
          deletedIndexedDB = allNoteIndexedDB[i].deleted;

          noteInsertedClound = await insertNoteClound(
            titleIndexedDB,
            descriptionIndexedDB,
            token,
            deletedIndexedDB
          );
          const lastUpdateInsertedNoteClound =
            noteInsertedClound.res.lastNote.results[0].lastUpdate;
          const idNoteInsertedClound =
            noteInsertedClound.res.lastNote.results[0].noteId;

          await setNoteIndexedDB(
            idIndexedDB,
            idNoteInsertedClound,
            idUser,
            titleIndexedDB,
            descriptionIndexedDB,
            lastUpdateInsertedNoteClound,
            deletedIndexedDB
          );
        }
      }
    }
  }
}
