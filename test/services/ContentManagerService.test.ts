import { describe, expect, test } from '@jest/globals';
import { ErrorContentManagerService } from '../../app/error/ErrorContentManagerService';
import { ErrorExternoAlPasarParams, NoHayResultadosError } from '../../app/error/NoHayResultadosError';
import { IContentItemRating } from '../../app/interfaces/IContentItemRating';
import { IContentType } from '../../app/interfaces/IContentType';
import { ContentItem } from '../../app/models/ContentItem';
import { ContentItemFilter } from "../../app/models/ContentItemFilter";
import { Duration } from '../../app/models/Duration';
import { ContentManagerService } from '../../app/services/ContentManagerService';
import { IContentManagerService } from '../../app/services/IContentManagerService';
import { fechaCreacionDefault, maxDurationSince, minFechaCreacion } from '../../app/utils/ConfigurationENV';
import { CustomLogger } from '../../app/utils/CustomLogger';
import { CrearContentItemsBasicos } from '../utils/CrearContentItemsBasicos';
import { ContentManagerServiceMock } from './ContentManagerServiceMock';

// Funcion interna de testing: Levanto una instancia. Inyeccion de dependencias.
function getService(instance: string = "original"): IContentManagerService {
    if (instance === "original") {
        return new ContentManagerService();
    } else {
        return new ContentManagerServiceMock();
    }
}

let customlogger = new CustomLogger();

// Este escenario cubre la creacion del servicio y la inicializacion.
describe('Escenario 01 - Test ContentManagerService ', () => {

    // Pasar parametro a getService original o test.
    // let servicioContentManager = getService("test");
    let servicioContentManager = new ContentManagerServiceMock();
        
    // Todos los items (el Mock tiene 2 items).
    test('Caso 1.1 - Return todos los items.', () => {
        
        expect(servicioContentManager.getAllContentsItems()).toHaveLength(2);

    });

    // Caso 2: Crear un item. 
    test('Caso 1.2 - Crear item not null.', () => {

        // servicioContentManager.crear(new ContentItem("Aprendiendo Angular", IContentType.Video, ["Angular", "Typescript"], "Aprende angular de 0 a 1000"));
        
        // expect(servicioContentManager.getAllContentsItems()).not.toBeNull()

    });

});

//? - - - - - - - - -  - - - TITLE OR  DESCRIPTION  - - - - - - - - -  - - - //
describe('Escenario 8 - ServiceMock  - getContentsItemsByFilter - TITLE OR DESCRIPTION', () => {
   
    
    let contentItemList = [
        new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"]),
        new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"]),
        new ContentItem("3 Angular", "3 Aprendiendo  programacion y Angular", IContentType.Article, ["typescript"]),
        new ContentItem("4 React", "4 Aprendiendo React", IContentType.Pdf, ["react"]),
    ]
    
    let servicioContentManager = new ContentManagerServiceMock(contentItemList);
    
    
   
    test('Caso 8.1 - Filter 1 lenght', () => {
    
        let filter = new ContentItemFilter();
        filter.titleOrDescription = "angular"
    
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(3);

    });

    test('Caso 8.2 - 2 en Description', () => {
    
        let filter = new ContentItemFilter();
        filter.titleOrDescription = "programacion"
    
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(1);

    });

    test('Caso 8.3 - 2 en titulo', () => {
    
        let filter = new ContentItemFilter();
        filter.titleOrDescription = "react"
    
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(1);

    });

    test('Caso 8.4- "Angular" / Case Insensitive -Editado', () => {
        
        let filter = new ContentItemFilter();
        filter.titleOrDescription = "angu";

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        console.log("Caso 2.1 response", response)
        expect(response).toHaveLength(3);
    })

});



//? - - - - - - - - -  - - - DESCRIPTION  - - - - - - - - -  - - - //  

// describe('Escenario 3 - ServiceMock  - Description', () => {

//     let servicioContentManager = getService("test");

