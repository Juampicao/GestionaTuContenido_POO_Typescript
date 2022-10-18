import { ErrorExternoAlPasarParams, NoHayResultadosError } from "../error/NoHayResultadosError";
import { ContentItem } from "../models/ContentItem";
import { CustomLogger } from "../utils/CustomLogger";


let _customLogger = new CustomLogger();

/**
 * 
 * @param page:number = 1
 * @param limit:number = 2
 * @param order 
 * @param array:ContentItem 
 * @returns lista de contentItem paginados.
 */
export  function getContentsItemsByFilterByPagination(page: number = 1, limit: number = 2, order: any, array : Array<ContentItem> ) : Array<ContentItem> {
                
  if (page <= 0 || limit <= 0) {
      throw new ErrorExternoAlPasarParams(`La pagina y el limit deben ser mayores a 0.`)
  }
    
  let arrayOrdenado: Array<ContentItem> = [];

  function orderArray(arr: Array<any>, filterField: string, order:string = "asc") {
  
  arrayOrdenado = arr.sort((item1, item2) => {

    if (order = "desc") {
      return (item1._contentType < item2._contentType) ? -1 : 1
    } else  {
      return (item2._contentType < item1._contentType) ? -1 : 1
    }

  });
  console.log("el array ordenado:", arrayOrdenado)

}
//Todo filtrado dinamico por diferentes fields.
orderArray(array, "_contentType","asc")
  
  
  let skip: number = (page - 1) * limit; 
  let contentItemFilterByPagination: Array<ContentItem> = array.slice(skip, limit * page)
  let totalPages: number = Math.ceil(array.length / limit)
  let lastPage: number = totalPages; 


  let nextPage: number = page + 1;
  let prevPage: number = page - 1; 

  if (prevPage <= 0 || nextPage >= totalPages) { 
    prevPage = 1;     
    nextPage = totalPages; 
  }


  if (contentItemFilterByPagination.length <= 0) {
    throw new NoHayResultadosError(`No hay ningun resutlado para esta busqueda: page=${page}, limit=${limit}, order=${order}`)
  } 
    

  let response = { "page": page, "limit": limit, "order": order, "totalPages": totalPages, "lastPage":lastPage, "totalItems": array.length, "contentItemFilterByPagination": contentItemFilterByPagination, "nextPage": nextPage , "prevPage": prevPage }
  
  _customLogger.logDebug(`${response}`)
  _customLogger.logDebug(`la lista filtrada es: ${(JSON.stringify(contentItemFilterByPagination, null, 2))}`)
  
  return contentItemFilterByPagination; 
  
}
























