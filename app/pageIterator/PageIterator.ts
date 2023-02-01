
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

//TODO hoy. Get totalPages() como calculo.

export class PageIterator {
    
    private _service: IContentManagerService;
    private _filter: ContentItemFilter;
    
    private _limit: number;
    private _order: IOrderArray;
    private _numberTotalContentItems: number;
    private _listContentItems: Array<ContentItem>;
    
    private _currentPage: number;
    private _totalPages: number;
    
    /**
     * Page Iterator, retornar de los contenidos por determinados filtros.
     * @param service servicio a utilizar
     * @param filter filtro a buscar
     * @param limit limite de contenidos por pagina
     * @param order orden para retornar los contenidos en la pagina
     */
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
    private isValidLimit(limit: number) : number{
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
    private isValidPage(page: number): boolean {
        if (page <= 0) {
            _customLogger.logDebug(`La pagina <= 0, el  objetivo era: ${page}`)
            throw new ErrorNoExisteLaPagina(`La pagina no puede ser <= 0`);
        } else if (page > this._totalPages) {
            _customLogger.logDebug(`La  pagina objetivo es: ${page}`)
            throw new ErrorNoExisteLaPagina(`La pagina no puede ser mayor a la ultima`)
        }
        return true; 
    }

    /**
     * Actualiza los datos del pageIterator ante un cambio en el limit.
     */
    private updateDataPageIterator() {
        this._numberTotalContentItems = this.getTotalCuantityContentItems();
        this._totalPages = Math.ceil(this._numberTotalContentItems / this._limit)
    }

    /**
     * @returns data to debug.
     */
    private showDataToDebug() {
        console.log(`Page Iterator Debug: CurrentPage=${this._currentPage}, TotalPage=${this._totalPages}, LastPage = ${this._totalPages}, PreviosPage=${this._currentPage - 1}, NextPage ${this._currentPage + 1}`)
    }

    /**
     * Setea la pagina actual
     * @page : numero de pagina.
     */
    private set currentPage(page: number) {
        if (this.isValidPage(page)) {
            this._currentPage = page; 
        } 
    }

    /**
     * Cambia el limit de items por página. Al realizar un cambio, se actualiza automaticamente el totalPages. 
     * @param limit: number
     */
    set limit(limit : number) {
        this._limit = this.isValidLimit(limit);
        this.updateDataPageIterator();
    }

    /**
     * @return el limit de contents by page.
     */
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

    /**
     * @return numero de pagina actual
     */
    getCurrentPageNumber() :number{
        return this._currentPage;
    };

    /**
     * 
     * @returns numero de paginas totales.
     */
    getTotalPageNumber(): number {
        return this._totalPages; 
    }
    

    /**
    * @return 1° Pagina de contentItems filtrados por el servicio elegido.
    */
    public getFirstPage() {
        
        this.showDataToDebug();
       
        try {   
            let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, 1, this._limit, this._order);

            this.currentPage = 1 

            this.isValidPage(this._currentPage);

            this._listContentItems = result; 

            return result;

        } catch (error) {
            throw new ErrorReturnPaginaPageIterator(`Error getFirstPage(): ${error}`)
        }
    }   
    
    /**
     *  @returns PreviosPage from currentPage filtrados por el servicio elegido.
     */
    public getPreviousPage(): Array<ContentItem> { 
      
        this.showDataToDebug();

        try {
            let previousPage = this._currentPage - 1;
           
            this.isValidPage(previousPage);
            
            let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, previousPage, this._limit, this._order);

            this.currentPage = previousPage; 

            this._listContentItems = result; 

            return result;         

        } catch (error) {
            //TODO en todos los errores, debugear en todos los errores. 
            throw new ErrorReturnPaginaPageIterator(`Error getPreviosPage: ${error}`)
        }
    }
    
    /**
     * @returns NextPage from currentPage filtrados por el servicio elegido.
     */
    public getNextPage() : Array<ContentItem> {

        this.showDataToDebug();

        
        try {
            
            let nextPage = this._currentPage + 1;

            this.isValidPage(nextPage);  

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
     */
    public getLastPage() : Array<ContentItem> {
        this.showDataToDebug();

        try {
        
            let result: Array<ContentItem> = this._service.getContentItemsByFilterPaged(this._filter, this._totalPages, this._limit, this._order);
        
            this.currentPage = this._totalPages; 

            this._listContentItems = result; 

            return result;

        } catch (error) {
            throw new ErrorReturnPaginaPageIterator(`Error getNextPage: ${error}`)
        }
    }
    
    /**
     * 
     * @param page : Pagina objetivo.
     * @return nueva Pagina particular elegida , filtrados por el servicio elegido.
     */
    public getParticularPage(page: number) : Array<ContentItem> {
        this.showDataToDebug();

        try {
            
            let particularPage = page;

            this.isValidPage(page); 
    
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
    
    
    
    
    //TIP HOY, eliminar esto. Simple. Si quiero saber esto, getTotalPages(). preivous? -1.
    // getLastPageNumber(): number{
    //     return this._totalPages; 
    // }