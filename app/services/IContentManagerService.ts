import { ContentItem } from "../models/ContentItem";
import { ContentItemFilter } from "../models/ContentItemFilter";

export interface IContentManagerService{
    
    /**
     * 
     * @param filter: ContentItemFilter => Busqueda especifica segun filtros
     */
    getContentsItemsByFilter(filter : ContentItemFilter): ContentItem[];

    /**
     * 
     * @param filter: busqueda por un filtro especifico.
     * @param page: pagina solicidata
     * @param limit: cantidad de items por pagina 
     * @param order: any
     * @return lista de ContentItem primero filtrados y luego paginados.
     */
    getContentItemsByFilterPaged(filter: ContentItemFilter, page: number, limit: number, order: any): ContentItem[] 
}