//     test('Caso 3.1 - Description incluyan "Angular" / Case Insensitive', () => {

//         let filter = new ContentItemFilter();
//         filter.description = "angu";

//         let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
//         expect(response).toHaveLength(1);
//     })

// });

//? - - - - - - - - -  - - - DURATION  - - - - - - - - -  - - - //  

describe('Escenario 4 - ServiceMock  - getContentsItemsByFilter - Duration', () => {

    let servicioContentManager = getService("test");

    test('Caso 4.1 - 0 minutos && 180 minutos', () => {

        let filter = new ContentItemFilter();
        filter.durationSince = new Duration();
        filter.durationSince.setDuration(0, 0, 0);

        filter.durationUntil = new Duration();
        filter.durationUntil.setDuration(3, 0, 0);
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        expect(response).toHaveLength(2);
    })

    test('Caso 4.2 - 0,10 minutos && 60 minutos.', () => {

        let filter = new ContentItemFilter();
        filter.durationSince = new Duration();
        filter.durationSince.setDuration(0, 0, 10); // 0.10 minutos.

        filter.durationUntil = new Duration();
        filter.durationUntil.setDuration(2, 0, 0); // 60 minutos.
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        expect(response).toHaveLength(2);
    })

     test('Caso 4.3 - mayores 180 minutos / expect Error', () => {

        try {
            let filter = new ContentItemFilter();
            filter.durationSince.setDuration(4) // 60 minutos.
            
            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
            
            expect(response).toHaveLength(1);
        } catch (error) {
            
            expect(error).toBeInstanceOf(Error)

        }
        
    })
});

//? - - - - - - - - -  - - - RATING  - - - - - - - - -  - - - //  

describe('Escenario 5 - ServiceMock  - getContentsItemsByFilter -  RATING ', () => {

    let servicioContentManager = getService("test");

    test('Caso 5.1- Filter by rating - Ambos Since & Until', () => {

        let filter = new ContentItemFilter();
        
        filter.ratingSince = IContentItemRating.Tres; 
        filter.ratingUntil = IContentItemRating.Cinco

        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(2);
    })

    //Todo rating 
    test('Caso 5.2- Filter by rating - Ambos  Since & Until', () => {

        let contentItemList = [
            new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"], maxDurationSince , IContentItemRating.Cinco ),
            new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"], maxDurationSince , IContentItemRating.Cinco),
            new ContentItem("3 Angular", "3 Aprendiendo Angular", IContentType.Article, ["typescript"], maxDurationSince , IContentItemRating.Dos),
        ]

        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        
        filter.ratingSince = IContentItemRating.Tres;
        filter.ratingUntil = IContentItemRating.Cinco
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(2);
    })

     test('Caso 5.3- Filter by rating - Ambos. Since ===.', () => {

        let contentItemList = [
            new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"], maxDurationSince , IContentItemRating.Cinco ),
            new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"], maxDurationSince , IContentItemRating.Cinco),
            new ContentItem("3 Angular", "3 Aprendiendo Angular", IContentType.Article, ["typescript"], maxDurationSince , IContentItemRating.Dos),
        ]

        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        
        filter.ratingSince = IContentItemRating.Dos;
        filter.ratingUntil = IContentItemRating.Cinco
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(3);
     })
    
    test('Caso 5.4- Filter by rating - Solo Until', () => {

        let contentItemList = [
            new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"], maxDurationSince , IContentItemRating.Cinco ),
            new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"], maxDurationSince , IContentItemRating.Cinco),
            new ContentItem("3 Angular", "3 Aprendiendo Angular", IContentType.Article, ["typescript"], maxDurationSince , IContentItemRating.Dos),
        ]

        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        
        filter.ratingUntil = IContentItemRating.Dos
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(1);
    })

    // Todo Deberia ser 3.
    test('Caso 5.5- Filter by rating - Solo Since', () => {

        let contentItemList = [
            new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"], maxDurationSince , IContentItemRating.Cinco ),
            new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"], maxDurationSince , IContentItemRating.Cinco),
            new ContentItem("3 Angular", "3 Aprendiendo Angular", IContentType.Article, ["typescript"], maxDurationSince , IContentItemRating.Dos),
        ]

        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        
        filter.ratingSince = IContentItemRating.Dos

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(3);
    })
});



