import { ErrorExternoAlPasarParams, NoHayResultadosError } from "../../app/error/NoHayResultadosError";
import { IContentItemRating } from "../../app/interfaces/IContentItemRating";
import { IContentType } from "../../app/interfaces/IContentType";
import { ContentManager } from "../../app/manager/ContentManager";
import { ContentItem } from "../../app/models/ContentItem";
import { Duration } from "../../app/models/Duration";
import { PageIterator } from "../../app/pageIterator/PageIterator";
import { CustomLogger } from "../../app/utils/CustomLogger";
import { ContentManagerServiceMock } from "../services/ContentManagerServiceMock";
import { CrearContentItemsBasicos } from "../utils/CrearContentItemsBasicos";
import { CrearDosItems } from "../utils/CrearDosItems";

let _customLogger = new CustomLogger(); 

let servicioContentManager = new ContentManagerServiceMock();

/**
// //  * 1) Title
* 2 Bis) TitleOrDescription
 * 2) ContentType
 * 3) Tag
 * 4) Description
 * 5) Duration
 * 6) Rating
 * 7) Fecha
 * 8) Page Iterator
 */



//TODO hoy. Pageiterator. 1) igual a limitdefault. 2) totalPages.3) probar el length que devuelve.
// tip hoy n oser rendundante con los test. Probar lo que se necesita de aca.


//? - - - - - - - - -  - - - TitleOrDescription  - - - - - - - - -  - - - //  
describe('Escenario 02 BIS - Test ContentManager - TITLE OR DESCRIPTION ', () => {
   
    //? Titulo exito.
    test('Caso 2.1 bis - title  "angular', () => {

        let contentManager1 = new ContentManager(servicioContentManager);
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTitleOrDescription("angular").getFirstPage();
 
        expect(response).toHaveLength(1);

    });

    //? Descripcion exito
    test('Caso 2.2 bis - description "experto', () => {

        let contentManager1 = new ContentManager(servicioContentManager);
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTitleOrDescription("experto").getFirstPage();
 
        expect(response).toHaveLength(1);

    });
    
    //? Descripcion exito
    test('Caso 2.3 bis - Buscar filtro title or description "programacion', () => {

        let contentManager1 = new ContentManager(servicioContentManager);
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTitleOrDescription("programacion").getFirstPage();
        
        expect(response).toHaveLength(2);

    });

    //! No contiene ninguno error
    test('Caso 2.4 bis - Buscar filtro title or description "programacion', () => {

        try {

            let contentManager1 = new ContentManager(servicioContentManager);
            
            let response: Array<ContentItem> = contentManager1.getContentsItemsByTitleOrDescription("no contiene").getFirstPage();
            
            expect(response).toHaveLength(2);
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError)   
        }

    });
    
    //! Menor a 3 letras error
    test('Caso 2.5 bis - Titulo o descripcion menor a 3 letras', () => {
        try {
        
            let contentManager1 = new ContentManager(servicioContentManager);
            
            let response: Array<ContentItem> = contentManager1.getContentsItemsByTitleOrDescription("de").getFirstPage();
     
            expect(response).toHaveLength(1);

        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    });

});
//? - - - - - - - - -  - - - CONTENTTYPE  - - - - - - - - -  - - - //  

describe('Escenario 02 - Test ContentManager - CONTENTTYPE ', () => {
  
    //todo
    //? Exite 1 ContentType
    test('Caso 2.1 - Buscar contentType "Video', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByContentType(IContentType.Video).getFirstPage();

        expect(response).toHaveLength(1);

    });

    //! Error no existe.
    test('Caso 2.2 - Buscar contentType "Video', () => {

        try {
            
            let contentManager1 = new ContentManager(servicioContentManager); 
            
            let response: Array<ContentItem> = contentManager1.getContentsItemsByContentType(IContentType.Video).getFirstPage();
    
            expect(response).toHaveLength(1);
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError)
        }

    });

});

//? - - - - - - - - -  - - - TAGS  - - - - - - - - -  - - - //  

describe('Escenario 03 - Test ContentManager - TAGS ', () => {


    //?  Exito tag.
    test('Caso 3.1 - Buscar filtro tag "angular', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: ContentItem[] = contentManager1.getContentsItemsByTag(["angular"]).getFirstPage();
 
        expect(response).toHaveLength(1);
    });

    //! Error no existe.
    test('Caso 3.2 - Buscar por tag', () => {

        try {
            
            let contentManager1 = new ContentManager(servicioContentManager);   
            
            let response: ContentItem[] = contentManager1.getContentsItemsByTag(["No existe"]).getFirstPage();
     
            expect(response).toHaveLength(1);
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError)
        }
    });
});


//? - - - - - - - - -  - - - DURATION  - - - - - - - - -  - - - //  

