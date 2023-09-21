//@ts-nocheck
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, Firestore, CollectionReference, QuerySnapshot } from "firebase/firestore";
import { app } from '../firebase.ts'
import { Demanda, Registro } from "../Models/file";

const db: Firestore = getFirestore(app)
const archivesCollection: CollectionReference = collection(db, "archives")
//const registroCollection: CollectionReference = collection(db, "archives/registro")

export const addArchive = async (archive: Demanda) => {
    try {
        await addDoc(collection(db, "archives"), archive)
        return true
      } catch (e) {
        console.error("Error adding document: ", e);
        return false
      }
}
export const addRegistroToEvidence = async ( no_exp: string, registroFile: Registro) => {
    try {
        const demanda = await getDoc(doc(archivesCollection, no_exp))
        console.log(demanda.data())
        const oldRegistro = demanda.data().registro
        const demandaActualizada = { ...demanda.data(), registro: [...oldRegistro, registroFile] }
        console.log(demandaActualizada)
        await updateDoc( doc(archivesCollection, no_exp), demandaActualizada);

        return true
      } catch (e) {
        console.error("Error adding regitro: ", e);
        return false
      }
}

export const getArchives = async () => {
    try {
        const archives: QuerySnapshot = await getDocs(archivesCollection)
        return archives.docs
    } catch (error) {
        console.error("Error getting archives: ", error);
    }
}

export const getArchive = async (id) => {
    try {
        const archive = await getDoc(doc(archivesCollection, id))
        return archive.data()
    } catch (error) {
        console.error("cannot retrieve: ", error)
    }
}

export const updateArchive = async (id, archive) => {
    try {
        await updateDoc( doc(archivesCollection, id), archive);
        return true
    } catch (error) {
        console.error("failed delete: ", error)
        return false
    }
}

export const deleteArchive = async (id) => {
    try {
        await deleteDoc( doc(archivesCollection, id));
        return true
    } catch (error) {
        console.error("failed delete: ", error)
        return false
    }
}