import { ErrorExternoAlPasarParams } from "../../app/error/NoHayResultadosError";
import { IContentItemRating } from "../../app/interfaces/IContentItemRating";
import { IContentType } from "../../app/interfaces/IContentType";
import { ContentManager } from "../../app/manager/ContentManager";
import { ContentItem } from "../../app/models/ContentItem";
import { Duration } from "../../app/models/Duration";
import { CustomLogger } from "../../app/utils/CustomLogger";
import { ContentManagerServiceMock } from "../services/ContentManagerServiceMock";
import { CrearDosItems } from "../utils/CrearDosItems";

let _customLogger = new CustomLogger(); 
let servicioContentManager = new ContentManagerServiceMock();

/**
 * 1) Title
 * 2) ContentType
 * 3) Tag
 * 4) Description
 * 5) Duration
 * 6) Rating
 * 7) Fecha
 */

describe('Escenario 01 - Test ContentManager - TITLE ', () => {

    // Deberia recibir bien el titulo
    test('Caso 1.1 - Pasar titulo not null.', () => {

        // Crear objeto. Guardar la referencia.
        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTitle("Angular");

        console.log(`Caso 1.1 ${response}`)

        expect(response).not.toBeNull();
    });


    test('Caso 1.2 - Buscar titulo de 2 letras ERROR NO PERMITIDO', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        try {
            let response: Array<ContentItem> = contentManager1.getContentsItemsByTitle("an");
            expect(response).toHaveLength(1);
        } catch (error) {

            let error2 = new Error(`Debe contener al menos 3 letras.`)
            expect(error).toBeInstanceOf(Error)
            // console.error("el error es", error)
            // expect(error).toStrictEqual(error2)
        }
    });

    test('Caso 1.3 - Buscar filtro title "angular', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTitle("angular");
 
        expect(response).toHaveLength(1);
    });

    // Sin filtro
    test('Caso 1.4 - Sin filtro, retornar lista 2 items.', () => {

        let response = servicioContentManager.getAllContentsItems()

        expect(response).toHaveLength(2);
    });


})

// ? CONTENTTPYE
describe('Escenario 02 - Test ContentManager - CONTENTTYPE ', () => {

    // Buscar por filtro contentType
    test('Caso 2.1 - Buscar contentType "Video', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByContentType(IContentType.Video);

        expect(response).toHaveLength(1);
    });


});


// ? TAGS
describe('Escenario 03 - Test ContentManager - TAGS ', () => {

    // Agregar un tag la lista.

    test('Caso 3.1 - Agregando un tag nuevo "Poo".', () => {
        
        let contenido1 = new CrearDosItems().contenido1;
        
        contenido1.addTag("Poo")
        
        console.log(contenido1.tags);
        
        expect(contenido1.tags).toHaveLength(3)
    });
    
    // No agregar tags duplicados.
    test('Caso 3.2- Agregando un tag duplicado "Angular" .', () => {
        
        let contenido1 = new CrearDosItems().contenido1;
        
        contenido1.addTag("Angular")
        
        console.log(contenido1.tags);
        
        expect(contenido1.tags).toHaveLength(2)
    });
    
    
    // Remove un tag
    test('Caso 3.3 - Remove tag "Typescript". ', () => {
        
        let contenido1 = new CrearDosItems().contenido1;
        
        contenido1.removeTag("Typescript")
        
        console.log(contenido1.tags);
        
        expect(contenido1.tags).toHaveLength(1)
    });

      // Buscar por filtro tag // Case sensitive.
    test('Caso 3.4 - Buscar filtro tag "angular', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTag(["angular"]);
 
        expect(response).toHaveLength(1);
    });

    test('Caso 3.5 - Buscar por tag', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTag(["angular"]);
 
        expect(response).toHaveLength(1);
    });
});


// ? DESCRIPTION
describe('Escenario 04 - Test ContentManager - Duration ', () => {

     // Buscar por filtro descripcion
    test('Caso 4.1 - Buscar descripcion "experto', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByDescription("experto");

        expect(response).toHaveLength(1);
    });
});


