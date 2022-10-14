export class CustomMessage {
    constructor() { }
    
    message(message: string) {
        return `CustomMessage: ${message}`;
    }

    error(message: string) {
        return `CustomMessage: ${message}`
    }
}

