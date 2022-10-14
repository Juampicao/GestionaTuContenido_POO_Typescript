import { NoHayResultadosError } from "../../app/error/NoHayResultadosError";
import { IContentItemRating } from "../../app/interfaces/IContentItemRating";
import { IContentType } from "../../app/interfaces/IContentType";
import { ContentItem } from "../../app/models/ContentItem";
import { ContentItemFilter } from "../../app/models/ContentItemFilter";
import { IContentManagerService } from "../../app/services/IContentManagerService";
import { FechaCreacionSinceDefault, FechaCreacionUntilDefault } from "../../app/utils/ConfigurationENV";
import { CustomLogger } from "../../app/utils/CustomLogger";
import { CrearDosItems } from "../utils/CrearDosItems";



let customLogger = new CustomLogger()

export class ContentManagerServiceMock implements IContentManagerService{

    private _contentItems: Array<ContentItem>;
 
    constructor() {  
        // Objeto creado, retorna una lista con 2 objetos creados. 
        this._contentItems = new CrearDosItems().obtenerContentItemsList2ContentItems();
    }
 
    // Creo items para pushear al array. 
    crear(contentItem : ContentItem) {
       customLogger.logDebug("Creando un nuevo contentItem..."); 
        this._contentItems.push(contentItem)
    }
  
    getAllContentsItems(): Array<ContentItem> {
        return this._contentItems
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
         
            // ToDo: que sea parecido (3 letras?)

            // Title
            if (filter.title !== "") {
                
                if (this._contentItems[i].title.toLowerCase().includes(filter.title.toLocaleLowerCase())) {     
                    
                    _filterContentList.push(this._contentItems[i])
                }

                continue;
            }

            // Descripcion
            if (filter.description !== "") {
                
                if (this._contentItems[i].description.toLocaleLowerCase().includes(filter.description.toLocaleLowerCase())) {     
                    
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
            
            // ContentType
            if (filter.contentType !== "") {
                
                if (this._contentItems[i].contentType === filter.contentType) {     
                    
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

            // Duration
            // ToDo => crear una por defecto, que si arroja todas, no lo paso por filtrado.
            if (filter.durationSince !== voidFilter.durationSince || filter.durationUntil !== voidFilter.durationUntil) {
                customLogger.logDebug(`desde el MOCK, el filterDurationSince=${filter.durationSince}, filterDurationUntil=${filter.durationUntil}`)

                if (this._contentItems[i].containsItemsBetweenTwoDurations(filter.durationSince, filter.durationUntil)) {
                    _filterContentList.push(this._contentItems[i])
                }

                continue;
            } 

            // Fecha
            if (filter.fechaCreacionSince !== voidFilter.fechaCreacionUntil || filter.fechaCreacionUntil !== voidFilter.fechaCreacionSince) {
                
                customLogger.logDebug(`desde el mock, el fechaCreacionSince=${filter.fechaCreacionSince}, fechaCreacionUntil=${filter.fechaCreacionUntil}`)
                if (this._contentItems[i].containsFechaCreacion(filter.fechaCreacionSince, filter.fechaCreacionUntil)) {

                    _filterContentList.push(this._contentItems[i])
                }

                continue;
            }

        }

        if (_filterContentList.length <= 0) {
            throw new NoHayResultadosError(`No hay ningun resultado para esta busqueda con estos filtros ${(JSON.stringify(filter, null, 2))} .`)
            // throw new NoHayResultadosError(`No hay ningun resultado para esta busqueda con estos filtros ${filter.toString()} .`)
        } else {
            return _filterContentList; 
        }
    
    }
}
















