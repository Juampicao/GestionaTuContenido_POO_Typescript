import { ErrorReturnPaginaPageIterator } from "../../app/error/ErrorReturnPaginaPageIterator";
import { ErrorExternoAlPasarParams } from "../../app/error/NoHayResultadosError";
import { IContentType } from "../../app/interfaces/IContentType";
import { IOrderArray } from "../../app/interfaces/IOrderArray";
import { ContentItem } from "../../app/models/ContentItem";
import { ContentItemFilter } from "../../app/models/ContentItemFilter";
import { PageIterator } from "../../app/pageIterator/PageIterator";
import { CustomLogger } from "../../app/utils/CustomLogger";
import { ContentManagerServiceMock } from "../services/ContentManagerServiceMock";
import { CrearContentItemsBasicos } from "../utils/CrearContentItemsBasicos";

let customLogger = new CustomLogger(); 

describe('Escenario 1 - PageIterator - Principal ', () => {
    
    //? Servicio Mock utilizado. Servicio de items prueba CrearContentItemsBasicos = 7.
    let serviceMock = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(7));

    /**
     * ? GetCurrentPage()
     * Verifica que los valores iniciales sean correctos.
     */
    test('Caso 1.1- ServiceManagerMock - variables iniciales ', () => {
        
        let filter = new ContentItemFilter();
        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)
        
        let totalPages = pageIterator.getTotalPageNumber();
        let lastPage = pageIterator.getTotalPageNumber() ;
        let currentPage = pageIterator.getCurrentPageNumber();
        let nextPage = pageIterator.getCurrentPageNumber() + 1;
       
        expect(totalPages).toBe(3);
        expect(lastPage).toBe(3);
        expect(currentPage).toBe(1);
        expect(nextPage).toBe(2)

    });
    
    
    /**
     * ? GetNextPage()
     * Verifica que coincida el getNextPage(pagina 2), con el serivicioMock.FilterPaged (pagina2)
     */
     test('Caso 1.2- ServiceManagerMock - getNextPage(2) = pagination(2)', () => {
      
        let filter = new ContentItemFilter();
        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)
        
        let firstPagePageIterator = pageIterator.getFirstPage();
        let nextPagePageIterator = pageIterator.getCurrentPageNumber() + 1; 
        
        // Next Page deberia ser la 2° pagina. 
        let PageIteratorGetNextPage = pageIterator.getNextPage(); 
        // Pagination para verificar que sean iguales. (2° Pagina)
        let Pagination2Page = serviceMock.getContentItemsByFilterPaged(filter, 2, 3, IOrderArray.ASC);
         
        expect(firstPagePageIterator).toHaveLength(3);
        expect(nextPagePageIterator).toBe(2)
        expect(PageIteratorGetNextPage).toEqual(Pagination2Page)

    });
    
    /**
    * ? getLastPage().
    * Verifica que pageIterator getLastPage() = pagination last page.
    */
    test('Caso 1.3- ServiceManagerMock -  Last Page PageIterator = Ultima Page de pagination', () => {
        let filter = new ContentItemFilter();

        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)

        // LastPage contains 1 item. (son 7 total, 3, 3, y 1).
        let PageIteratorLastPage = pageIterator.getLastPage();
        
        // Pagination para chequear que sean iguales. Ultima pagina es la 3°. (3,3,1).
        let PaginationLastPage = serviceMock.getContentItemsByFilterPaged(filter, 3, 3, IOrderArray.ASC);

        expect(PageIteratorLastPage).toHaveLength(1);
        expect(PageIteratorLastPage).toEqual(PaginationLastPage)

    });

    
    /**
    * ? GetParticularPage().
    * Verifica que pageIterator.GetParticularPage() = pagination busqueda de la pagina 2.
    */
    test('Caso 1.6- ServiceManagerMock -  GetParticularPage()', () => {
        let filter = new ContentItemFilter();

        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)

        let PageIteratorSecondPage = pageIterator.getParticularPage(2);
        // Pagination para chequear que sean iguales. 2° Pagina.
        let PaginationSecondPage = serviceMock.getContentItemsByFilterPaged(filter, 2, 3, IOrderArray.ASC);

        expect(PageIteratorSecondPage).toHaveLength(3);
        expect(PageIteratorSecondPage).toEqual(PaginationSecondPage)

    });

    
});


