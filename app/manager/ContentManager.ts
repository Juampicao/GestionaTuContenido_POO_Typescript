import { IContentManagerService } from "../services/IContentManagerService";
import { CustomLogger } from "../utils/CustomLogger";
import { ContentItem } from "../models/ContentItem";
import { ContentItemFilter } from "../models/ContentItemFilter";

export class ContentManager {

    private _iContentManagerService: IContentManagerService; 
    private _customLog: CustomLogger; 

    constructor(iContentManagerService: IContentManagerService, customLog: CustomLogger = new CustomLogger() ) {
        this._iContentManagerService = iContentManagerService
        this._customLog = customLog
    }

    // Retorna los Contenidos por titulo
    getContentsItemsByTitle(title: string): Array<ContentItem> {
        const filter = new ContentItemFilter();
        filter.title = title;           
        let response: Array<ContentItem> = []; 
        response = this._iContentManagerService.getContentsItemsByFilter(filter);
        this._customLog.logInfo(`Mostrando` + response.length + `Elementos`);
        this._customLog.logDebug(`Devolviendo ${response}`);
        return response; 
    }

}

 


