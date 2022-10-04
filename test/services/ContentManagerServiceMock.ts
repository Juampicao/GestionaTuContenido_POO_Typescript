import { ContentItem } from "../../app/models/ContentItem";
import { ContentItemFilter } from "../../app/models/ContentItemFilter";
import { IContentManagerService } from "../../app/services/IContentManagerService";

export class ContentManagerServiceMock implements IContentManagerService{

    private _contentItems: Array<ContentItem>;

    // Probar el array llame directo al json.
    constructor() {  
        this._contentItems = new Array<ContentItem>;
    }
 
    // Creo items para pushear al array. 
    crear(contentItem : ContentItem) {
        console.log("Creando un nuevo contentItem..."
        + contentItem.contentDetails ); 
        this._contentItems.push(contentItem)
    }
  
    getAllContentsItems(): Array<ContentItem> {
        return this._contentItems
    }
    
    // Retorna el array con los items creados en el paso anterior. 
    getContentsItemsByFilter(filter: ContentItemFilter): Array<ContentItem> {     

        // TO-DO:
        // Implementar el filtro (titulo, descripcion, tags ,etc..) Recorriendo la lista de items y filtrando en consecuencia. 
        // Recorrer y verificar si coincide, pushear al array que voy a retornar.
        // Prioridad hoy: Sin filtro // Titulo o descripcion // Content Type // Tags. 
        // Preguntar al GET de cada atributo.
        
        // 1° Ir a buscar a la base de datos los items que coincidan con el filter
        console.log(`Buscando el ${filter}`)

        // 2° Retornar el array terminado.
        return this._contentItems; 
    }
}


















// // Instancio el servicio.
// let servicioPagador = new PagadorService();

// // Realizando el pago 1.
// servicioPagador.pagar(new Pago(100));

// // Realizando el pago 2.
// let p2 = new Pago(200);
// servicioPagador.pagar(p2);

// // Verificando los pagos realizados
// servicioPagador.getAllPagos();
