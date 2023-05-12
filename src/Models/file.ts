export interface Archive {
    archiveNo: string,
    client: string,
    evidence: string,
    totalEvidence: number,
    lastUpdated: Date
    //filesArray: Array<File> | undefined
}

interface File {
    archive: string,
    client: string,
    fileName: string,
    bucketURL: string,
    uploadedDate: Date,
}