describe('Escenario 05 - Test ContentManager - Duration ', () => {

    //? Exito 2 
    test('Caso 5.1 - Buscar items por 2 parametros de duration', () => {
         
        let contentManager1 = new ContentManager(servicioContentManager); 

        let filterSince = new Duration();
        filterSince.setDuration(0, 10, 0);
        let filterUntil = new Duration();
        filterUntil.setDuration(2, 0, 0);

        let response: Array<ContentItem> = contentManager1.getContentsItemByDuration(filterSince, filterUntil).getFirstPage();


        expect(response).toHaveLength(2);
    })
    
    //? Exito 1
    test('Caso 5.2 - Buscar items por 2 parametros de duration. ', () => {
        let contentManager1 = new ContentManager(servicioContentManager); 

        let filterSince = new Duration();
        filterSince.setDuration(0,30,30); // 30 MINUTOS
        let filterUntil = new Duration();
        filterUntil.setDuration(2, 10, 0);

        console.log(`ContentManager test , La durationSince=${filterSince.getDuration()} y durationUntil ${filterUntil.getDuration()}.`)
      
        let response: Array<ContentItem> = contentManager1.getContentsItemByDuration(filterSince, filterUntil).getFirstPage();
            
        expect(response).toHaveLength(2);
    })
    
    //? Exito parametros default.
    test('Caso 5.3 - Sin parametros', () => {
         
        let contentManager1 = new ContentManager(servicioContentManager); 

        let response: Array<ContentItem> = contentManager1.getContentsItemByDuration().getFirstPage();
        
        expect(response).toHaveLength(2);
    })
    
    //? Solo durationSince.
    test('Caso 5.4 - Solo durationSince', () => {
         
        let contentManager1 = new ContentManager(servicioContentManager); 
       
        let filterSince = new Duration();
        filterSince.setDuration(0, 5, 0);

        let response: Array<ContentItem> = contentManager1.getContentsItemByDuration(filterSince).getFirstPage();
        
        expect(response).toHaveLength(2);
    })

     //! Error no existe.
    test('Caso 5.5 - Solo durationSince', () => {
        try {
            
            let contentManager1 = new ContentManager(servicioContentManager); 
           
            let filterSince = new Duration();
            filterSince.setDuration(0, 5, 0);
            let filterUntil = new Duration();
            filterUntil.setDuration(0, 6, 0)
            
            let response: Array<ContentItem> = contentManager1.getContentsItemByDuration(filterSince, filterUntil).getFirstPage();
            
            expect(response).toHaveLength(2);
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError)
        }
    })
});

//? - - - - - - - - -  - - - RATING  - - - - - - - - -  - - - //  

describe('Escenario 06 - Test ContentManager - RATING ', () => {

    //? Exito
    test('Caso 6.1 - Buscar por ratingSince & ratingUntil', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemByRating(IContentItemRating.Uno,IContentItemRating.Cinco).getFirstPage();

        expect(response).toHaveLength(2);
    });

    //? Solo ratingSince
    test('Caso 6.2 - Buscar con ratingSince', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemByRating(IContentItemRating.Cinco).getFirstPage();

        expect(response).toHaveLength(1);
    });

    //? Solo RatingUntil
    test('Caso 6.3 - Buscar solo con ratingUntil', () => {
      
        let contentManager1 = new ContentManager(servicioContentManager); 
            
        let response: Array<ContentItem> = contentManager1.getContentsItemByRating(0,IContentItemRating.Cinco).getFirstPage();

        expect(response).toHaveLength(1);  
       
    });


    //! No hay resultados
    test('Caso 6.3 - Buscar solo con ratingUntil', () => {
       
        try {
            let contentManager1 = new ContentManager(servicioContentManager); 
            
            let response: Array<ContentItem> = contentManager1.getContentsItemByRating(0,IContentItemRating.Cinco).getFirstPage();

            expect(response).toHaveLength(1);  
            
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }
    });
});

//? - - - - - - - - -  - - - FECHA  - - - - - - - - -  - - - //  

describe('Escenario 07 - Test ContentManager - FECHA ', () => {

    // Ambos filtros creados nuevos exito.
    test('Caso 7.1 - Buscar por fechaCreacionSince & fechaCreacionUntil', () => {
       
            let contentManager1 = new ContentManager(servicioContentManager); 
 
            let fechaCreacionSince = new Date(2015, 10, 10)
            let fechaCreacionUntil = new Date(2025,10,10)
            
            _customLogger.logDebug(`Desde ContentManagerTest, fechaCreacionSince=${fechaCreacionSince} & fechaCreacionUntil=${fechaCreacionUntil}`)
            
            let response: Array<ContentItem> = contentManager1.getContentsItemByFechaCreacion(fechaCreacionSince,fechaCreacionUntil).getFirstPage();

            expect(response).toHaveLength(1); 
    });
    // Ambos filtros por defecto. Deberia retornar todos.
    test('Caso 7.2 - Buscar por fechas sin parametros (default)', () => {
       
            let contentManager1 = new ContentManager(servicioContentManager); 
       
            let response: Array<ContentItem> = contentManager1.getContentsItemByFechaCreacion().getFirstPage();

            expect(response).toHaveLength(2); 
    });

    // Ambos filtros por defecto. Deberia retornar todos.
    test('Caso 7.3 - Buscar por fechas sinceCreada y Until Default', () => {
       
            let contentManager1 = new ContentManager(servicioContentManager); 
        
            let fechaCreacionSince = new Date(2015, 10, 10)

       
            let response: Array<ContentItem> = contentManager1.getContentsItemByFechaCreacion(fechaCreacionSince).getFirstPage();

            expect(response).toHaveLength(1); 
    });

    // Un filtro con fecha minima no permitida.
     test('Caso 7.4- Buscar por fechas con error de maxSince', () => {
       
         try {
             let contentManager1 = new ContentManager(servicioContentManager); 
 
             let fechaCreacionSince = new Date(1950, 10, 10)
             let fechaCreacionUntil = new Date(2025, 10, 10)
          
             let response: Array<ContentItem> = contentManager1.getContentsItemByFechaCreacion(fechaCreacionSince,fechaCreacionUntil).getFirstPage();
 
             expect(response).toHaveLength(2); 
            
         } catch (error) {
            
             expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
         }
    });

});

