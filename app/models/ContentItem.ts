import { IContentType } from "../interfaces/Interfaces";

export class ContentItem {
    
    private _title: string;
    private _contentType: IContentType; 
    private _tags: string[];
    private _description: string;
    
    // Finish : Convertir el contentType a enum.
    constructor(title: string = "", contentType: IContentType = IContentType.video, tags: Array<string> = [], description: string = "" ) {
        this._title = title;
        this._contentType = contentType; 
        this._tags = tags;
        this._description = description;
    }

    // Title
    set title(title: string) {
        this._title = title;
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
    
    // Finish:: add tag. Agregar solo 1 tag. Si existe, no lo agrega.
    addTag(tag: string) {

        if (this._tags.toString().includes(tag)) {
            console.log("Ya existe esta etiqueta")
            return
        } else {
            this._tags.push(tag);
        }
        
        console.log(this._tags)
    }
    
    // Finish: Remove tag
    removeTag(tag: string) {
        var index = this._tags.indexOf(tag);
        this._tags.splice(index, 1);
        
        console.log(this._tags)
    }

    // Finish:: 1) ContainsTag 2) Case sensitive
    containTag(tagArr: string[]) : Boolean {
        
      let response = findCommonElement(tagArr, this._tags)
       
        function findCommonElement(array1: string[], array2: string[]) {
            // Loop for array1
            for(let i = 0; i < array1.length; i++) {
                
                // Loop for array2
                for(let j = 0; j < array2.length; j++) {
                    if(array1[i].toLowerCase() === array2[j].toLowerCase()) {
                        return true;
                    }
                }
            }
            // Return if no common element exist
            return false;
        }
        return response
    }

    // Description
    set description(description: string) {
        this._description = description;
    }

    get description() {
        return this._description
    }
};
