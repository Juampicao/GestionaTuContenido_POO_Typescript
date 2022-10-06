import { IContentType } from "../../app/interfaces/Interfaces";
import { ContentItem } from "../../app/models/ContentItem";

export class CrearDosItems {

    private _contentItems: Array<ContentItem>;
    private _contenido1!: ContentItem;
    private _contenido2: ContentItem; 

    constructor() {

        this._contentItems = [];

        this._contenido1 = new ContentItem("Aprendiendo Angular", IContentType.video, ["Angular", "Typescript"], "Convierte angular de 0 a 1000");
        
        this._contenido2 = new ContentItem("React", IContentType.article, ["React", "Javascript"], "Convierte en un experto de react");
    }


    get contenido1() {
        return this._contenido1
    }

    get contenido2() {
        return this._contenido2;
    }


    obtenerContentItemsList2ContentItems() {
        this._contentItems.push(this.contenido1, this._contenido2)
        return this._contentItems
    }

    // Obtener solo 1 contentItem
    obtener1ContentItem() {
        return this._contenido1;
       
    }
     
   
}