import { IContentItemRating } from "../interfaces/IContentItemRating";
import { IContentType } from "../interfaces/IContentType";
import { ContentItemFilter } from "../models/ContentItemFilter";
import { Duration } from "../models/Duration";
import { PageIterator } from "../pageIterator/PageIterator";
import { IContentManagerService } from "../services/IContentManagerService";
import { defaultLimit, FechaCreacionSinceDefault, FechaCreacionUntilDefault, maxDurationUntil, maxRatingFilter, minDurationSince, minRatingFilter } from "../utils/ConfigurationENV";
import { CustomLogger } from "../utils/CustomLogger";

//Todo comentario a cada metodo.
// Todo : PageIterator. Return Page Iterator. CAmbiar en todos.
// Todo, devolver el totalItems, para dar info.
// geter y set de limit y page. Default ejemplo 5.

export class ContentManager {

    private _iContentManagerService: IContentManagerService; 
    private _customLog: CustomLogger; 

    /**
     * 
     * @param iContentManagerService : Servicio IContentManagerService
     * @param customLog : Log debug a utilziar. 
     */
    constructor(iContentManagerService: IContentManagerService, customLog: CustomLogger = new CustomLogger() ) {
        this._iContentManagerService = iContentManagerService
        this._customLog = customLog
    }

    /**
     * Filtra contenidos por titleOrDescription y devuelve un pageIterator.
     * @param titleOrDescription:string (title or description)
     * @returns PageIterator filtrador por titleOrDescription.
     */
    // Title or Description 
    getContentsItemsByTitleOrDescription(titleOrDescription: string): PageIterator {
        const filter = new ContentItemFilter();
        
        filter.titleOrDescription = titleOrDescription; 
       
        let pageIterator = new PageIterator(this._iContentManagerService, filter, defaultLimit)

        this._customLog.logDebug(`Devolviendo pageIterator desde getContentsItemsByTitleOrDescription: ${pageIterator}`);

        return pageIterator; 
    }


    /**
    * Filtra contenidos por contentType y devuelve un pageIterator.  
    * @param  contentType: IContentType.
    * @returns PageIterator filtrados por contentType.
    */
    getContentsItemsByContentType(contentType: IContentType): PageIterator {
        const filter = new ContentItemFilter();
        filter.contentType = contentType;          
        
        let pageIterator = new PageIterator(this._iContentManagerService, filter, defaultLimit)

        this._customLog.logDebug(`Devolviendo pageIterator desde getContentsItemsByContentType: ${pageIterator}`);
        
        return pageIterator; 
    }


    /**
     * Filtra contenidos por tag y devuelve un pageIterator.  
     * @param tags: string[]
     * @returns PageIterator filtrados por tag.
     */
    getContentsItemsByTag(tags: string[]): PageIterator {
        const filter = new ContentItemFilter();
        filter.tags = tags;           

        let pageIterator = new PageIterator(this._iContentManagerService, filter, defaultLimit )

        return pageIterator; 
    }


    /**
    * Filtra contenidos por duration y devuelve un pageIterator.  
    * @param durationSince : Duration. Desde esta duration. Default minDurationSince
    * @param durationUntil : Duration. Hasta esta duration. Default maxDurationUntil.
    * @returns PageIterator filtrados por tag.
    */
    getContentsItemByDuration(durationSince: Duration = minDurationSince, durationUntil: Duration = maxDurationUntil): PageIterator {

        const filter = new ContentItemFilter();
        this._customLog.logDebug(`ContentManager, La durationSince=${durationSince.getDuration()} y durationUntil ${durationUntil.getDuration()}.`)
        filter.durationSince = durationSince;
        filter.durationUntil = durationUntil; 

        let pageIterator = new PageIterator(this._iContentManagerService, filter, defaultLimit); 

        return pageIterator;
      
    }


    // ToDo Filtro by rating : Test
     /**
     * Filtra contenidos por rating y devuelve un pageIterator.  
     * @param ratingSince : desde rating. Default minRatingFilter.
     * @param ratingUntil : hasta rating. Default maxRatingFilter.
     * @returns PageIterator filtrados por rating.
     */
    getContentsItemByRating(ratingSince: IContentItemRating = minRatingFilter, ratingUntil: IContentItemRating = maxRatingFilter): PageIterator {  

        this._customLog.logDebug(`desde getContentItemByRating. ratingSince=${ratingSince} & ratingUntil=${ratingUntil}`)
        const filter = new ContentItemFilter();
        filter.ratingSince = ratingSince; 
        filter.ratingUntil = ratingUntil;           
        
        let pageIterator = new PageIterator(this._iContentManagerService, filter, defaultLimit); 

        return pageIterator;
    }

     /**
     * Filtra contenidos por fecha y devuelve un pageIterator.  
     * @param fechaCreacionSince: buscar desde. Default fechaCreacionSinceDefault.
     * @param fechaCreacionUntil: buscar hasta. Default fechaCreacionUntilDefault.
     * @returns PageIterator filtrados por fecha.
     */
    getContentsItemByFechaCreacion(fechaCreacionSince: Date = FechaCreacionSinceDefault, fechaCreacionUntil: Date = FechaCreacionUntilDefault): PageIterator {  

        this._customLog.logDebug(`desde getContentItemFechaCreacion. fechaCreacionSince=${fechaCreacionSince} & fechaCreacionUntil=${fechaCreacionUntil}`)
        
        const filter = new ContentItemFilter();
        filter.fechaCreacionSince = fechaCreacionSince;
        filter.fechaCreacionUntil = fechaCreacionUntil;
        
        let pageIterator = new PageIterator(this._iContentManagerService, filter, defaultLimit); 

        return pageIterator;
    }

}

 



    // /**
    // * Filtra contenidos por title y devuelve un pageIterator.
    // * @param title: string title 
    // * @returns PageIterator filtrador por title.
    // */
    // getContentsItemsByTitle(title: string): PageIterator {
    //     const filter = new ContentItemFilter();
    //     filter.title = title;           

    //     let pageIterator = new PageIterator(this._iContentManagerService, filter, defaultLimit)

    //     this._customLog.logDebug(`Devolviendo pageIterator desde getContentsItemsByTitle: ${pageIterator}`);

    //     return pageIterator; 
    // }

    // /**
    // * Filtra contenidos por description y devuelve un pageIterator.
    // * @param description:string description.
    // * @returns PageIterator filtrador por description..
    // */
    // getContentsItemsByDescription(description: string): PageIterator {
    //     const filter = new ContentItemFilter();
    //     filter.description = description;           
       
    //     let pageIterator = new PageIterator(this._iContentManagerService, filter, defaultLimit)

    //     this._customLog.logDebug(`Devolviendo pageIterator desde getContentsItemsByDescription: ${pageIterator}`);

    //     return pageIterator; 
    // }