import { IContentType } from "../interfaces/Interfaces";

export class ContentItemFilter {    
 
    private _title: string;
    private _contentType!: IContentType; 
    private _tags: string[];
    private _description: string;
    
    constructor() {
        this._title = "";
        this._contentType = IContentType.void;
        this._tags = [];
        this._description = "";
    }

    // Title
    set title(title: string) {
        this._title = title.toLocaleLowerCase();
    }

    get title() {
        return this._title
    }

    // ContentType
    set contentType(contentType: IContentType) {
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
        this._description = description.toLocaleLowerCase();
    }

    get description() {
        return this._description
    }

}




