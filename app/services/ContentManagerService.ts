import { ContentItem } from "../models/ContentItem";
import { ContentItemFilter } from "../models/ContentItemFilter";
import { IContentManagerService } from "./IContentManagerService";

// Este servicio va a buscar la informacion mediante el servicio. 
export class ContentManagerService implements IContentManagerService{

    constructor() {}

    getContentsItemsByFilter(filter: ContentItemFilter): Array<ContentItem> {  
        
        // 1° Ir a buscar a la base de datos los items que coincidan con el filter
        console.log(`Buscando el ${filter}`)

        // 2° Retornar el array. 
        throw new Error("Funcionalidad no implementada.")
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