// ? DURATION
describe('Escenario 05 - Test ContentManager - Duration ', () => {

    // Expect 2
    test('Caso 5.1 - Buscar items por 2 parametros de duration', () => {
         
        let contentManager1 = new ContentManager(servicioContentManager); 

        let filterSince = new Duration();
        filterSince.setDuration(0, 10, 0);
        let filterUntil = new Duration();
        filterUntil.setDuration(2, 0, 0);

        let response: Array<ContentItem> = contentManager1.getContentsItemByDuration(filterSince, filterUntil)
        
        expect(response).toHaveLength(2);
    })
    
    // Expect 1
    test('Caso 5.2 - Buscar items por 2 parametros de duration. Expect Falsy', () => {
         
        let contentManager1 = new ContentManager(servicioContentManager); 

        let filterSince = new Duration();
        filterSince.setDuration(0, 15, 0);
        let filterUntil = new Duration();
        filterUntil.setDuration(2, 0, 0);

        let response: Array<ContentItem> = contentManager1.getContentsItemByDuration(filterSince, filterUntil)
        
        expect(response).toHaveLength(1);
    })
    
    test('Caso 5.3 - Sin parametros', () => {
         
        let contentManager1 = new ContentManager(servicioContentManager); 

        let response: Array<ContentItem> = contentManager1.getContentsItemByDuration()
        
        expect(response).toHaveLength(2);
    })
    
    // Solo durationSince.
    test('Caso 5.4 - Solo durationSince', () => {
         
        let contentManager1 = new ContentManager(servicioContentManager); 
       
        let filterSince = new Duration();
        filterSince.setDuration(0, 15, 0);
       
        let response: Array<ContentItem> = contentManager1.getContentsItemByDuration(filterSince)
        
        expect(response).toHaveLength(1);
    })

    // Todo: solo durationuntil.
     // Solo durationUntil
    // test('Caso 5.5 - Solo durationUntil', () => {
         
    //     let contentManager1 = new ContentManager(servicioContentManager); 
       
    //     let filterUntil = new Duration();
    //     filterUntil.setDuration(2, 0, 0);
       
    //     // ! solo filtro durationUntil
    //     let response: Array<ContentItem> = contentManager1.getContentsItemByDuration(filterUntil)
        
    //     expect(response).toHaveLength(1);
    // })
});

// ? RATING
describe('Escenario 06 - Test ContentManager - RATING ', () => {

    test('Caso 6.1 - Buscar por ratingSince & ratingUntil', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemByRating(IContentItemRating.Uno,IContentItemRating.Cinco);

        expect(response).toHaveLength(2);
    });

    test('Caso 6.2 - Buscar con ratingSince', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemByRating(IContentItemRating.Cinco);

        expect(response).toHaveLength(1);
    });

    test('Caso 6.3 - Buscar solo con ratingUntil', () => {
       
        try {
            let contentManager1 = new ContentManager(servicioContentManager); 
            
            let response: Array<ContentItem> = contentManager1.getContentsItemByRating(0,IContentItemRating.Cinco);

            expect(response).toHaveLength(1);  
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }
    });


});

// ? FECHA
// describe('Escenario 07 - Test ContentManager - FECHA ', () => {

//     // Ambos filtros por defecto
//     test('Caso 7.1 - Buscar por fechaCreacionSince & fechaCreacionUntil', () => {
       
//         // try {

//             let contentManager1 = new ContentManager(servicioContentManager); 

//             // contenido1.fechaCreacionSince = new Date(1950, 10, 10)
//             // contenido1.fechaCreacionUntil = new Date(1950,10,10)
            
//             let fechaCreacionSince = new Date(2015, 10, 10)
//             let fechaCreacionUntil = new Date(2025,10,10)
            
//             _customLogger.logDebug(`Desde ContentManagerTest, fechaCreacionSince=${fechaCreacionSince} & fechaCreacionUntil=${fechaCreacionUntil}`)
            
//             let response: Array<ContentItem> = contentManager1.getContentsItemByFechaCreacion(fechaCreacionSince,fechaCreacionUntil);

//             expect(response).toHaveLength(1);  

//         // } catch (error) {
//         //     expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
//         // }
//     });

//     // Ambos filtros creados nuevos exito.

//     // Alguno filtro nuevo y otro error.

//     // Ambos con error.

// });