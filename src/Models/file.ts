export interface Archive {
    archiveNo: string,
    client: string,
    filesArray: Array<File>
}

interface File {
    archive: string,
    bucketURL: string,
    uploadedDate: Date,
    client: string
}