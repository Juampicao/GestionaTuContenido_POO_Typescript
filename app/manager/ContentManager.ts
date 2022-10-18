import { IContentManagerService } from "../services/IContentManagerService";
import { CustomLogger } from "../utils/CustomLogger";
import { ContentItem } from "../models/ContentItem";
import { ContentItemFilter } from "../models/ContentItemFilter";
import { IContentItemRating } from "../interfaces/IContentItemRating";
import { IContentType } from "../interfaces/IContentType";
import { Duration } from "../models/Duration";
import { FechaCreacionSinceDefault, FechaCreacionUntilDefault, maxDurationUntil, maxRatingFilter, minDurationSince, minRatingFilter } from "../utils/ConfigurationENV";

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

    /**
     * 
     * @param words string (title or description)
     * @returns Lista con titulos or descriptions que coincidan estrictamente con la palabra.
     */
    // Title or Description
    getContentsItemsByTitleOrDescription(words: string): Array<ContentItem> {
        // Crear un filtro.title y un filtro.description con la misma palabra, va a buscar por ambos.
        const filter = new ContentItemFilter();
        filter.description = words;           
        filter.title = words;
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



    // Duration
    // ? Como duration o como number?  
    getContentsItemByDuration(durationSince: Duration = minDurationSince, durationUntil: Duration = maxDurationUntil): Array<ContentItem> {

        const filter = new ContentItemFilter();
    
        this._customLog.logDebug(`ContentManager, La durationSince=${durationSince.getDuration()} y durationUntil ${durationUntil.getDuration()}.`)
        
        filter.durationSince = durationSince;
        filter.durationUntil = durationUntil; 

        let response: Array<ContentItem> = []; 

        response = this._iContentManagerService.getContentsItemsByFilter(filter);
        
        return response

    }


    // To-Do Filtro by rating : Test
    getContentsItemByRating(ratingSince: IContentItemRating = minRatingFilter, ratingUntil: IContentItemRating = maxRatingFilter): Array<ContentItem> {  

        this._customLog.logDebug(`desde getContentItemByRating. ratingSince=${ratingSince} & ratingUntil=${ratingUntil}`)
        const filter = new ContentItemFilter();
        filter.ratingSince = ratingSince; 
        filter.ratingUntil = ratingUntil;           
        
        let response: Array<ContentItem> = []; 

        response = this._iContentManagerService.getContentsItemsByFilter(filter);
     
        return response; 
    }


    // ToDo Filtro by fecha de creacion + Test
    getContentsItemByFechaCreacion(fechaCreacionSince: Date = FechaCreacionSinceDefault, fechaCreacionUntil: Date = FechaCreacionUntilDefault): Array<ContentItem> {  

        this._customLog.logDebug(`desde getContentItemFechaCreacion. fechaCreacionSince=${fechaCreacionSince} & fechaCreacionUntil=${fechaCreacionUntil}`)
        
        const filter = new ContentItemFilter();
        filter.fechaCreacionSince = fechaCreacionSince;
        filter.fechaCreacionUntil = fechaCreacionUntil;
        
        let response: Array<ContentItem> = []; 

        response = this._iContentManagerService.getContentsItemsByFilter(filter);
     
        return response; 
    }

}

 


