export class CustomLogger{
    constructor() { }
    
    logInfo(message : string) {
        console.info(message)
    }

    logDebug(message: string) {
        console.debug(message)
    }

    logError(message: string , error: Error) {
        console.error(message , error)
    }
}