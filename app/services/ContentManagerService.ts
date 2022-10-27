import { ContentItem } from "../models/ContentItem";
import { ContentItemFilter } from "../models/ContentItemFilter";
import { IContentManagerService } from "./IContentManagerService";


export class ContentManagerService implements IContentManagerService{

    constructor() { }
    
    getContentsItemsByFilter(filter: ContentItemFilter): ContentItem[] {
        throw new Error("Method not implemented.");
    }
    getContentItemsByFilterPaged(filter: ContentItemFilter, page: number, limit: number, order: any): ContentItem[] {
        throw new Error("Method not implemented.");
    }
   
}


