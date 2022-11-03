
import { ContentManagerServiceMock } from "../../test/services/ContentManagerServiceMock";
import { ErrorNoExisteLaPagina } from "../error/ErrorNoExisteLaPagina";
import { ErrorReturnPaginaPageIterator } from "../error/ErrorReturnPaginaPageIterator";
import { ErrorExternoAlPasarParams, NoHayResultadosError } from "../error/NoHayResultadosError";
import { IOrderArray } from "../interfaces/IOrderArray";
import { ContentItem } from "../models/ContentItem";
import { ContentItemFilter } from "../models/ContentItemFilter";
import PagingUtils from "../pagination/Pagination";

import { IContentManagerService } from "../services/IContentManagerService";
import { maxLimitByPage, minLimitByPage } from "../utils/ConfigurationENV";
import { CustomLogger } from "../utils/CustomLogger";


let _customLogger = new CustomLogger()

export class PageIterator {
    
    private _service: IContentManagerService;
    private _filter: ContentItemFilter;
    
    private _limit: number;
    private _order: IOrderArray;
    private _numberTotalContentItems: number;
    private _listContentItems: Array<ContentItem>;
    
    private _currentPage: number;
    private _totalPages: number;
    
    constructor(service: IContentManagerService = new ContentManagerServiceMock(), filter: ContentItemFilter = new ContentItemFilter(), limit: number, order: IOrderArray = IOrderArray.ASC) {   
        this._service = service;
        this._currentPage = 1;
        this._filter = filter
        this._order = order;
        this._limit = this.isValidLimit(limit);
        this._order = IOrderArray.ASC;
        this._numberTotalContentItems = this.getTotalCuantityContentItems();
        this._totalPages = Math.ceil(this._numberTotalContentItems / this._limit);
        this._listContentItems = [];
    }

    /**
     * Verifica que el limit sea positivo y menor al maximo permtido.
     * @param limit : number
     * @returns limit by page
     */
    isValidLimit(limit: number) : number{
        if (limit > maxLimitByPage || limit < minLimitByPage) {
            throw new ErrorExternoAlPasarParams(`el limite por pagina no puede menor a ${minLimitByPage} ni ser mayor a ${maxLimitByPage}`)
        } 
       return  this._limit = limit
    }

    /**
     * Verifica que la pagina sea válida. Mayor a 0 && < totalPages.
     * @param page : number
     * @returns Boolean
     */
    isValidPage(page: number): number {
        if (page <= 0) {
            _customLogger.logDebug(`La pagina <= 0, el  objetivo era: ${page}`)
            throw new ErrorNoExisteLaPagina(`La pagina no puede ser <= 0`);
        } else if (page > this._totalPages) {
            _customLogger.logDebug(`La  pagina objetivo es: ${page}`)
            throw new ErrorNoExisteLaPagina(`La pagina no puede ser mayor a la ultima`)
        }
        return page; 
    }

    /**
     * Actualiza los datos del pageIterator ante un cambio en el limit.
     */
    updateDataPageIterator() {
        this._numberTotalContentItems = this.getTotalCuantityContentItems();
        this._totalPages = Math.ceil(this._numberTotalContentItems / this._limit)
    }

    /**
     * @returns data to debug.
     */
    showDataToDebug() {
        console.log(`Page Iterator Debug: CurrentPage=${this._currentPage}, TotalPage=${this._totalPages}, LastPage = ${this.getLastPageNumber()}, PreviosPage=${this._currentPage - 1}, NextPage ${this._currentPage + 1}`)
    }

    set currentPage(page: number) {
        if (this.isValidPage(page)) {
            this._currentPage = page; 
        } 
    }

    /**
     * Update de los datos de totalPages y lastPage cuando se cambia el limit.
     * @param limit: number
     */
    set limit(limit : number) {
        this._limit = this.isValidLimit(limit);
        this.updateDataPageIterator();
    }

    get limit(): number{
        return this._limit;

    }
 
    /**
     * Se invoca automaticamente ante el creado del pageIterator, para completar la información principal(firstPage,totalPages & totalItemsCuantity).
     * @returns numero total de items con este filtro, sin paginar.
     */
    getTotalCuantityContentItems() {
       return  this._service.getTotalCuantityContentItems(this._filter)
    }

    getCurrentPageNumber() :number{
        return this._currentPage;
    };

    getTotalPageNumber(): number {
        return this._totalPages; 
    }
    
    getLastPageNumber(): number{
        return this._totalPages; 
    }

