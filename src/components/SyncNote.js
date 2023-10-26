import { getNoteIndexedDB } from "./IndexedDB";

export async function syncCloundToIndexedDB(resultCloundLogin) {
    console.log(resultCloundLogin)
    const noteClound = resultCloundLogin.note;
    const idUser = resultCloundLogin.idUser;
  const noteIndexedDB = await getNoteIndexedDB(idUser);

  let sizeIndexedDB = this.sizeIndexedDB.length;
  const sizeClound = noteClound.results.length;
  
  for (let i = 0; i < sizeClound; i++) {
    noteIdClound = noteClound.results[i].noteId;
    usersIdClound = noteClound.results[i].usersId;
    titleClound = noteClound.results[i].title;
    descriptionClound = noteClound.results[i].description;
    lastUpdateclound = noteClound.results[i].lastUpdate;
    deletedClound = noteClound.results[i].deleted;

    //console.log("lastUpdateclound", lastUpdateclound)
    if (sizeClound > 0 && sizeIndexedDB > 0) {
      for (let i = 0; i < sizeIndexedDB; i++) {
        try {
          lastUpdateLocal = this.sizeIndexedDB.find(
            (Element) => Element.noteId == noteIdClound
          ).lastUpdate;

          if (lastUpdateclound > lastUpdateLocal) {
            noteIdLocal = this.sizeIndexedDB.find(
              (Element) => Element.noteId == noteIdClound
            ).id;
            await setNote(
              noteIdLocal,
              noteIdClound,
              usersIdClound,
              titleClound,
              descriptionClound,
              lastUpdateclound,
              deletedClound
            );
            this.allNote = await getNoteIndexedDB(this.idUser);
          }
          if (lastUpdateclound < lastUpdateLocal) {
            //await insertNote(title, description, token, id)
            //avaliar se é necessário criar ele aqui
          }
        } catch (error) {
          await addNote(
            noteIdClound,
            usersIdClound,
            titleClound,
            descriptionClound,
            lastUpdateclound,
            deletedClound
          );
          this.allNote = await getNoteIndexedDB(this.idUser);
          break;
        }
      }
    } else if (sizeClound > 0 && sizeIndexedDB == 0) {
      for (let i = 0; i < sizeClound; i++) {
        noteIdClound = noteClound.results[i].noteId;
        usersIdClound = noteClound.results[i].usersId;
        titleClound = noteClound.results[i].title;
        descriptionClound = noteClound.results[i].description;
        lastUpdateclound = noteClound.results[i].lastUpdate;
        deletedClound = noteClound.results[i].deleted;
        await addNote(
          noteIdClound,
          usersIdClound,
          titleClound,
          descriptionClound,
          lastUpdateclound,
          deletedClound
        );
      }

      this.allNote = await getNoteIndexedDB(this.idUser);
      sizeIndexedDB = this.sizeIndexedDB.length;
      break;
    }
  }
}