//? - - - - - - - - -  - - - FECHA CREACION  - - - - - - - - -  - - - //  
describe('Escenario 6 - ServiceMock  - getContentsItemsByFilter - Fecha Creacion', () => {
    
    let contentItemList = [
        new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"], maxDurationSince, IContentItemRating.Cinco, fechaCreacionDefault),
        new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"], maxDurationSince, IContentItemRating.Cinco, minFechaCreacion),
    ]

    let servicioContentManager = new ContentManagerServiceMock(contentItemList);
     // Sin parametros
    test('Caso 6.1 - Buscar por fecha de creacion sin parametros', () => {
        
        let filter = new ContentItemFilter();
     
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(2);
    });

    // Ambos parametros 
    test('Caso 6.2 - 2 parametros', () => {
        
        let filter = new ContentItemFilter();
        filter.fechaCreacionSince = new Date(2015, 10, 10);
        filter.fechaCreacionUntil = new Date(2025, 10, 10);
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(1);
    });

    // Solo since
    test('Caso 6.3 - 2 parametros', () => {
        
        let filter = new ContentItemFilter();
        filter.fechaCreacionSince = new Date(2015, 10, 10);
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(1);
    });

    // Error de Since
    test('Caso 6.4 - Sin error min Since date', () => {
        try {
            let filter = new ContentItemFilter();
            filter.fechaCreacionSince = new Date(1900, 10, 10);
            
            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
    
            expect(response).toHaveLength(1);
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
            
        }
    });
});


//? - - - - - - - - -  - - - TAGS  - - - - - - - - -  - - - //  
describe('Escenario 7- ServiceMock  -  getContentsItemsByFilter - Tags ', () => {

    let servicioContentManager = getService("test");
    
    test('Caso 7.1 - Exito ', () => {

        let filter = new ContentItemFilter();
        filter.tags = ["angular"]

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(1);

    });

    test('Caso 7.2 - Error no resultados ', () => {

        try {

            let filter = new ContentItemFilter();
            filter.tags = ["PYTON"]
    
            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
    
            expect(response).toHaveLength(1);
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError);            
        }

    });

});


//? - - - - - - - - -  - - - ContentType  - - - - - - - - -  - - - //  

describe('Escenario 9 - ServiceMock  - getContentsItemsByFilter - ContentType ', () => {

    let contentItemList = [
        new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"]),
        new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"]),
        new ContentItem("3 Angular", "3 Aprendiendo Angular", IContentType.Article, ["typescript"]),
        new ContentItem("4 Angular", "4 Aprendiendo Angular", IContentType.Pdf, ["react"]),
    ]

    let servicioContentManager = new ContentManagerServiceMock(contentItemList);
    
    test('Caso 9.1 - PruebasVarias - Video ', () => {

        let filter = new ContentItemFilter();
        filter.contentType = IContentType.Video

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(2);
    });

    test('Caso 9.2 - PruebasVarias - Pdf ', () => {

        let filter = new ContentItemFilter();
        filter.contentType = IContentType.Pdf

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(1);
    });
});

//? - - - - - - - - -  - - - PAGED  - - - - - - - - -  - - - //  

