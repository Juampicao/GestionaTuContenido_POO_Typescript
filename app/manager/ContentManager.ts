import { IContentManagerService } from "../services/IContentManagerService";
import { CustomLogger } from "../utils/CustomLogger";
import { ContentItem } from "../models/ContentItem";
import { ContentItemFilter } from "../models/ContentItemFilter";
import { IContentType } from "../interfaces/Interfaces";

export class ContentManager {

    private _iContentManagerService: IContentManagerService; 
    private _customLog: CustomLogger; 

    constructor(iContentManagerService: IContentManagerService, customLog: CustomLogger = new CustomLogger() ) {
        this._iContentManagerService = iContentManagerService
        this._customLog = customLog
    }

    // Title
    getContentsItemsByTitle(title: string): Array<ContentItem> {
        const filter = new ContentItemFilter();
        filter.title = title;           
        let response: Array<ContentItem> = []; 
        response = this._iContentManagerService.getContentsItemsByFilter(filter);
        this._customLog.logInfo(`Mostrando` + response.length + `Elementos`);
        this._customLog.logDebug(`Devolviendo ${response}`);
        return response; 
    }

    // ContentType
    getContentsItemsByContentType(contentType: IContentType): Array<ContentItem> {
        const filter = new ContentItemFilter();
        filter.contentType = contentType;           
        let response: Array<ContentItem> = []; 
        response = this._iContentManagerService.getContentsItemsByFilter(filter);
        this._customLog.logInfo(`Mostrando` + response.length + `Elementos`);
        this._customLog.logDebug(`Devolviendo ${response}`);
        return response; 
    }

    // To-Do: Option por varios filtros.. (pensar mas de)
     // Title or Descripcion
    getContentsItemsByManyFilter(title: string = "", description: string = "", contentType: IContentType = IContentType.void, tag: string[] = []): Array<ContentItem> {
        const filter = new ContentItemFilter();
        filter.title = title;           
        let response: Array<ContentItem> = []; 
        response = this._iContentManagerService.getContentsItemsByFilter(filter);
        this._customLog.logInfo(`Mostrando` + response.length + `Elementos`);
        this._customLog.logDebug(`Devolviendo ${response}`);
        return response; 
    }

    // Tags
    getContentsItemsByTag(tags: string[]): Array<ContentItem> {
        const filter = new ContentItemFilter();
        filter.tags = tags;           
        let response: Array<ContentItem> = []; 
        response = this._iContentManagerService.getContentsItemsByFilter(filter);
        this._customLog.logInfo(`Mostrando` + response.length + `Elementos`);
        this._customLog.logDebug(`Devolviendo ${response}`);
        return response; 
    }

    // Description
    getContentsItemsByDescription(description: string): Array<ContentItem> {
        const filter = new ContentItemFilter();
        filter.description = description;           
        let response: Array<ContentItem> = []; 
        response = this._iContentManagerService.getContentsItemsByFilter(filter);
        this._customLog.logInfo(`Mostrando` + response.length + `Elementos`);
        this._customLog.logDebug(`Devolviendo ${response}`);
        return response; 
    }

    

    // Finish: Agregar los otros filtros que faltan (type, tags, description) Completar la US1 con esto. 
    // To-do Caso 1: Tengo que agregarle titleOrDescription al mismo de arriba. Agregarle logica para cumplir con lo pedido.
    // Pensar siempre en perfomance.

}

 


