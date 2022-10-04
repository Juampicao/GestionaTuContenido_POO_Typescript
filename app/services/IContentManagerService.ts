import { ContentItem } from "../models/ContentItem";
import { ContentItemFilter } from "../models/ContentItemFilter";

export interface IContentManagerService{
 
    // Devuelve los items segun el filtro especificado.
    getContentsItemsByFilter(filter : ContentItemFilter): ContentItem[];

}