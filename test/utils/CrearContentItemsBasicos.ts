import { IContentItemRating } from "../../app/interfaces/IContentItemRating";
import { IContentType } from "../../app/interfaces/IContentType";
import { ContentItem } from "../../app/models/ContentItem";
import { Duration } from "../../app/models/Duration";


// Todo. Crear varios metodos. crear2Items, crear3Items. Todos mismo lugar. No varios servicios. Inicializar en el construcotr. 
export class CrearContentItemsBasicos {

    private _contentItems: Array<ContentItem>;
    private _contenido1: ContentItem;
    private _contenido2: ContentItem; 
    private _contenido3: ContentItem; 
    private _contenido4: ContentItem; 
    private _contenido5: ContentItem; 
    private _contenido6: ContentItem;
    private _contenido7: ContentItem
    

    constructor() {

        this._contentItems = [];
            this._contenido1 = new ContentItem("Angular", "1 Aprendiendo Angular", IContentType.Video);
            this._contenido2 = new ContentItem("Angular", "2 Aprendiendo Angular", IContentType.Video);
            this._contenido3 = new ContentItem("Angular", "3 Aprendiendo Angular", IContentType.Video);
            this._contenido4 = new ContentItem("Angular", "4 Aprendiendo Angular", IContentType.Video);
            this._contenido5 = new ContentItem("Angular", "5 Aprendiendo Angular", IContentType.Video);
            this._contenido6 = new ContentItem("Angular", "6 Aprendiendo Angular", IContentType.Video);
            this._contenido7 = new ContentItem("Angular", "7 Aprendiendo Angular", IContentType.Video); 
        this._contentItems.push(this._contenido1, this._contenido2, this._contenido3, this._contenido4, this._contenido5, this._contenido6, this._contenido7)
      }


    /**
     * Crear 7 items basicos (title,description,rating).
     * @returns lista de 7 contentItems.
     */
    obtenerContentItemsList7ContentItems() : Array<ContentItem> {
        return this._contentItems
    }

    /**
     * @return todos los contentItems del servicio.
     */
    getAllContentItems(): Array<ContentItem>{
        return this._contentItems
    }




    /**
     * 
     * @param cantidadItems : numero de items para retornar
     * @returns Array<ContentItem>
     */
    getParticularContentItemsCuantity(cantidadItems : number): Array<ContentItem>{

        return this._contentItems.slice(0,cantidadItems);
    }
   
     
   
}


// this._contenido1.title = "Aprendiendo Angular ejemplo";
        // this._contenido1.contentType = IContentType.Video;
        // this._contenido1.description = "Convierte angular de 0 a 1000 - programacion";
        // this._contenido1.rating = IContentItemRating.Cuatro

        
        // this._contenido2.title = "React Ejemplo";
        // this._contenido2.contentType = IContentType.Article;
        // this._contenido2.description = "Convierte en un experto de react - programacion"
        // this._contenido2.rating = IContentItemRating.Cinco

        // this._contenido3.title = "React Ejemplo";
        // this._contenido3.contentType = IContentType.Article;
        // this._contenido3.description = "Convierte en un experto de react - programacion"
        // this._contenido3.rating = IContentItemRating.Cinco

        // this._contenido4.title = "React Ejemplo";
        // this._contenido4.contentType = IContentType.Article;
        // this._contenido4.description = "Convierte en un experto de react - programacion"
        // this._contenido4.rating = IContentItemRating.Cinco

        // this._contenido5.title = "React Ejemplo";
        // this._contenido5.contentType = IContentType.Article;
        // this._contenido5.description = "Convierte en un experto de react - programacion"
        // this._contenido5.rating = IContentItemRating.Cinco

        // this._contenido6.title = "React Ejemplo";
        // this._contenido6.contentType = IContentType.Article;
        // this._contenido6.description = "Convierte en un experto de react - programacion"
        // this._contenido6.rating = IContentItemRating.Cinco

        // this._contenido7.title = "React Ejemplo";
        // this._contenido7.contentType = IContentType.Article;
        // this._contenido7.description = "Convierte en un experto de react - programacion"
        // this._contenido7.rating = IContentItemRating.Cinco