    /**
    * @return 1° Pagina de contentItems filtrados por el servicio elegido.
    */
    getFirstPage() {
        this.showDataToDebug();
       
        try {   
            let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, 1, this._limit, this._order);

            this.currentPage = this.isValidPage(1);

            this._listContentItems = result; 

            return result;
        } catch (error) {
            throw new ErrorReturnPaginaPageIterator(`Error getFirstPage(): ${error}`)
        }
    }   
    
    /**
     *
     *  @returns PreviosPage from currentPage filtrados por el servicio elegido.
     */
    getPreviousPage(): Array<ContentItem> { 
      
        this.showDataToDebug();

        let previousPage = this.isValidPage(this._currentPage - 1); 
       
        try {
            let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, previousPage, this._limit, this._order);
            this.currentPage = previousPage; 
            this._listContentItems = result; 

            return result;         

        } catch (error) {
            throw new ErrorReturnPaginaPageIterator(`Error getPreviosPage(): ${error}`)
        }
    }
    
    /**
     * @returns NextPage from currentPage filtrados por el servicio elegido.
     */
    getNextPage() : Array<ContentItem> {

        this.showDataToDebug();

        let nextPage = this.isValidPage(this._currentPage + 1); 

        try {
            let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, nextPage , this._limit, this._order);
            
            this.currentPage = nextPage;
            
            this._listContentItems = result; 

            return result;    
            
        } catch (error) {
            throw new ErrorReturnPaginaPageIterator(`Error getNextPage: ${error}`)
        }

    }
    
    /** 
     * @returns LastPage filtrados por el servicio elegido.
     *  Aclaracion: -1 es para pasar el setCurrentPage.
     */
    getLastPage() : Array<ContentItem> {
        this.showDataToDebug();

        try {
        
            let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, this.getLastPageNumber(), this._limit, this._order);
        
            this.currentPage = this.getLastPageNumber(); 

            this._listContentItems = result; 

            return result;

        } catch (error) {
            throw new ErrorReturnPaginaPageIterator(`Error getNextPage: ${error}`)
        }
    }
    
    /**
     * 
     * @param particularPage : Pagina objetivo.
     * @return nueva Pagina particular elegida , filtrados por el servicio elegido.
     */
    getParticularPage(page: number) : Array<ContentItem> {
        this.showDataToDebug();

        try {
            
            let particularPage = this.isValidPage(page); 
    
            let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, particularPage, this._limit, this._order);
            
            this.currentPage = particularPage; 
    
            this._listContentItems = result; 
    
            return result;
         } catch (error) {
            throw new ErrorReturnPaginaPageIterator(`Error getNextPage: ${error}`)
        }

    }

}










// Todo contemplar que puede cambiar ante el boton nextPage(), funcionaria? Tengo 10 items, pero al hacer un nextPage(), se agregan 5 mas. Cambiaria esto.
//Todo si cambio el tamaño de pagina? Hacer como un metodo diferente.
//Tip hoy, un unico metodo que cambie una cosa. Achico mi margen de error.
// export interface IPageIterator{
//     hasNextPage(): boolean;
//     hasPreviousPage(): boolean;
//     nextPage(): number;
//     previousPage(): number;
// }


    // getPreviusPage() { 
    //     this.getCurrentPageNumber();
    //     this.showDataToDebug();
      
    //     try {
        
    //         let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, this.previousPage, this._limit, this._order);
    //         this.currentPage = - 1;
    //         return result;      
        
    //     } catch (error) {
    //         // Todo, esta bien esperar este error. Es el error que lanzo afuera, pero adentro tiene ErrorNoExistePagina.
    //         throw new ErrorReturnPaginaPageIterator(`Error getPreviusPage(): ${error}`)
    //     }
    // }
    
    
 // Todo isValidPage() => Como el set currentPage. Responsable de decir si es valida o no para todo. 
    // Tip hoy. ¿Quien me modifica? Solo de adentro? 
    // Tip hoy, si pasa mas de un minuto, verificar denuevo. Verificar el totalPages.
    // Tip hoy cuestionar las responsabilidades. El set no seria validar. El validar es una función extra. 

//Tip hoy: Strategy, inyecto contenido estatico.
//Tip hoy: SerivioPagador, objetivo cobrar. Puedo tener implementacion con tarjeta o qr. Es un strategy. No se casa con ninguno especifico.
// Todo que hace la clase. SI cambia las condiciones de filtro, tengo que crear otra.
//Tip hoy, recovery Points. Si hay un error, vuelve a antes.

 //Todo guardar la lista de contentitems de la pagina actual (por perfomance) Si estoy en la 2. Voy a la 3, pero vuelvo. Pero puede estar desactualizado ojo.
    // getCurrentPageItemList(){}


// Todo metodo de totalItems o totalPage, para manejar los erroes desde aca. Llamar siempre en cada metodo.
// Todo Page error.
// Todo tryCatch errores del mock.

    // // Eliminar y pasar a 1 metodo
    // get previousPage(): number{
    //     if (this._previuosPage <= 0) {
    //         throw new ErrorNoExisteLaPagina(`No existe la pagina=${this._previuosPage}`)
    //     }
    //     return this._previuosPage;
    // }

    // // Eliminar y pasar a 1 metodo
    // get nextPage(): number{
    //     if (this._nextPage > this.lastPage) {
    //         throw new ErrorNoExisteLaPagina(`No existe la pagina=${this._nextPage}`)
    //     }
    //     return this._nextPage;
    // }