// Todo hoy: Crear page iterator, que implemente IContentManagerService.(recibe el filter)(limit y order). No la pagina.
// Tiene una funcion // GetfirstPage // NextPage. // LastPage // Si no existe, el servicio me lo dice. yo page iterator, veo que hago. ¿Como se lo digo?
// Esta antes del servicio. 1) Front 2) iterator 3) servicio con pagination.
// No recibiria hoy pro hoy una pagina. Si un futuro GetParticularPage(); El numero valido se encarga el pageIterator.
// Debe guardar la pagina primera que pido. Si pido 1. Guardo. Cuando pido next, pido la 2.
// Una vez tengo el primer resultado. Como buceo los resultados.
// Todo hoy: Test. Es casi como la pantalla final. Pensarlo como si estuviera en el front.
// Todo hoy: Crear recibir el servicio del mock, para crear mas datos y probar.

import { IOrderArray } from "../interfaces/IOrder";
import { ContentItem } from "../models/ContentItem";
import { ContentItemFilter } from "../models/ContentItemFilter";
import PagingUtils from "../pagination/Pagination";

import { IContentManagerService } from "../services/IContentManagerService";


export class PageIterator implements IContentManagerService{

    private _currentPage: number;
    private _limit: number;
    private _order: IOrderArray;

    constructor(limit: number, ) {
        this._currentPage = 1;
    }
   
    getContentsItemsByFilter(filter: ContentItemFilter): ContentItem[] {
        throw new Error("Method not implemented.");
    }

    
    getContentItemsByFilterPaged(filter: ContentItemFilter, page: number = 1, limit: number = 2, order: any = "desc") : ContentItem[] {

        let result = this.getContentsItemsByFilter(filter);

        return PagingUtils.getContentsItemsByFilterByPagination(page,limit,order, result)
    }


    getFirstPage() {}
    
    getPreviusPage() { }
    
    getNextPage() {}
    
    getLastPage() { }
    
    getParticularPage() {}

}

// 1° Recibo desde el front


// 1° Recibo parametros del front
    // Filter, Limit y Order

// 2° Paso estos parametros al Mock.
    // Desde pageIterator, le pido al Mock.getContentsItemsByFilterByPagination (mismos filtros que me pasaron ami).
    
// 3° Recibo una respuesta del mock y la retorno.