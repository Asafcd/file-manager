//@ts-nocheck
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, Firestore, CollectionReference, QuerySnapshot } from "firebase/firestore";
import { app } from '../firebase.ts'
import { Archive } from "../Models/file";

const db: Firestore = getFirestore(app)
const archivesCollection: CollectionReference = collection(db, "archives")

export const addArchive = async (archive: Archive) => {
    try {
        await addDoc(collection(db, "archives"), archive)
        return true
      } catch (e) {
        console.error("Error adding document: ", e);
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
        await deleteDoc( doc(archivesCollection, "DC"));
        return true
    } catch (error) {
        console.error("failed delete: ", error)
        return false
    }
}