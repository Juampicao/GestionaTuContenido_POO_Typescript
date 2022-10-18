import { ErrorExternoAlPasarParams, NoHayResultadosError } from "../../app/error/NoHayResultadosError";
import { IContentType } from "../../app/interfaces/IContentType";
import { ContentItem } from "../../app/models/ContentItem";
import { ContentItemFilter } from "../../app/models/ContentItemFilter";
import { getContentsItemsByFilterByPagination } from "../../app/pagination/pagination";
import { ContentManagerServiceMock } from "../services/ContentManagerServiceMock";

describe('Escenario 1 - Pagination  - ServiceMock', () => {
    
    let contenido1 = new ContentItem()
       contenido1.title = "1"
    
    let contenido2 = new ContentItem()
        contenido2.title = "2"
   
    let contenido3 = new ContentItem()
        contenido3.title = "3"
    
    let contenido4 = new ContentItem()
        contenido4.title = "4"

    let contenido5 = new ContentItem()
        contenido5.title = "5"
        contenido5.contentType = IContentType.Article

    let contenido6 = new ContentItem()
        contenido6.title = "6"
    
    let contenido7 = new ContentItem()
        contenido6.title = "7"
    
    let contentItemsList: Array<ContentItem> = [contenido1, contenido2, contenido3, contenido4, contenido5, contenido6,contenido7];

    // //  Pasar todos los parametros 
    // test('Caso 1.1 - Pasar parametros default page=1, limit 2', () => {
        
    //     let response: Array<ContentItem> = getContentsItemsByFilterByPagination(undefined, undefined,"a", contentItemsList);

    //     // 1,2
    //     expect(response).toHaveLength(2)
    // });

    
    // test('Caso 1.2 - Parametros negativos - Error', () => {
        
    //     try {  
    //         let response: Array<ContentItem> = getContentsItemsByFilterByPagination(0,0,"a", contentItemsList);
            
    //         expect(response).toHaveLength(2);
            
    //     } catch (error) {
    //         expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
    //     }
        
    // });
    
    // test('Caso 1.3- Page 2, limit 3.', () => {
        
    //     let response: Array<ContentItem> = getContentsItemsByFilterByPagination(2,3,"a", contentItemsList);

    //     // 4,5,6
    //     expect(response).toHaveLength(3); 
    // });

    // //  Error no hay contenidos.
    // test('Caso 1.4- Error no hay contenidos', () => {
        
    //     try {
    //         let response: Array<ContentItem> = getContentsItemsByFilterByPagination(3,4,"a", contentItemsList);
    
    //         expect(response).toHaveLength(3);
    //     } catch (error) {
    //         expect(error).toBeInstanceOf(NoHayResultadosError)
    //     }
    // });

    test('Caso 1.5- Page 3, limit 3 (de 7 elementos)', () => {
        
        try {
            let response: Array<ContentItem> = getContentsItemsByFilterByPagination(3,3,"a", contentItemsList);
    
            expect(response).toHaveLength(1);
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError)
        }
    });

});

