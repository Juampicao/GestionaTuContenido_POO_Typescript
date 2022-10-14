import { ContentItem } from "../models/ContentItem";
import { ContentItemFilter } from "../models/ContentItemFilter";

export interface IContentManagerService{
 
    // Devuelve los items segun el filtro especificado. Filter 2 optativo.
    getContentsItemsByFilter(filter : ContentItemFilter, filter2?: ContentItemFilter): ContentItem[];

}