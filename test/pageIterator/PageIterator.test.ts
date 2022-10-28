import { ErrorNoExisteLaPagina } from "../../app/error/ErrorNoExisteLaPagina";
import { NoHayResultadosError } from "../../app/error/NoHayResultadosError";
import { IOrderArray } from "../../app/interfaces/IOrderArray";
import { ContentItem } from "../../app/models/ContentItem";
import { ContentItemFilter } from "../../app/models/ContentItemFilter";
import { PageIterator } from "../../app/pageIterator/PageIterator";
import { ContentManagerServiceMock } from "../services/ContentManagerServiceMock";
import { CrearContentItemsBasicos } from "../utils/CrearContentItemsBasicos";

describe('Escenario 1 - PageIterator  - ', () => {
    
    //? Servicio Mock utilizado. Servicio de items prueba CrearContentItemsBasicos = 7.
    let serviceMock = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(7));

    test('Caso 1.1- ServiceManagerMock -  TESTEANDO VARIABLES PRINCIPALES ', () => {
        let filter = new ContentItemFilter();

        let totalPages = new PageIterator(serviceMock,filter,3,IOrderArray.ASC).totalPages
        let lastPage = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC).lastPage
        let currentPage = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC).getCurrentPageNumber()
        let nextPage = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC).nextPage
         
        expect(totalPages).toBe(3);
        expect(lastPage).toBe(3);
        expect(currentPage).toBe(1);
        expect(nextPage).toBe(2)

    });
    
    // Error previousPage negativa.
    // test('Caso 1.2- ServiceManagerMock -  TESTEANDO VARIABLES PRINCIPALES ', () => {
    //     let filter = new ContentItemFilter();

    //     let previousPage = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC).previousPage
        
    //     try {
    //         expect(previousPage).toBe(0);
    //    } catch (error) {
    //     expect(error).toBeInstanceOf(Error)
    //    }

    // });
    
    /**
     * Verifica que coincida el getNextPage(pagina 2), con el serivicioMock.FilterPaged (pagina2)
     */
     test('Caso 1.3- ServiceManagerMock - getNextPage(2) = pagination(2)', () => {
      
        let filter = new ContentItemFilter();
        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)
         
        let responsePageIterator = pageIterator.getFirstPage();
        let nextPage = pageIterator.nextPage
        
        // Deberian ser iguales. 2° Pagina.
        let responseGetNextPage = pageIterator.getNextPage();
        // let currentPage = pageIterator.currentPage 
        let responsePagination2Page = serviceMock.getContentItemsByFilterPaged(filter, 2, 3, IOrderArray.ASC);
         
        expect(responsePageIterator).toHaveLength(3);
         expect(nextPage).toBe(2)
        //  expect(currentPage).toBe(2);
        expect(responseGetNextPage).toEqual(responsePagination2Page)
         
    });
    

    // GetFirstPage
    test('Caso 1.4- ServiceManagerMock -  FirstPage ', () => {
        let filter = new ContentItemFilter();

        let responsePageIterator = new PageIterator(serviceMock,filter,3,IOrderArray.ASC).getFirstPage();
        let responsePagination = serviceMock.getContentItemsByFilterPaged(filter, 1, 3, IOrderArray.ASC);

        expect(responsePageIterator).toHaveLength(3);
        // Pagina 1 iterator should be === a Pagina 1 pagination.
        expect(responsePageIterator).toEqual(responsePagination)
    });
    

    //tODO LastPage

    //Todo NextPage
    
    //Todo PreviousPage
    
    //Todo Pagina no existente

    
    //Todo Parametros Negativos
   

});