describe('Escenario 2 - PageIterator - GetPreviousPage()', () => {
   
    //? Servicio Mock utilizado. Servicio de items prueba CrearContentItemsBasicos = 7.
    let serviceMock = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(7));

    /**
     * ! Caso Error.
     * ! getPreviuosPage()
     * Caso pagina 1/3, quiero ir para atras. 
     */
    test('Caso 2.1- ServiceManagerMock - ERROR ', () => {
        try {
            let filter = new ContentItemFilter();
            
            let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)
            let previousPage = pageIterator.getPreviousPage(); 
            
            expect(previousPage).toBe(0);
        } catch (error) {

            expect(error).toBeInstanceOf(ErrorReturnPaginaPageIterator)
        }

    });


    /**
     * Simulacion de pageIterator real. 1° LastPage, 2° previuosPage.
     * Deberia retornar 2.
     */
    test('Caso 2.2- ServiceManagerMock - 1° LastPage 2° PreviousPage ',  () => {
       
        let filter = new ContentItemFilter();
            
        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)

        pageIterator.getLastPage();

        pageIterator.getPreviousPage()
        
        const actualCurrentPage =  pageIterator.getCurrentPageNumber();

        expect(actualCurrentPage).toBe(2);
    });



});


describe('Escenario 3 - PageIterator - GetNextPage() ', () => {
   
    //? Servicio Mock utilizado. Servicio de items prueba CrearContentItemsBasicos = 7.
    let serviceMock = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(7));
   
    //? NextPage 2.
    test('Caso 3.1- ServiceManagerMock - Exito ', () => {
        let filter = new ContentItemFilter();
        
        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)
        pageIterator.getFirstPage();
        let pageIteratorNextPage = pageIterator.getNextPage();
    
        // Deberia ser igual a.
        let PaginationSecondPage = serviceMock.getContentItemsByFilterPaged(filter, 2, 3, IOrderArray.ASC);

        
        expect(pageIteratorNextPage).toHaveLength(3);
        expect(pageIteratorNextPage).toEqual(PaginationSecondPage) 
    });

   
    //? 1° First Page, 2° NextPage 3° NextPage, deberia estar en la pagina 3. 
    test('Caso 3.2- ServiceManagerMock - Exito  ', () => {
        let filter = new ContentItemFilter();
        
        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)
        pageIterator.getFirstPage();
        pageIterator.getNextPage();
        let pageIteratorNextPage = pageIterator.getNextPage();
    
        // Deberia ser igual a.
        let PaginationThirdPage = serviceMock.getContentItemsByFilterPaged(filter, 3, 3, IOrderArray.ASC);

        
        expect(pageIteratorNextPage).toHaveLength(1);
        expect(pageIteratorNextPage).toEqual(PaginationThirdPage) 
    });
    
    
    
    // ? GetNextPage()
    //! Caso Pagina 4/3, no debería poder ir a la pagina siguiente. 
   
    test('Caso 3.3- ServiceManagerMock - Error no existe pagina.  ', () => {
        try {
          let filter = new ContentItemFilter();
        
            let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)
           
           pageIterator.getLastPage();
           pageIterator.getNextPage();

           expect(pageIterator).not.toBeNull();
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorReturnPaginaPageIterator)
        }
    });
     
     

})


describe('Escenario 4 - PageIterator - GetParticularPage() ', () => {

    //? Servicio Mock utilizado. Servicio de items prueba CrearContentItemsBasicos = 7.
    let serviceMock = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(7));

     /**
    * ! Caso Error 
    * ! GetParticularPage().
    * Verifica que pageIterator.GetParticularPage() no pueda ir a la pagina 5, el totalPage es 3.
    */
    test('Caso 4.1 - ServiceManagerMock - Error - No existe la pagina.', () => {
        
        try {
            let filter = new ContentItemFilter();
    
            let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)
    
            let PageIteratorSecondPage = pageIterator.getParticularPage(5);
            let PaginationSecondPage = serviceMock.getContentItemsByFilterPaged(filter, 5, 3, IOrderArray.ASC);
    
            expect(PageIteratorSecondPage).toHaveLength(3);
            expect(PageIteratorSecondPage).toEqual(PaginationSecondPage)
            
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorReturnPaginaPageIterator)
        }

    });

    /**
     * ? getParticularPage(3) = pagination 3° pagina.
     */
    test('Caso 4.2 - ServiceManagerMock - Caso exito.', () => {
            
        let filter = new ContentItemFilter();

        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)

        let PageIteratorThirdPage = pageIterator.getParticularPage(3);
        let PaginationThirdPage = serviceMock.getContentItemsByFilterPaged(filter, 3, 3, IOrderArray.ASC);
    
        expect(PageIteratorThirdPage).toHaveLength(1)
        expect(PageIteratorThirdPage).toEqual(PaginationThirdPage)
    });


});


