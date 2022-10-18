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

    protected _contentItems: Array<ContentItem>;

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

            // Description
            // if (filter.description !== "") {
                
            //     if (this._contentItems[i].description.toLocaleLowerCase().includes(filter.description.toLocaleLowerCase())) {     
                    
            //         _filterContentList.push(this._contentItems[i])
            //     }
            //     continue;
            // }
            
            // Nueva Description
            if (filter.description !== "") {
                
                if (this._contentItems[i].containDescription(filter.description)) {     
                    
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

            // Fecha
            if (filter.fechaCreacionSince !== voidFilter.fechaCreacionUntil || filter.fechaCreacionUntil !== voidFilter.fechaCreacionSince) {
                
                customLogger.logDebug(`desde el mock, el fechaCreacionSince=${filter.fechaCreacionSince}, fechaCreacionUntil=${filter.fechaCreacionUntil}`)
                if (this._contentItems[i].containsFechaCreacion(filter.fechaCreacionSince, filter.fechaCreacionUntil)) {

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

    /**
     * ? Pagination
     * @param page 
     * @param limit
     * @param order
     * 
     * @returns lista de _contenetItems. 
     * ? Puede devolver solo 1 pagina, con los contentItems limitados o Todas las paginas pero contentItems limitados por pagina.
     * 
    */
    getContentsItemsByFilterByPagination(page: number = 1, limit: number = 2, order: any ) : Array<ContentItem> {
        
        
        let filterContentListByPagination: Array<ContentItem> = []; 

        if (page < 0 || limit < 0) {
            throw new NoHayResultadosError(`La pagina y el limit deben ser mayores a 0.`)
        }

        //Todo Ordernar

        //Todo Limitar a 2 items por pagina.
        
        filterContentListByPagination.slice(0, limit);
        
        //Todo Return Pagina 2.
        let skip: number = (page - 1) * limit; 


        return filterContentListByPagination;

    }
}

// // Todo: Fecha creacion no puedo no inicairlizar, por que en ts.config esta puesto que me lo pida.
// Tip: Siempre el hueso. Donde parar el paginado? el hueso.
// // Servicio retorna la lista, el paginado lo recibe, y lo escupe al front.
// Todo: Paginado. Pararme en el hueso. Bajo nivel.
// // Pero la interfaaz no pide el paginado al principio.
// // Cuidar mi aplicacion, el paginator. depende de un parametro y me pide pagina -2, throw error. Validar que sea valido.
// Ordenar segun lo pedido, como ordeno?. Parametro que recibe, el 3° por ejemplo, por ascendente, descendente.
// Verificar que el page iterator size, coincida con los limits del pagination.
// ¿Cuantas pagians hay?¿ cual es la ultima? ¿adonde va? ¿Cuantos elementos hay? (resolverlo desde el mock, cuantos envia? eso va a repercutir con cantidad de paginas, cual es la ulitma).
// Manejar grados de informacion:
// Dato factico, cuantas cuotas quiere el cliente. no te defrauda
// Caso items, cuantos items hay, es el factico. El relativo, la cantida de paginas.
// 1° Paginado, 2° Paginador, selecciona la pagina. ¿como se en que pagina estas? Voy para la 3, la de adelante. ¿quien sabae donde estoy ahora? memoria.
// Todo: Armar logica de paginado. Test, ordenamiento testimonial, al menos escrito.
// Todo: Total de contentItems.
// Todo:2° Page iterator.
// TOdo: terminar el tostring(), tojson() en cada contentItem y contentFilter.


// Todo 1° => Crear una lista con 6 items.
// Todo 2° => Metodo con page, limit. Retornar los primeros 2 elementos.
// Todo 3° => Metodo con page, limit. Retornar la 2° pagina, con los siguietnes de 2 elementos.
// Todo 4° => Utilziar este metodo, con order.
// Todo 5° => Utilziar este metodo, pero con la lista de elementos ya filtrados por el mock.


















