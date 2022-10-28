import { ErrorExternoAlPasarParams, NoHayResultadosError } from "../../app/error/NoHayResultadosError";
import { IOrderArray } from "../../app/interfaces/IOrderArray";
import { ContentItem } from "../../app/models/ContentItem";
import PagingUtils from "../../app/pagination/Pagination";
import { CrearContentItemsBasicos } from "../utils/CrearContentItemsBasicos";

   
describe('Escenario 1 - PAGINATION  ', () => {
    
    // //? Utilizo para probar el Servicio de prueba CrearContentItemsBasicos. 
    let contentItemsList = new CrearContentItemsBasicos().getParticularContentItemsCuantity(7);

     //  Parametros Default.
    test('Caso 1.1 - Default =>  page=1, limit 2', () => {
        
        let response: Array<ContentItem> = PagingUtils.getContentsItemsByFilterByPagination(undefined, undefined,IOrderArray.ASC, contentItemsList);

        expect(response).toHaveLength(2)
    });

    
    // Negativo
    test('Caso 1.2 - Parametros negativos - Error', () => {
        
        try {  
            let response: Array<ContentItem> = PagingUtils.getContentsItemsByFilterByPagination(-1,1,IOrderArray.ASC, contentItemsList);
            
            expect(response).toHaveLength(2);
            
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }
        
    });
    
    // Limit 3
    test('Caso 1.3- Page 2, limit 3.', () => {
        
        let response: Array<ContentItem> = PagingUtils.getContentsItemsByFilterByPagination(2,3,IOrderArray.ASC, contentItemsList);

        expect(response).toHaveLength(3); 
    });

    // Error limit diferente a respeusta esperada.
    test('Caso 1.4-  limit 3 , expect 4.', () => {
        try {
            
            let response: Array<ContentItem> = PagingUtils.getContentsItemsByFilterByPagination(2,2,IOrderArray.ASC, contentItemsList);
    
            expect(response).toHaveLength(3); 
        } catch (error) {
            //Todo especificar tipo de error.
            expect(error).toBeInstanceOf(Error)
        }
    });

  
    // Caso Particular.
    test('Caso 1.5- Page 3, limit 3 (de 7 elementos)', () => {
        
            let response: Array<ContentItem> = PagingUtils.getContentsItemsByFilterByPagination(3,3,IOrderArray.ASC, contentItemsList);
    
            // 7 numeros. 1,2,3 / 4,5,6 / 7. Recibo 1.
            expect(response).toHaveLength(1);
       
    });

   // No existe la pagina,
    test('Caso 1.6- Page 5 no existe.', () => {
        try {
            let response: Array<ContentItem> = PagingUtils.getContentsItemsByFilterByPagination(5,3,IOrderArray.ASC, contentItemsList);
    
            expect(response).toHaveLength(1);
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError);
        }
       
    });

    
});