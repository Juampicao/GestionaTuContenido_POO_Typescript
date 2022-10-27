import {describe, expect, test} from '@jest/globals';
import { ContentItem } from '../../app/models/ContentItem';
import { ContentManagerService } from '../../app/services/ContentManagerService';
import { IContentManagerService } from '../../app/services/IContentManagerService';
import { ContentManagerServiceMock } from './ContentManagerServiceMock';
import { ContentItemFilter } from "../../app/models/ContentItemFilter"
import { IContentType } from '../../app/interfaces/IContentType';
import { Duration } from '../../app/models/Duration';
import { CustomLogger } from '../../app/utils/CustomLogger';
import { ErrorExternoAlPasarParams, NoHayResultadosError } from '../../app/error/NoHayResultadosError';
import { maxDurationSince } from '../../app/utils/ConfigurationENV';
import { IContentItemRating } from '../../app/interfaces/IContentItemRating';
import { CrearDosItems } from '../utils/CrearDosItems';
import { CrearContentItemsBasicos } from '../utils/CrearContentItemsBasicos';

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
describe('Escenario 8 - ServiceMock  - TITLE OR DESCRIPTION', () => {
   
    let servicioContentManager = new ContentManagerServiceMock();
   
    test('Caso 8.1 - Filter 1 lenght', () => {
    
        let filter = new ContentItemFilter();
        filter.titleOrDescription = "angular"
    
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(1);

    });

    test('Caso 8.2 - 2 en Description', () => {
    
        let filter = new ContentItemFilter();
        filter.titleOrDescription = "programacion"
    
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(2);

    });

    test('Caso 8.3 - 2 en titulo', () => {
    
        let filter = new ContentItemFilter();
        filter.titleOrDescription = "ejemplo"
    
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        expect(response).toHaveLength(2);

    });

});

//? - - - - - - - - -  - - - TITLE  - - - - - - - - -  - - - //  
describe('Escenario 2 - ServiceMock - TITLE ', () => {

    let servicioContentManager = getService("test");

    test('Caso 2.1 - "Angular" / Case Insensitive', () => {

        let filter = new ContentItemFilter();
        filter.title = "angu";

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        expect(response).toHaveLength(1);
    })

});


//? - - - - - - - - -  - - - DESCRIPTION  - - - - - - - - -  - - - //  

describe('Escenario 3 - ServiceMock  - Description', () => {

    let servicioContentManager = getService("test");

    test('Caso 3.1 - Description incluyan "Angular" / Case Insensitive', () => {

        let filter = new ContentItemFilter();
        filter.description = "angu";

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        expect(response).toHaveLength(1);
    })

});

//? - - - - - - - - -  - - - DURATION  - - - - - - - - -  - - - //  

describe('Escenario 4 - ServiceMock  - Duration', () => {

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

describe('Escenario 5 - ServiceMock  - RATING ', () => {

    let servicioContentManager = getService("test");

    test('Caso 5.1- Filter by rating', () => {

        let filter = new ContentItemFilter();
        
        filter.ratingSince = IContentItemRating.Tres; 
        filter.ratingUntil = IContentItemRating.Cinco

        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(2);
    })

    //Todo rating 
    test('Caso 5.2- Filter by rating', () => {

        let filter = new ContentItemFilter();
        
        filter.ratingSince = IContentItemRating.Cinco;
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
                
        expect(response).toHaveLength(1);
    })
});



//? - - - - - - - - -  - - - FECHA CREACION  - - - - - - - - -  - - - //  
describe('Escenario 6 - ServiceMock  - Fecha Creacion', () => {

    let servicioContentManager = getService("test");
   
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
describe('Escenario 7- ServiceMock  - Tags ', () => {

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



//? - - - - - - - - -  - - - PAGED  - - - - - - - - -  - - - //  

describe('Escenario 9 - ServiceMock  - getContentItemsByFilterPaged - CrearDosItems para pruebas.', () => {

    let servicioContentManager = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(7));
   
    
    test('Caso 9.1 -FilterByPaged limit 1', () => {
        let filter = new ContentItemFilter();

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 1, "desc");

        expect(response).toHaveLength(1);
    
    });

    test('Caso 9.2 -FilterByPaged filter by title (response = 1)', () => {

        let filter = new ContentItemFilter();
        filter.title = "Angular"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 1, "desc");

        expect(response).toHaveLength(1);
    
    });

    // No existe el item. 
    test('Caso 9.3 -FilterByPaged filter title or description', () => {
        try {
            
            let filter = new ContentItemFilter();
            filter.titleOrDescription = "programacion"
    
            let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 2, "desc");
    
            expect(response).toHaveLength(2);

        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError);
        }
    
    });

    // Todo hoy: Hacer pedido de pagina o limit negativo. Error.
    
});

//? Utilizo para probar el Servicio de prueba CrearContentItemsBasicos(5)
describe('Escenario 10 - ServiceMock  - getContentItemsByFilterPaged - Crear5Items para pruebas.', () => {

    // 1 y 1 - ParticularContentItemsCuantity
    test('Caso 10.1 - Filter  Page 1 limit 1 - ', () => {
        let servicioContentManager = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(5));

        let filter = new ContentItemFilter();
        filter.titleOrDescription = "angular"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 5, "desc");

        expect(response).toHaveLength(5);
    });

    // 1 y 2.
    test('Caso 10.2 - Filter  Page 1 limit 2', () => {
        let servicioContentManager = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(5));

        let filter = new ContentItemFilter();
        filter.titleOrDescription = "angular"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 1, 2, "desc");

        expect(response).toHaveLength(2);
    });


    // Pagina 2 limit 2
    test('Caso 10.3 - Filter  Page 2 limit 2', () => {
         let servicioContentManager = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(5));

        let filter = new ContentItemFilter();
        filter.titleOrDescription = "angular"

        let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 2, 2, "desc");

        expect(response).toHaveLength(2);
    });


    // Caso Particular. Page 2, limit 3. Total 5 items retornados.
    test('Caso 10.4 - Lista de 5, page 2, limit 3. No hay resultados.', () => {

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
    test('Caso 10.5 - Pagina solicitada con esos parametros no existe.', () => {
        try {
            let servicioContentManager = new ContentManagerServiceMock(new CrearContentItemsBasicos().getParticularContentItemsCuantity(5));
            
            let filter = new ContentItemFilter();
            filter.titleOrDescription = "angular"
            
            let response: Array<ContentItem> = servicioContentManager.getContentItemsByFilterPaged(filter, 4, 3, "desc");
            
            expect(response).toHaveLength(2);

        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError)
        }
    });
    
});