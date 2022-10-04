
export class ContentItem {
    private _title: string;
    private _contentType: string; 
    private _tags: string[];
    private _description: string;
    
    constructor() {
        this._title = "";
        this._contentType = "";
        this._tags = [];
        this._description = "";
    }

    // Title
    set title(title: string) {
        this._title = title;
    }

    get title() {
        return this._title
    }

    // ContentType
    set contentType(contentType: string) {
        this._contentType = contentType;
    }

    get contentType() {
        return this._contentType
    }

    // Tags
    set tags(tags: string[]) {
        this._tags = tags;
    }

    get tags() {
        return this._tags   
    }

    // Description
    set description(description: string) {
        this._description = description;
    }

    get description() {
        return this._description
    }
}

// private _title: string;
//     private _duration: number; 
//     private _tags: string[];

//     constructor( title: string, duration: number) {
//         this._title = title;
//         this._duration = duration
//         this._tags = new Array<string>;
//      }

//     get contentDetails(): string {
//         return `El titulo es ${this._title} y tiene una duracion de ${this._duration}`
//     }
    
//     set setTags(tag: string) {
//         if (this._tags.length >= 2) {
//             throw new Error('Max number of tags is 2');
//         }
//         this._tags.push(tag)
//     }

//     get getTags(): Array<string>{
//         return this._tags
//     }
