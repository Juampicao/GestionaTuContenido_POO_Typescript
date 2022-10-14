import {describe, expect, test} from '@jest/globals';
import { ContentItem } from '../../app/models/ContentItem';
import { ContentManagerService } from '../../app/services/ContentManagerService';
import { IContentManagerService } from '../../app/services/IContentManagerService';
import { ContentManagerServiceMock } from './ContentManagerServiceMock';
import { ContentItemFilter } from "../../app/models/ContentItemFilter"
import { IContentType } from '../../app/interfaces/IContentType';
import { Duration } from '../../app/models/Duration';
import { CustomLogger } from '../../app/utils/CustomLogger';
import { NoHayResultadosError } from '../../app/error/NoHayResultadosError';

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

        servicioContentManager.crear(new ContentItem("Aprendiendo Angular", IContentType.Video, ["Angular", "Typescript"], "Aprende angular de 0 a 1000"));
        
        expect(servicioContentManager.getAllContentsItems()).not.toBeNull()

    });

});

// Escenario
describe('Escenario 2 - ServiceMock ', () => {

    // let servicioContentManager = getService("test");

    let servicioContentManager = new ContentManagerServiceMock();

    test('Caso 2.1 - Array Titles incluyan "Angular" / Case Insensitive', () => {

        let filter = new ContentItemFilter();
        filter.title = "angular";

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        expect(response).toHaveLength(1);
    })

    test('Caso 2.2 - Array Description incluyan "Angular" / Case Insensitive', () => {

        let filter = new ContentItemFilter();
        filter.description = "angular";

        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        expect(response).toHaveLength(1);
    })


    // To-Do => Terminar desde el contentItem.
    // Deberia pasarle el until..
    // test('Caso 2.3 - Filter by duration 2 params', () => {

    //     let filter = new ContentItemFilter();
        
    //     filter.duration = new Duration(0, 0, 50);
        
    //     let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
    //     expect(response).toHaveLength(2);
    // })
    
    
    // test('Caso 2.4 - Filter by rating', () => {

    //     let filter = new ContentItemFilter();
        
    //     filter.rating = IContentItemRating.Cinco
        
    //     let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
    //     // To-Do: ¿xq no me lee el console log?
    //     console.log("desde caso 2.4")

    //     // Hay un contenido creado que tiene rating = 5. Expect 1 length.
    //     expect(response).toHaveLength(0);
    // })
 
    // To-Do: Array de tags que no coincida ningun tag. Retorna vacio. Espero un new Message.(cambiar desde el return del serviceMock y el output)
    //  test('Caso 2.3 - Array tag vacio / Case Insensitive', () => {

    //     let filter = new ContentItemFilter();
    //     filter.tags = ["Python"];

    //     let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
    //     expect(response).toBe(new CustomMessage());
    // })

});


//! Deberia dar error los duration menores a minDurationSince.
describe('Escenario 3 - ServiceMock  - Duration', () => {

    let servicioContentManager = new ContentManagerServiceMock();

    test('Caso 3.1 - 0 minutos && 180 minutos', () => {

        let filter = new ContentItemFilter();
        filter.durationSince = new Duration();
        filter.durationSince.setDuration(0, 0, 0);

        filter.durationUntil = new Duration();
        filter.durationUntil.setDuration(3, 0, 0);
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        expect(response).toHaveLength(2);
    })

    test('Caso 3.2 - 10 segundos && 60 minutos.', () => {

        let filter = new ContentItemFilter();
        filter.durationSince = new Duration();
        filter.durationSince.setDuration(0, 0, 10); // 10 segundos.

        filter.durationUntil = new Duration();
        filter.durationUntil.setDuration(1, 0, 0); // 60 minutos.
        
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        expect(response).toHaveLength(1);
    })

     test('Caso 3.3 - mayores a 120 minutos / expect Error', () => {

        try {
            let filter = new ContentItemFilter();
            
            filter.durationSince = new Duration();
            filter.durationSince.setDuration(2, 0, 0); // 60 minutos.
            
            let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
            
            expect(response).toHaveLength(0);
        } catch (error) {
            
            expect(error).toBeInstanceOf(NoHayResultadosError)

        }
        
    })
});

//? Fecha Creacion
describe('Escenario 6 - ServiceMock  - Fecha Creacion', () => {

    let servicioContentManager = new ContentManagerServiceMock();
   
    // Sin parametros
    test('Caso 6.1 - Buscar por fecha de creacion sin parametros', () => {
        
        let filter = new ContentItemFilter();
     
        let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

        // Expect todo el array creado
        expect(response).toHaveLength(2);
    });

    // Ambos parametros 
     // Sin parametros
    // test('Caso 6.2 - Buscar por fecha de creacion con parametros', () => {
        
    //     let filter = new ContentItemFilter();
    //     filter.fechaCreacionSince = new Date(2015, 10, 10);
    //     filter.fechaCreacionUntil = new Date(2025, 10, 10);
        
    //     let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)

    //     // Expect todo el array creado
    //     expect(response).toHaveLength(1);
    // });

    // Solo since

    // Solo Until

    // Error de Since
});