describe('Escenario 5 - PageIterator - Limits ', () => {
    
    let serviceMock = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(7));

    //! Limit negativo desde constructor.
    test('Caso 5.1 - ServiceManagerMock - Limit negativo desde constructor.', () => {
        
        try {
            let filter = new ContentItemFilter();
    
            let pageIterator = new PageIterator(serviceMock, filter, 300, IOrderArray.ASC)

            expect(pageIterator).toBeNull()
            
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }

    });

    //! Limit min. Actual -2.
    test('Caso 5.2 - ServiceManagerMock - Cambiar una vez creado por uno negativo.', () => {
        try {
            let filter = new ContentItemFilter();
    
            let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)

            pageIterator.limit = -10;

            expect(pageIterator).toBeNull()
            
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }

    });

    //! Limit max. Actual 300.
    test('Caso 5.3 - ServiceManagerMock - Cambiar una vez creado por uno maximo a 300.', () => {
        try {
            let filter = new ContentItemFilter();
    
            let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)

            pageIterator.limit = -300;

            expect(pageIterator).toBeNull()
            
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }
    });

    //? Pasa de limit 3 a 1. Total Page ahora 7.
    test('Caso 5.4 - ServiceManagerMock - Cambiar una vez creado, verificar paginas totales.', () => {
       
        let filter = new ContentItemFilter();

        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)

        pageIterator.limit = 1;

        expect(pageIterator.getTotalPageNumber()).toBe(7);
    });


    /**
     * ? Pasa de limit 3 y 3 paginas, a limit 2 y 4 paginas.
     * Last Page nueva = 4. PreviousPage = 3.
     */
    test('Caso 5.5 - ServiceManagerMock - Cambiar una vez creado, verificar paginas totales.', () => {
       
        let filter = new ContentItemFilter();

        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC)

        pageIterator.limit = 2; // Hay 4 paginas.
        pageIterator.getLastPage();
        
        let getPreviousPage = pageIterator.getPreviousPage(); 
        let getPreviosPageNumber = pageIterator.getTotalPageNumber() - 1;
        let PaginationPreviousPage = serviceMock.getContentItemsByFilterPaged(filter, 3, 2, IOrderArray.ASC);


        expect(getPreviosPageNumber).toBe(3);
        expect(getPreviousPage).toEqual(PaginationPreviousPage);
    });

 

});

describe('Escenario 6 - PageIterator vs ContentManager - Filtering ', () => {

    let contentItemList = [
        new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"]),
        new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"]),
        new ContentItem("3 Angular", "3 Aprendiendo Angular", IContentType.Article, ["typescript"]),
        new ContentItem("4 Angular", "4 Aprendiendo Angular", IContentType.Pdf, ["react"]),
    ]
    
    let serviceMock = new ContentManagerServiceMock(contentItemList);
    
    /**
    * ? Filter con titulo mock y type video. 
    */
    test('Caso 6.1- getContentItemsByFilterPaged - .', () => {
       
        let filter = new ContentItemFilter();
            filter.tags = ["javascript"];
        
        
        let response = serviceMock.getContentItemsByFilterPaged(filter, 1, 3, IOrderArray.ASC);
        
        customLogger.logDebug(`Filter 6.1 - serviceMockFilter => ${JSON.stringify(filter, null, 2)}`)
        expect(response).toHaveLength(1);


    });

     test('Caso 6.2- PageIterator ', () => {
       
        let filter = new ContentItemFilter();
         filter.tags = ["typescript"];
         filter.contentType = IContentType.Article;
        
        let pageIterator = new PageIterator(serviceMock, filter, 3, IOrderArray.ASC).getFirstPage()
         
        
        customLogger.logDebug(`Filter 6.2 - PageIterator => ${JSON.stringify(filter, null, 2)}`)
        expect(pageIterator).toHaveLength(1);
    });

});



//Todo hoy, test con pageIterator con contentManager, no con el mock.
