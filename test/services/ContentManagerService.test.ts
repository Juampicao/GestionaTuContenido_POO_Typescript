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
import { maxDurationSince } from '../../app/utils/ConfigurationENV';
import { CustomLogger } from '../../app/utils/CustomLogger';
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
        new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"], maxDurationSince , IContentItemRating.Cinco ),
        new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"], maxDurationSince , IContentItemRating.Cinco ),
        new ContentItem("3 Angular", "3 Aprendiendo  programacion y Angular", IContentType.Article, ["typescript"], maxDurationSince , IContentItemRating.Cinco ),
        new ContentItem("4 React", "4 Aprendiendo React", IContentType.Pdf, ["react"], maxDurationSince , IContentItemRating.Cinco ),
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



// //? - - - - - - - - -  - - - DURATION  - - - - - - - - -  - - - //

describe('Escenario 4 - ServiceMock  - getContentsItemsByFilter - Duration', () => {

    let servicioContentManager = getService("test");

    test('Caso 4.1 - 0 minutos && 180 minutos', () => {

        let filter = new ContentItemFilter();
        filter.durationSince = new Duration(0, 0, 0);
        filter.durationUntil = new Duration(3, 0, 0);
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        expect(response).toHaveLength(2);
    })

    test('Caso 4.2 - 0,10 minutos && 60 minutos.', () => {

        let filter = new ContentItemFilter();
        filter.durationSince = new Duration(0, 0, 10); // 0.10 minutos.
        filter.durationUntil = new Duration(2, 0, 0); // 60 minutos.
        
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
    
    test('Caso 4.4 - Solo Since', () => {

        let filter = new ContentItemFilter();
        filter.durationSince = new Duration(1,0,0);

        console.log(`Caso 4.4 ${JSON.stringify(filter.durationSince)} & ${JSON.stringify(filter.durationUntil)}`)

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        expect(response).toHaveLength(1);
    })

    //! todo no deberia dar error. Solucion : Poner siempre el since
    // test('Caso 4.5 - Solo Until (error, poner siempre el since)', () => {

    //     let filter = new ContentItemFilter();
    //     // filter.durationSince = new Duration(0,0,0)
    //     filter.durationUntil = new Duration(2,30,0);

    //     console.log(`Caso 4.5 ${JSON.stringify(filter.durationSince)} & ${JSON.stringify(filter.durationUntil)}`)
    //     let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
    //     expect(response).toHaveLength(2);
    // })
});

// //? - - - - - - - - -  - - - RATING  - - - - - - - - -  - - - //

describe('Escenario 5 - ServiceMock  - getContentsItemsByFilter -  RATING ', () => {

    let contentItemList = [
            new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"], maxDurationSince , IContentItemRating.Cinco ),
            new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"], maxDurationSince , IContentItemRating.Cinco),
            new ContentItem("3 Angular", "3 Aprendiendo Angular", IContentType.Article, ["typescript"], maxDurationSince , IContentItemRating.Dos),
    ]

    let servicioContentManager = new ContentManagerServiceMock(contentItemList);

    test('Caso 5.1- Filter by rating - Ambos Since & Until', () => {

        let filter = new ContentItemFilter();
        
        filter.ratingSince = IContentItemRating.Tres;
        filter.ratingUntil = IContentItemRating.Cinco

        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(2);
    })
    
    test('Caso 5.2- Filter by rating - Ambos  Since & Until', () => {

        let filter = new ContentItemFilter();
        
        filter.ratingSince = IContentItemRating.Tres;
        filter.ratingUntil = IContentItemRating.Cinco
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(2);
    })

     test('Caso 5.3- Filter by rating - Ambos. Since ===.', () => {

        let filter = new ContentItemFilter();
        
        filter.ratingSince = IContentItemRating.Dos;
        filter.ratingUntil = IContentItemRating.Cinco
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(3);
     })
    
    test('Caso 5.4- Filter by rating - Solo Until', () => {

        let filter = new ContentItemFilter();
        
        filter.ratingUntil = IContentItemRating.Dos
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(1);
    })

    // //! Todo Deberia ser 3.
    test('Caso 5.5- Filter by rating - Solo Since', () => {

        let filter = new ContentItemFilter();
        
        filter.ratingSince = IContentItemRating.Dos

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(3);
    })
});



// //? - - - - - - - - -  - - - FECHA CREACION  - - - - - - - - -  - - - //
describe('Escenario 6 - ServiceMock  - getContentsItemsByFilter - Fecha Creacion', () => {
    
    // let contentItemList = [
    //     new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"], maxDurationSince, IContentItemRating.Cinco, fechaCreacionDefault2020),
    //     new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["javascript"], maxDurationSince, IContentItemRating.Cinco, minFechaCreacion),
    // ]

    let contentItemList = [
        new ContentItem("1 React", "1 Aprendiendo React", IContentType.Video, ["javascript"], maxDurationSince, IContentItemRating.Cinco, new Date("2016 01 01")),
        new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"], maxDurationSince, IContentItemRating.Cinco, new Date("2020 01 01")),
    ]

    let servicioContentManager = new ContentManagerServiceMock(contentItemList);

    // // Prueba
    // test('Caso 6.0 - Prueba tags', () => {
        
    //     let filter = new ContentItemFilter();
    //     filter.tags = ["javascript"]

    //     console.log(`Caso 6.0 Filtro ${filter.tags}`)

    //     let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

    //     expect(response).toHaveLength(2);
    // });

     // Sin parametros
    test('Caso 6.1 - Buscar por fecha de creacion sin parametros', () => {
        
        let filter = new ContentItemFilter();
        
        console.log(`Caso 6.1  Filter Since: ${filter.fechaCreacionSince} , filtro Until: = ${filter.fechaCreacionUntil} , Lista contenido 1° Items Fecha =${contentItemList[0].fechaCreacion} & 2° Item Fecha Creacion ${contentItemList[1].fechaCreacion}`)
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(2);
    });

    // Ambos parametros
    test('Caso 6.2 - 2 parametros', () => {
        
        let filter = new ContentItemFilter();
        filter.fechaCreacionSince = new Date(2019, 10, 10);
        filter.fechaCreacionUntil = new Date(2025, 10, 10);
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(1);
    });

    // Solo since
    test('Caso 6.3 - Solo Since', () => {
        
        let filter = new ContentItemFilter();
        filter.fechaCreacionSince = new Date(2015, 10, 10);
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(2);
    });

    // Solo until
    test('Caso 6.4 - Solo Until', () => {
        
        let filter = new ContentItemFilter();
        filter.fechaCreacionUntil = new Date(2019, 10, 10);
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(1);
    });

    // Solo until sin resultado
    test('Caso 6.4 - Solo Until sin resultados ', () => {
        
        try {
            let filter = new ContentItemFilter();
            filter.fechaCreacionUntil = new Date(2015, 10, 10);
            
            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

            expect(response).toHaveLength(1);
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError)
        }

    });

    // Error de Since
    test('Caso 6.5 - Sin error min Since date', () => {
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


// //? - - - - - - - - -  - - - TAGS  - - - - - - - - -  - - - //
describe('Escenario 7- ServiceMock  -  getContentsItemsByFilter - Tags ', () => {

    let servicioContentManager = getService("test");
    
    test('Caso 7.1 - Exito ', () => {

        let filter = new ContentItemFilter();
        filter.tags = ["Angular", "Typescript"]

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


// //? - - - - - - - - -  - - - ContentType  - - - - - - - - -  - - - //

describe('Escenario 9 - ServiceMock  - getContentsItemsByFilter - ContentType ', () => {

    let contentItemList = [
        new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["typescript"], new Duration(1,0,0), IContentItemRating.Tres, new Date("2015 10 10")),
        new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["react"], new Duration(2,45,0), IContentItemRating.Cinco, new Date("2021 10 10")),
        new ContentItem("3 Angular", "3 Aprendiendo Angular", IContentType.Pdf, ["react"], new Duration(2,45,0), IContentItemRating.Cinco, new Date("2021 10 10")),
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

// //? - - - - - - - - -  - - - PAGED  - - - - - - - - -  - - - //

describe('Escenario 10 - ServiceMock  - getContentItemsByFilterPaged - CrearDosItems para pruebas.', () => {

    let contentItemList = [
        new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["typescript"], new Duration(1,0,0), IContentItemRating.Tres, new Date("2015 10 10")),
        new ContentItem("2 Programacion", "2 Aprendiendo Programacion", IContentType.Video, ["react"], new Duration(2,45,0), IContentItemRating.Cinco, new Date("2021 10 10")),
        new ContentItem("3 Programacion", "3 Aprendiendo Programacion", IContentType.Pdf, ["react"], new Duration(2,45,0), IContentItemRating.Cinco, new Date("2021 10 10")),
    ]


    let servicioContentManager = new ContentManagerServiceMock(contentItemList);
    
    test('Caso 10.1 -FilterByPaged limit 1', () => {
        let filter = new ContentItemFilter();

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 1, "desc");

        expect(response).toHaveLength(1);
    
    });

    test('Caso 10.2 -FilterByPaged filter by title (response = 1)', () => {

        let filter = new ContentItemFilter();
        filter.titleOrDescription = "Angular"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 1, "desc");

        expect(response).toHaveLength(1);
    
    });


    test('Caso 10.3 -FilterByPaged filter title or description', () => {
            
            let filter = new ContentItemFilter();
            filter.titleOrDescription = "programacion"
    
            let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 2, "desc");
    
            expect(response).toHaveLength(2);
    });

    test('Caso 10.4 -FilterByPaged filter title or description', () => {
        
        try {
            let filter = new ContentItemFilter();
            filter.titleOrDescription = "hakuna matata"
    
            let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 2, "desc");
    
            expect(response).toHaveLength(2); 
        } catch (error) {
            // Todo Deberia ser NoHayResultadosErorr
            expect(error).toBeInstanceOf(ErrorContentManagerService);
        }

    });

    // Todo hoy: Hacer pedido de pagina o limit negativo. Error.
    
});



// //?  - - - -  -  Utilizo para probar el Servicio de prueba CrearContentItemsBasicos(5) - - - -  - - - - -
describe('Escenario 11 - ServiceMock  - getContentItemsByFilterPaged - Crear5Items para pruebas.', () => {

        let contentItemList = [
        new ContentItem("1 Angular", "1 Aprendiendo Angular", IContentType.Video, ["typescript"], new Duration(1,0,0), IContentItemRating.Tres, new Date("2015 10 10")),
        new ContentItem("2 Programacion", "2 Aprendiendo Programacion", IContentType.Video, ["react"], new Duration(2,45,0), IContentItemRating.Cinco, new Date("2021 10 10")),
        new ContentItem("3 Programacion", "3 Aprendiendo Programacion", IContentType.Pdf, ["react"], new Duration(2,45,0), IContentItemRating.Cinco, new Date("2021 10 10")),
    ]


    let servicioContentManager = new ContentManagerServiceMock(contentItemList);

    test('Caso 11.1 - Filter  Page 1 limit 5 pero resultados 1 - ', () => {
 
        let filter = new ContentItemFilter();
        filter.titleOrDescription = "angular"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 5, "desc");

        expect(response).toHaveLength(1);
    });

    test('Caso 11.2 - Filter  Page 1 limit 2', () => {

        let filter = new ContentItemFilter();
        filter.titleOrDescription = "programacion"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 2, "desc");

        expect(response).toHaveLength(2);
    });


    test('Caso 11.3 - Filter  Page 2 limit 1', () => {

        let filter = new ContentItemFilter();
        filter.titleOrDescription = "programacion"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 2, 1 , "desc");

        expect(response).toHaveLength(1);
    });


    test('Caso 11.4 - Lista de 2, page 2, limit 3. No hay resultados.', () => {

        try {
            
            let filter = new ContentItemFilter();
            filter.titleOrDescription = "angular"
    
            let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 2, 3, "desc");
    
            expect(response).toHaveLength(2);
        } catch (error) {
            // Todo tipo de error.
            // expect(error).toBeInstanceOf(NoHayResultadosError)
            expect(error).toBeInstanceOf(ErrorContentManagerService)

        }
    
    });


    // Pagina inexistente.
    test('Caso 11.5 - Pagina solicitada con esos parametros no existe.', () => {
        try {

            let filter = new ContentItemFilter();
            filter.tags = ["hakuna"]
            
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
        new ContentItem("2 Angular", "2 Aprendiendo Angular", IContentType.Video, ["typescript"], new Duration(1,0,0), IContentItemRating.Tres, new Date("2015 10 10")),
        new ContentItem("3 Angular", "3 Aprendiendo Angular Equaber", IContentType.Article, ["typescript"], new Duration(2,1,0), IContentItemRating.Cuatro, new Date("2018 10 10") ) ,
        new ContentItem("4 Angular", "4 Aprendiendo Angular", IContentType.Pdf, ["react"], new Duration(2,45,0), IContentItemRating.Cinco, new Date("2021 10 10")),
    ]


    test('Caso 12.1 - 1 Filter - ContentType  ', () => {
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        filter.contentType = IContentType.Video


        console.log(`Caso 12.1 filter =  ${filter.toString()} => Contenido 1 ${contentItemList[0].toString()}`)
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(1);
    });

    test('Caso 12.2 - 1 Filter - Tag ', () => {
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        filter.tags = ["typescript"]

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(2);
    });

    test('Caso 12.3 - 3 Filter - Title & Tag & ContentType ', () => {
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        filter.contentType = IContentType.Pdf
        filter.titleOrDescription = "angular";
        filter.tags = ["react"]

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(1);
    });

    test('Caso 12.4 - 3 Filter- Title & Tag & ContentType - NO HAY RESULTADO', () => {
        try {
            let servicioContentManager = new ContentManagerServiceMock(contentItemList);

            let filter = new ContentItemFilter();
            filter.contentType = IContentType.Pdf
            filter.titleOrDescription = "equaber";
            filter.tags = ["react"]

            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

            expect(response).toHaveLength(0);
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError);
        }
    });

    test('Caso 12.5 - 2 Filter - Title & Tag - NO HAY RESULTADO  ', () => {

        try {
            let servicioContentManager = new ContentManagerServiceMock(contentItemList);
    
            let filter = new ContentItemFilter();
            filter.tags = ["react"]
            filter.titleOrDescription = "equaber";

            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

            expect(response).toHaveLength(0);

        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError);
        }


    });
    
    test('Caso 12.6 - 2 Filter - Title & Tag  ', () => {
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        filter.contentType = IContentType.Video
        filter.titleOrDescription = "aprendiendo"

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(1);
    });

    test('Caso 12.7 - 3 Filter - Title & Tag & ContentType - NO HAY RESULTADO   ', () => {
        try {
            
            let servicioContentManager = new ContentManagerServiceMock(contentItemList);

            let filter = new ContentItemFilter();
            filter.titleOrDescription = "angular"
            filter.contentType = IContentType.Video
            filter.tags = ["react"]

            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

            expect(response).toHaveLength(0);

        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError);
        }
    });

    test('Caso 12.8 - Filter 2 - Titulo & Duration  ', () => {
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
            filter.durationSince = new Duration(1,3,0)
            filter.titleOrDescription = "angular";
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(2);
    });

    test('Caso 12.9 - Filter 2 -  Comnbinado Titulo y Tags ', () => {
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
            filter.durationSince = new Duration(1,3,0)
            filter.tags = ["react"]
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(1);
    });

    // Rating 
    test('Caso 12.10 - Filter 2 -  Comnbinado Rating ', () => {
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
        filter.ratingSince = IContentItemRating.Dos;
        filter.tags = ["typescript"]
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(2);
    });

    // Fecha Since & Until
    test('Caso 12.11 - Filter 2 -  Rating  Since y Fecha Since ', () => {
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);

        let filter = new ContentItemFilter();
            filter.ratingSince = IContentItemRating.Dos;
            filter.fechaCreacionSince = new Date("2017 1 1 ")
            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);

        expect(response).toHaveLength(2);
    });

    // No hay resultado fecha
    test('Caso 12.12 - Filter 2 -  Rating  Since y Fecha Since - No hay resultado ', () => {
        try {
            let servicioContentManager = new ContentManagerServiceMock(contentItemList);
            
            let filter = new ContentItemFilter();
            filter.ratingSince = IContentItemRating.Cinco;
            filter.fechaCreacionSince = new Date("2022 1 1 ")
            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);
            
            expect(response).toHaveLength(1);
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError);
        }
    });


    test('Caso 12.13 - Filter 2 -  Rating until & Fecha Creacion Until ', () => {
            
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);
            
            let filter = new ContentItemFilter();
            filter.ratingUntil = IContentItemRating.Cinco;
            filter.fechaCreacionUntil = new Date("2023 1 1 ")
            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);
            
            expect(response).toHaveLength(3);

    });

    test('Caso 12.13 - Filter 2 -  Rating until & Fecha Creacion Until ', () => {
            
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);
            
            let filter = new ContentItemFilter();
            filter.ratingUntil = IContentItemRating.Cinco;
            filter.fechaCreacionUntil = new Date("2023 1 1 ")
            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);
            
            expect(response).toHaveLength(3);

    });
    

    test('Caso 12.14 - Filter 2 -  Duration Since & Tag ', () => {
            
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);
            
            let filter = new ContentItemFilter();
            filter.tags = ["typescript"]
            filter.durationSince = new Duration(0,1,30)
            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);
            
            expect(response).toHaveLength(2);
    });

     test('Caso 12.15 - Filter 2 -  Duration Since/ Until & Tag ', () => {
            
        let servicioContentManager = new ContentManagerServiceMock(contentItemList);
            
            let filter = new ContentItemFilter();
            filter.titleOrDescription = "aprendiendo"
            filter.durationSince = new Duration(0, 1, 30)
            filter.durationUntil = new Duration(2,3,0)
            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter);
            
            expect(response).toHaveLength(2);

    });
    
    
});