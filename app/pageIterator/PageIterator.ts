
import { ContentManagerServiceMock } from "../../test/services/ContentManagerServiceMock";
import { ErrorNoExisteLaPagina } from "../error/ErrorNoExisteLaPagina";
import { ErrorExternoAlPasarParams, NoHayResultadosError } from "../error/NoHayResultadosError";
import { IOrderArray } from "../interfaces/IOrderArray";
import { ContentItem } from "../models/ContentItem";
import { ContentItemFilter } from "../models/ContentItemFilter";
import PagingUtils from "../pagination/Pagination";

import { IContentManagerService } from "../services/IContentManagerService";

//Tip hoy: Strategy, inyecto contenido estatico.
//Tip hoy: SerivioPagador, objetivo cobrar. Puedo tener implementacion con tarjeta o qr. Es un strategy. No se casa con ninguno especifico.

//Todo crear un metodo de cantidaddeItems desde el iContentManagerService.  Para no pedirle al getTotalItems.

// Todo que hace la clase. SI cambia las condiciones de filtro, tengo que crear otra.

//Tip hoy, recovery Points. Si hay un error, vuelve a antes.

export interface IPageIterator{
    hasNextPage(): boolean;
    hasPreviousPage(): boolean;
    nextPage(): number;
    previousPage(): number;
}

export class PageIterator {
    
    private _service: IContentManagerService;
    private _filter: ContentItemFilter;
    
    private _limit: number;
    private _order: IOrderArray;
    private _numberTotalContentItems: number;
    private _listContentItems: Array<ContentItem>;
    
    // private _position: number;
    private _currentPage: number;
    private _nextPage: number;
    private _previuosPage: number;
    private _totalPages!: number;
    private _lastPage: number;
    
    constructor( service: IContentManagerService = new ContentManagerServiceMock(), filter: ContentItemFilter = new ContentItemFilter(), limit : number, order:IOrderArray = IOrderArray.ASC) {
      
        this._service = service;
        this._currentPage = 1;
        this._filter = filter
        this._order = order; 
        this._limit = limit
        this._order = IOrderArray.ASC;
        this._nextPage = this._currentPage + 1;
        this._previuosPage = this._currentPage - 1;
        this._numberTotalContentItems = this.getTotalCuantityContentItems();
        this._totalPages = Math.ceil(this._numberTotalContentItems / this._limit)
        this._lastPage = this._totalPages;
        this._listContentItems = [];
    }

    // Getters Test

    //Todo, actualizar el currentPage, cuando invoco un metodo getNextPage().
   
    set currentPage(newCurrentPageNumber: number) {
        if (this._currentPage + newCurrentPageNumber <= 0) {
            throw new ErrorNoExisteLaPagina(`La nueva pagina actual no puede ser ${this._currentPage + newCurrentPageNumber}`)
        }
        this._currentPage = newCurrentPageNumber
    }

    get currentPage(): number{
        return this._currentPage
    };

    get totalPages(): number{
        return this._totalPages;
    }

    get lastPage(): number{
        return this._lastPage;
    }

    get previousPage(): number{
        if (this._previuosPage <= 0) {
            throw new ErrorNoExisteLaPagina(`No existe la pagina=${this._previuosPage}`)
        }
        return this._previuosPage;
    }

    get nextPage(): number{
        if (this._nextPage > this.lastPage) {
            throw new ErrorNoExisteLaPagina(`No existe la pagina=${this._nextPage}`)
        }
        return this._nextPage;
    }
 
    getTotalCuantityContentItems() {
       return  this._service.getTotalCuantityContentItems(this._filter)
    }

    // Todo, invocarlo siempre en nextPage.
    getCurrentPageNumber() {
        return this._currentPage;
    };

    //Todo guardar la lista de contentitems de la pagina actual (por perfomance) Si estoy en la 2. Voy a la 3, pero vuelvo. Pero puede estar desactualizado ojo.
    getCurrentPageItemList(){}


    // Todo metodo de totalItems o totalPage, para manejar los erroes desde aca. Llamar siempre en cada metodo.
    // Todo Page error.
    // Todo tryCatch errores del mock.
    // Todo titulo de que hace la funcion.

    /**
     * @return 1° Pagina de contentItems Filtrados por el servicio elegido.
     */
    getFirstPage() {
        this.getCurrentPageNumber();
        let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, 1, this._limit, this._order);
        return result;
    }   
    
    /**
     * @returns PreviosPage from currentPage, filtrados por el servicio elegido.
     */
    getPreviusPage() { 
        this.getCurrentPageNumber();
        let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, this.previousPage, this._limit, this._order);
        
        this.currentPage = - 1;

        
        return result;
    }
    
    /**
     * @returns NextPage from currentPage, filtrados por el servicio elegido.
     */
    getNextPage() {
        this.getCurrentPageNumber();
        let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, this.nextPage, this._limit, this._order);

        this.currentPage = +1;

       return result;
    }
    
    //Todo test lastPage, no deberia dejarme despues ir a la siguiente.
    /** 
     * @returns LastPage from currentPage filtrados por el servicio elegido.
     */
    getLastPage() {
        this.getCurrentPageNumber();
        let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, this.lastPage, this._limit, this._order);
        
        this.currentPage = this.lastPage;

        return result;
     }
    
    getParticularPage() {}

}



// 1° Recibo desde el front


// 1° Recibo parametros del front
    // Filter, Limit y Order

// 2° Paso estos parametros al Mock. El se encarga de filtrar y paginar.
    // Desde pageIterator, le pido al Mock.getContentsItemsByFilterByPagination (mismos filtros que me pasaron ami).

// 3° Recibo una respuesta del mock y la retorno.

// Todo hoy: Crear page iterator, que implemente IContentManagerService.(recibe el filter)(limit y order). No la pagina.
// Tiene una funcion // GetfirstPage // NextPage. // LastPage // Si no existe, el servicio me lo dice. yo page iterator, veo que hago. ¿Como se lo digo?
// Esta antes del servicio. 1) Front 2) iterator 3) servicio con pagination.
// No recibiria hoy pro hoy una pagina. Si un futuro GetParticularPage(); El numero valido se encarga el pageIterator.
// Debe guardar la pagina primera que pido. Si pido 1. Guardo. Cuando pido next, pido la 2.
// Una vez tengo el primer resultado. Como buceo los resultados.
// Todo hoy: Test. Es casi como la pantalla final. Pensarlo como si estuviera en el front.
// Todo hoy: Crear recibir el servicio del mock, para crear mas datos y probar.