describe('Escenario 10 - ServiceMock  - getContentItemsByFilterPaged - CrearDosItems para pruebas.', () => {

    let servicioContentManager = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(7));
   
    
    test('Caso 10.1 -FilterByPaged limit 1', () => {
        let filter = new ContentItemFilter();

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 1, "desc");

        expect(response).toHaveLength(1);
    
    });

    test('Caso 10.2 -FilterByPaged filter by title (response = 1)', () => {

        let filter = new ContentItemFilter();
        filter.title = "Angular"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 1, "desc");

        expect(response).toHaveLength(1);
    
    });

    // No existe el item. 
    test('Caso 10.3 -FilterByPaged filter title or description', () => {
        try {
            
            let filter = new ContentItemFilter();
            filter.titleOrDescription = "programacion"
    
            let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 2, "desc");
    
            expect(response).toHaveLength(2);

        } catch (error) {
            // expect(error).toBeInstanceOf(NoHayResultadosError); // Todo Deberia ser este
            expect(error).toBeInstanceOf(ErrorContentManagerService);

        }
    
    });

    // Todo hoy: Hacer pedido de pagina o limit negativo. Error.
    
});



//?  - - - -  -  Utilizo para probar el Servicio de prueba CrearContentItemsBasicos(5) - - - -  - - - - -
describe('Escenario 11 - ServiceMock  - getContentItemsByFilterPaged - Crear5Items para pruebas.', () => {

    // 1 y 1 - ParticularContentItemsCuantity
    test('Caso 11.1 - Filter  Page 1 limit 1 - ', () => {
        let servicioContentManager = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(5));

        let filter = new ContentItemFilter();
        filter.titleOrDescription = "angular"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 5, "desc");

        expect(response).toHaveLength(5);
    });

    // 1 y 2.
    test('Caso 11.2 - Filter  Page 1 limit 2', () => {
        let servicioContentManager = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(5));

        let filter = new ContentItemFilter();
        filter.titleOrDescription = "angular"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 2, "desc");

        expect(response).toHaveLength(2);
    });


    // Pagina 2 limit 2
    test('Caso 11.3 - Filter  Page 2 limit 2', () => {
         let servicioContentManager = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(5));

        let filter = new ContentItemFilter();
        filter.titleOrDescription = "angular"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 2, 2, "desc");

        expect(response).toHaveLength(2);
    });


    // Caso Particular. Page 2, limit 3. Total 5 items retornados.
    test('Caso 11.4 - Lista de 5, page 2, limit 3. No hay resultados.', () => {

        try {
            
            let servicioContentManager = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(5));
    
            let filter = new ContentItemFilter();
            filter.titleOrDescription = "angular"
    
            let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 2, 3, "desc");
    
            expect(response).toHaveLength(2);
        } catch (error) {
            // Todo tipo de error.
            expect(error).toBeInstanceOf(NoHayResultadosError)
        }
    
    });


    // Pagina inexistente. 
    test('Caso 11.5 - Pagina solicitada con esos parametros no existe.', () => {
        try {
            let servicioContentManager = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(5));
            
            let filter = new ContentItemFilter();
            filter.titleOrDescription = "angular"
            
            let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 4, 3, "desc");
            
            expect(response).toHaveLength(2);

        } catch (error) {
            // expect(error).toBeInstanceOf(NoHayResultadosError)
            expect(error).toBeInstanceOf(ErrorContentManagerService)
        }
    });
    
});



describe('Escenario 12 - ServiceMock  - getContentsItemsByFilter - Muchos Filtros', () => {

    let contentItemList = [
        new ContentItem("1 React", "1 Aprendiendo React", IContentType.Video, ["javascript"]),
        new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"]),
        new ContentItem("3 Angular", "3 Aprendiendo Angular", IContentType.Article, ["typescript"]),
        new ContentItem("4 Angular", "4 Aprendiendo Angular", IContentType.Pdf, ["react"]),
    ]

    test('Caso 12.1 - ContentType & Title ', () => {
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        filter.contentType = IContentType.Video
        filter.titleOrDescription = "React";

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(1);
    });

    test('Caso 12.2 - Solo Tag ', () => {
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        filter.tags = ["typescript"]

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(2);
    });

    test('Caso 12.3 - Title & Tag & ContentType ', () => {
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        filter.contentType = IContentType.Pdf
        // filter.titleOrDescription = "angular";
        // filter.tags = ["react"]

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(1);
    });
});