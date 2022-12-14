import { IContentItemRating } from "../../app/interfaces/IContentItemRating";
import { IContentType } from "../../app/interfaces/IContentType";
import { ContentItem } from "../../app/models/ContentItem";
import { Duration } from "../../app/models/Duration";

export class CrearDosItems {

    private _contentItems: Array<ContentItem>;
    private _contenido1: ContentItem;
    private _contenido2: ContentItem; 
    

    constructor() {

        this._contentItems = [];
        
        // this._contenido1 = new ContentItem("Aprendiendo Angular ejemplo", IContentType.Video, ["Angular", "Typescript"], "Convierte angular de 0 a 1000 - programacion"); 
        // this._contenido2 = new ContentItem("React EJemplo", IContentType.Article, ["React", "Javascript"], "Convierte en un experto de react - programacion");
        this._contenido1 = new ContentItem();
        this._contenido2 = new ContentItem();
      }


    get contenido1() {
         let duration1: Duration = new Duration(); 
        duration1.setDuration(1, 10, 0);
        
        this._contenido1.title = "Aprendiendo Angular ejemplo";
        this._contenido1.contentType = IContentType.Video;
        this._contenido1.tags = ["Angular", "Typescript"]
        this._contenido1.description = "Convierte angular de 0 a 1000 - programacion";
        this._contenido1.duration = duration1; 
        this._contenido1.rating = IContentItemRating.Cuatro
        this._contenido1.fechaCreacion = new Date("2022 08 14")

        return this._contenido1
    }

   
    get contenido2() {
        return this._contenido2;
    }
    

    /**
     * Crear items para consumirlo en el servicio mock de prueba
     * ? duration, crearla desde aca.
     * 
     * @returns [contenido1, contenido2].
     */
    obtenerContentItemsList2ContentItems() {
        
        let duration1: Duration = new Duration(); 
        duration1.setDuration(1, 10, 0);
        
        this._contenido1.title = "Aprendiendo Angular ejemplo";
        this._contenido1.contentType = IContentType.Video;
        this._contenido1.tags = ["Angular", "Typescript"]
        this._contenido1.description = "Convierte angular de 0 a 1000 - programacion";
        this._contenido1.duration = duration1; 
        this._contenido1.rating = IContentItemRating.Cuatro
        this._contenido1.fechaCreacion = new Date("2022 08 14")

        let duration2: Duration = new Duration(); 
        duration2.setDuration(0, 10, 30);
        
        this._contenido2.title = "React Ejemplo";
        this._contenido2.contentType = IContentType.Article;
        this._contenido2.tags = ["React", "Javascript"];
        this._contenido2.description = "Convierte en un experto de react - programacion"
        this._contenido2.duration = duration2;
        this._contenido2.rating = IContentItemRating.Cinco
        this._contenido2.fechaCreacion = new Date("2010 02 02")

        console.log(`desde ObtenerContentItemList, la fechaCreacion de contenido1 = ${this._contenido1.fechaCreacion}, contenido2=${this._contenido2.fechaCreacion}`)

        this._contentItems.push(this.contenido1, this._contenido2)
        return this._contentItems
    }

    // Obtener solo 1 contentItem
    obtener1ContentItem() {
        return this._contenido1;
       
    }
     
   
}

