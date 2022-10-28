import { IOrderArray } from "../interfaces/IOrderArray";

// Todo : Hacer que ande. 
export default function orderArray(arr: Array<any>, filterField: string, order: IOrderArray = IOrderArray.ASC) {
    
    let arrayOrdenado = arr.sort((item1, item2) => { 
        
        if (order = IOrderArray.ASC) {
            return (item1._contentType < item2._contentType) ? -1 : 1
          } else  {
            return (item2._contentType < item1._contentType) ? -1 : 1
        }

    });
    
    console.log("el nuevo array ordenado:", arrayOrdenado)
}
  