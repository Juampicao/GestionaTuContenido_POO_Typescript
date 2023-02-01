import { ErrorContentManagerService } from "../../app/error/ErrorContentManagerService";
import { NoHayResultadosError } from "../../app/error/NoHayResultadosError";
import { IContentItemRating } from "../../app/interfaces/IContentItemRating";
import { ContentItem } from "../../app/models/ContentItem";
import { ContentItemFilter } from "../../app/models/ContentItemFilter";
import PagingUtils from "../../app/pagination/Pagination";
import { IContentManagerService } from "../../app/services/IContentManagerService";
import { CustomLogger } from "../../app/utils/CustomLogger";
import { CrearDosItems } from "../utils/CrearDosItems";


let customLogger = new CustomLogger()

export class ContentManagerServiceMock implements IContentManagerService{

    private _contentItems: Array<ContentItem>;

    // Todo default itemBasico. Cambiar todos los test.
    constructor(servicioCrearItemsPruebas = new CrearDosItems().obtenerContentItemsList2ContentItems()) {
        this._contentItems = servicioCrearItemsPruebas;
    }
 
    crear(contentItem : ContentItem) {
       customLogger.logDebug("Creando un nuevo contentItem..."); 
        this._contentItems.push(contentItem)
    }
  
    /**
     * 
     * @returns todos los contenidos sin filtro.
     */
    getAllContentsItems(): Array<ContentItem> {
        try {
            return this._contentItems
        } catch (error) {
            throw new ErrorContentManagerService(`Error getAllContents ${error}`)
        }
    }

    /**
     * @returns Cantidad total de items coincidentes con este filtro.
     */
    getTotalCuantityContentItems(filter: ContentItemFilter): number { 
        let result = this.getContentsItemsByFilter(filter).length
        return result;
     };
    
    /**
     * 
     * @param filter: busqueda por un filtro especifico.
     * @param page: pagina solicidata
     * @param limit: cantidad de items por pagina 
     * @param order: any
     * @return lista de ContentItem primero filtrados y luego paginados.
     */
    getContentItemsByFilterPaged(filter: ContentItemFilter, page: number = 1, limit: number = 2, order: any = "desc"): ContentItem[] {
    
        try {
            let result = this.getContentsItemsByFilter(filter);
            return PagingUtils.getContentsItemsByFilterByPagination(page,limit,order, result)
        } catch (error) {
            throw new ErrorContentManagerService(`Error en getContentItemByFilterPaged ${error}`)            
        }
    }
    

    /**
     * 
     * @param filter ContentItemFilter
     * @returns Lista de contentItem filtrados
     */
    getContentsItemsByFilter(filter: ContentItemFilter): Array<ContentItem>  {  

        // Crear variable inicialziada en null.
        let voidFilter = new ContentItemFilter();

        let _filterContentList: Array<ContentItem> = []; 
        
        for (let i = 0; i < this._contentItems.length; i++) {
         

            //Todo hoy test de esta funcion.
            if (filter.titleOrDescription !== "") {
                
                if (this._contentItems[i].containDescriptionOrTitle(filter.titleOrDescription.toLocaleLowerCase())) {     
                    
                    _filterContentList.push(this._contentItems[i])
                }
                continue;
            }
                
                
            // Tags
            if (filter.tags.length !== 0) {
                
                if (this._contentItems[i].containTags(filter.tags)) {
                    
                    _filterContentList.push(this._contentItems[i])
                }
                continue;
            }
            

            // RATING
            if (filter.ratingSince !== IContentItemRating.Void || filter.ratingUntil !== IContentItemRating.Void) {
                
                customLogger.logDebug(`desde el mock, el ratingSince=${filter.ratingSince}, ratingUntil ${filter.ratingUntil}`)
                if (this._contentItems[i].containsRating(filter.ratingSince, filter.ratingUntil)) {

                    _filterContentList.push(this._contentItems[i])
                }
                continue;
            }

            // ContentType

            if (filter.contentType !== "") {
                 console.log(`filter testing => ${this._contentItems[i]} es igual a filtro = ${JSON.stringify(filter,null,2)}`)
                
                if (this._contentItems[i].contentType === filter.contentType) {     
                    _filterContentList.push(this._contentItems[i])
                }

                continue;
            }
            
            // Fecha
            if (filter.fechaCreacionSince !== voidFilter.fechaCreacionUntil || filter.fechaCreacionUntil !== voidFilter.fechaCreacionSince) {
                
                 console.log(`filter testing => ${this._contentItems[i]} es igual a filtro = ${JSON.stringify(filter,null,2)}`)
                
                customLogger.logDebug(`desde el mock, el fechaCreacionSince=${filter.fechaCreacionSince}, fechaCreacionUntil=${filter.fechaCreacionUntil}`)
                if (this._contentItems[i].containsFechaCreacion(filter.fechaCreacionSince, filter.fechaCreacionUntil)) {

                    _filterContentList.push(this._contentItems[i])
                }

                continue;
            }

            


            // Duration
            // ToDo => crear una por defecto, que si arroja todas, no lo paso por filtrado.
            if (filter.durationSince !== voidFilter.durationSince || filter.durationUntil !== voidFilter.durationUntil) {
                customLogger.logDebug(`desde el MOCK, el filterDurationSince=${filter.durationSince}, filterDurationUntil=${filter.durationUntil}`)

                if (this._contentItems[i].containsItemsBetweenTwoDurations(filter.durationSince, filter.durationUntil)) {
                    _filterContentList.push(this._contentItems[i])
                }

                continue;
            } 



        }

        if (_filterContentList.length <= 0) {
            // throw new NoHayResultadosError(`No hay ningun resultado para esta busqueda con estos filtros ${(JSON.stringify(filter, null, 2))} .`)
            throw new NoHayResultadosError(`No hay ningun resultado para esta busqueda con estos filtros ${filter.toString()} .`)
        } else {
            return _filterContentList; 
        }
    
    }

}






   // Tip hoy, crear un anillo de contencion. Identifico el error aca. Si pasa este, voy a tener otra valla en el proximo metodo.
        // Tipo hoy, cada capa tiene un error personalizado, con varios subERrores. pero tiro siempre el mismo general. Varios errores como no pude guardar un dato, no pude entrar. Pero lanzo solo un "error de base de datos".
        // Tip hoy, no puede nuncar tirarme un 505 y se me bloquea. 
        // Tip hoy, no debe saber con especificad el problema. Solo dejalo seguir.
//Tip Hoy: Errores border. Ejemplo archivo roto.



//  // Title
//         if (filter.title !== "") {
            
//             if (this._contentItems[i].title.toLowerCase().includes(filter.title.toLocaleLowerCase())) {     
                
//                 _filterContentList.push(this._contentItems[i])
//             }

//             continue;
//         }

//         if (filter.description !== "") {
            
//             if (this._contentItems[i].description.toLocaleLowerCase().includes(filter.description.toLocaleLowerCase())) {     
                
//                 _filterContentList.push(this._contentItems[i])
//             }
//             continue;
//         }





















