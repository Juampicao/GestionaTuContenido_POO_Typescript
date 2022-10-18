import { ErrorExternoAlPasarParams } from "../error/NoHayResultadosError";
import { ContentItem } from "../models/ContentItem";

export function pruebaPagination(page: number = 1, limit: number = 2) {

  let numeros: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  
  if (page <= 0 || limit <= 0) {
      throw new ErrorExternoAlPasarParams(`La pagina y el limit deben ser mayores a 0.`)
  }

  let skip: number = (page - 1) * limit; 
  
  let skipNumbers: Array<number> = numeros.slice(skip, limit * page); 

  console.log(`skipNumbers es ${skipNumbers}`)
  return  skipNumbers
}

  
  //? Logica pensada para resolver el paginado.
  //!                  Desde ,Hasta   (page - 1) * limit
  // 1°, page 1, limit 2 // ? 0, 2     (1-1) * 2
  // 2°, page 2, limit 2 // ? 2, 4     (2-1) * 2
  // 3°  page 3, limit 2 // ? 4, 6     (3-1) * 2

  // 4° page 1, limit 3  // ? 0, 3     (1-1) * 3
  // 5° page 2, limit 3  // ? 3, 6     (2-1) * 3
  // 6° page 3, limit 3  // ? 6, 9     (3-1) * 3
  
  //? Logica para cuantas paginas total
  //! TotalPages = Math.ceil(array.length/ limit)
  // Array.length= 10. Limit=2.  10/2 = 5 pages
  // Array.length= 20. Limit=2.  10/2 = 10 pages
  // Array.length= 9. Limit=2.  9/2 = 4.5 pages (redondear siempre para arriba)
  // Array.length= 7. Limit=2.  7/2 = 3.5 pages (redondear siempre para arriba). 

  
  // Prueba Sort Function
  let arrayPrueba: Array<any> = [
  
  {
    title: "camila",
    descripcion: "Camila de mi cora", 
  },
  {
    title: "belen",
    descripcion: "belencita de mi cora", 
  },
  {
    title: "agustina",
    descripcion: "agustina de mi cora", 
  }
]

  let arrayOrdenado: Array<ContentItem> = [];
  /**
   * 
   * @param arr array a ordenar
   * @param filterField campo a ordenar.
   * @param order a = asc | d = desc 
   */
  function orderArray(arr: Array<any>, filterField: string, order:string = "a") {
    
    arrayOrdenado = arr.sort((item1, item2) => {

      return (item1.title < item2.title) ? -1 : 1
    });
    // console.log(arrayOrdenado)

  }

  orderArray(arrayPrueba, "title")
  console.log(arrayOrdenado)



