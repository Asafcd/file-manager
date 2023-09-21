//@ts-ignore
import { storage } from "./firebase.ts";
import { listAll, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const storageRef = ref(storage)

export const getFile = async () => {
    try {
        const file = await listAll(storageRef)
        return file
    } catch (error) {
        console.log(error)
        return []
    }
}

export const uploadFile = async (id: string, file: File) => {
    try {
        const fileRef = ref(storage, 'demanda/' + id + '/' + file.name)
        /* const metadata = {
            contentType: 'image/jpeg',
        }; */
          
        await uploadBytes(fileRef, file/*, metadata */);
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
export const uploadFileRegistro = async (id: string, file: File) => {
    try {
        const fileRef = ref(storage, 'demanda/' + id + '/registro/' + file.name)
        /* const metadata = {
            contentType: 'image/jpeg',
        }; */
          
        await uploadBytes(fileRef, file/*, metadata */);
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const downloadFile = async (id: string, file: string) => {
    try {
        const fileRef = ref(storage, 'demanda/' + id + '/' + file)
        console.log(fileRef)
        const url = await getDownloadURL(fileRef)
        return url
    } catch (error) {
        console.log(error)
        return ''
    }
}

export const deleteFile = async (id: string, file: string) => {
    try {
        const fileRef = ref(storage, 'demanda/' + id + '/' + file)
        await deleteObject(fileRef)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

// This can be downloaded directly:
/* var xhr = new XMLHttpRequest();
xhr.responseType = 'blob';
xhr.onload = (event) => {
  var blob = xhr.response;
};
xhr.open('GET', url);
xhr.send(); */