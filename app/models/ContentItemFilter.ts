export class ContentItemFilter {
   
    // To - DO Agregar Content Type & Descripcion // Quitar duration.

    // To - Do Quitar uppercase en los set.

    // To - DO agregar los get a cada atributo.
    
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




