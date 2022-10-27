import { ErrorExternoAlPasarParams, NoHayResultadosError } from "../error/NoHayResultadosError";
import { IOrderArray } from "../interfaces/IOrder";
import { ContentItem } from "../models/ContentItem";
import { CustomLogger } from "../utils/CustomLogger";
import orderArray from "../utils/helpers";


let _customLogger = new CustomLogger();

export default class PagingUtils{

  /**
   * 
   * @param page:number = 1
   * @param limit:number = 2
   * @param order= asc o desc
   * @param array:ContentItem 
   * @returns lista de contentItem paginados.
   */
  static getContentsItemsByFilterByPagination(page: number = 1, limit: number = 2, order: IOrderArray = IOrderArray.ASC, array : Array<ContentItem> ) : Array<ContentItem> {
                  
    if (page <= 0 || limit <= 0) {
      throw new ErrorExternoAlPasarParams(`La pagina y el limit deben ser mayores a 0. Page=${page}, Limit=${limit}`)
    }
        
    //Todo No funciona // Filter Field. Paginar desde esta lista ordenada. 
    let arrayOrdenado =  orderArray(array, "_contentType",IOrderArray.ASC)
    
    let skip: number = (page - 1) * limit; 
    let contentItemFilterByPagination: Array<ContentItem> = array.slice(skip, limit * page)
    let totalPages: number = Math.ceil(array.length / limit)
    let lastPage: number = totalPages; 

    //Todo hoy: Error si pido pag 10 y hay 5. Error. Hacer 1)pagination.test y contentmanagertest.
    // ? Si page 2,limit 1. Total Items 3. Page x limit = 3.
    // ! Page 3 limit 3. Total items 6. Page x limit = 9.
    if ( page * limit > array.length) {
      throw new NoHayResultadosError(`No hay resultados para Page=${page} Limit${limit}`)
    }
    
    let nextPage: number = page + 1;
    let prevPage: number = page - 1; 

    if (prevPage <= 0 || nextPage >= totalPages) { 
      prevPage = 1;     
      nextPage = totalPages; 
    }


    if (contentItemFilterByPagination.length <= 0) {
      throw new NoHayResultadosError(`No hay ningun resultado para esta busqueda: page=${page}, limit=${limit}, order=${order}`)
    } 
      

    let response = { "page": page, "limit": limit, "order": order, "totalPages": totalPages, "lastPage":lastPage, "totalItems": array.length, "contentItemFilterByPagination": contentItemFilterByPagination, "nextPage": nextPage , "prevPage": prevPage }
    
    _customLogger.logDebug(`${response}`)
    _customLogger.logDebug(`la lista filtrada es: ${(JSON.stringify(contentItemFilterByPagination, null, 2))}`)
    
    return contentItemFilterByPagination; 
    
  }

}











// No se puede creear instancias de la clase. Solo poniendo el nombre
// Opcion a) nombreDeLaClase.metodo = metodoDeClase => Ejemplo => PagingUtils.filterByPage(params) . // No instancio nada, solo lo llamo. // El filterByPage, debe ser static. static=clase, sino es de instancia.
// Opcion b) generar un metodo de instancia. Con constructor. Ejemplo => (new PagingUtils()).filterByPage(params). Necesito una instancia (un new). No lleva static.
// ¿Donde usarias metodos statics? en utils.  Date utils. Resuelven algo y lo devuelven. Parecido a una funcion.
// Si tengo un atributo
// Metodo de classe ejemplo Array.apply(), estoy invocando sin instanciar.

// Singleton => Aseguro que solo hay una instancia en toda la app. No existe el new. contentManager.getInstance().

// Opcion B ejemp
