// //? - - - - - - - - -  - - - PAGE ITERATOR   - - - - - - - - -  - - - //

describe('Escenario 08 - Test ContentManager - PAGE ITERATOR ', () => {

    test('Caso 8.1 - Retornar limit default', () => {
      
        let servicio7Items = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(7));

        let contentManager1 = new ContentManager(servicio7Items);
       
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTitleOrDescription("ANGULAR").getFirstPage();

        expect(response).toHaveLength(5);
    });

});




// //? - - - - - - - - -  - - - TITLE  - - - - - - - - -  - - - //  

// describe('Escenario 01 - Test ContentManager - TITLE ', () => {

   
//     test('Caso 1.1 - NUEVO', () => {

//         // Crear objeto. Guardar la referencia.
//         let contentManager1 = new ContentManager(servicioContentManager); 
        
//         let response: Array<ContentItem> = contentManager1.getContentsItemsByTitle("Angular").getFirstPage();

//         console.log(`Caso 1.1 ${response}`)

//         expect(response).not.toBeNull();
//     });


//     test('Caso 1.2 - Buscar titulo de 2 letras ERROR NO PERMITIDO', () => {

//         let contentManager1 = new ContentManager(servicioContentManager); 
//         try {
//             let response: Array<ContentItem> = contentManager1.getContentsItemsByTitle("an").getFirstPage();
//             expect(response).toHaveLength(1);
//         } catch (error) {

//             let error2 = new Error(`Debe contener al menos 3 letras.`)
//             expect(error).toBeInstanceOf(Error)
//             // console.error("el error es", error)
//             // expect(error).toStrictEqual(error2)
//         }
//     });

//     test('Caso 1.3 - Buscar filtro title "angular', () => {

//         let contentManager1 = new ContentManager(servicioContentManager); 
        
//         let response: Array<ContentItem> = contentManager1.getContentsItemsByTitle("angular").getFirstPage();
 
//         expect(response).toHaveLength(1);
//     });

//     //Todo: Verificar si incluye al menos alguna de estas palabras.
//     // test('Caso 1.4 - Buscar filtro title no estricto, si contiene al menos una palabra', () => {

//     //     let contentManager1 = new ContentManager(servicioContentManager); 
        
//     //     let response: Array<ContentItem> = contentManager1.getContentsItemsByTitle("angular ESTAS PALABRAS NO EXISTEN");
 
//     //     expect(response).toHaveLength(1);
//     // });

//     // Sin filtro
//     test('Caso 1.5 - Sin filtro, retornar lista 2 items.', () => {

//         let response = servicioContentManager.getAllContentsItems()

//         expect(response).toHaveLength(2);
//     });


// })


//? - - - - - - - - -  - - - DESCRIPTION  - - - - - - - - -  - - - //  

// describe('Escenario 04 - Test ContentManager - Description ', () => {

//      // 1 Caso
//     test('Caso 4.1 - Buscar descripcion "experto', () => {

//         let contentManager1 = new ContentManager(servicioContentManager); 
        
//         let response: Array<ContentItem> = contentManager1.getContentsItemsByDescription("experto").getFirstPage();

//         expect(response).toHaveLength(1);
//     });

//     // Ninguno
//     test('Caso 4.2 - Buscar descripcion "experto', () => {

//         try {

//             let contentManager1 = new ContentManager(servicioContentManager); 
            
//             let response: Array<ContentItem> = contentManager1.getContentsItemsByDescription("profesor").getFirstPage();
    
//             expect(response).toHaveLength(1);
//         } catch (error) {
            
//             expect(error).toBeInstanceOf(NoHayResultadosError)
//         }

//     });

//     test('Caso 4.3 - Buscar descripcion por dos palabras', () => {

//             let contentManager1 = new ContentManager(servicioContentManager); 
            
//             let response: Array<ContentItem> = contentManager1.getContentsItemsByDescription("en un").getFirstPage();
    
//             expect(response).toHaveLength(1);
        

//     });

//     test('Caso 4.4 - Buscar descripcion 1 palabra que este en 2 items case-sensitive', () => {

//             let contentManager1 = new ContentManager(servicioContentManager); 
            
//             let response: Array<ContentItem> = contentManager1.getContentsItemsByDescription("convierte").getFirstPage();
    
//             expect(response).toHaveLength(2);
        

//     });
   
// });