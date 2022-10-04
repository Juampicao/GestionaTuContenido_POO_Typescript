import {describe, expect, test} from '@jest/globals';
import { ContentItem } from '../../app/models/ContentItem';
import { ContentManagerService } from '../../app/services/ContentManagerService';
import { IContentManagerService } from '../../app/services/IContentManagerService';
import { ContentManagerServiceMock } from './ContentManagerServiceMock';
import { ContentItemFilter } from "../../app/models/ContentItemFilter"

// Funcion interna de testing: Levanto una instancia. Inyeccion de dependencias.
function getService(instance: string = "original"): IContentManagerService {
    if (instance === "original") {
        return new ContentManagerService();
    } else {
        return new ContentManagerServiceMock();
    }
}

// Escenario
// Este escenario cubre la creacion del servicio y la inicializacion.
describe('Escenario 01 - Test ContentManagerService ', () => {

    // Pasar parametro a getService original o test.
    // let servicioContentManager = getService("test");
    let servicioContentManager = new ContentManagerServiceMock();
        
    // Caso 1: Objeto vacio.
    test('Caso 1.1 - length must be 2', () => {

        // Creando 2 objetos de prueba.
        servicioContentManager.crear(new ContentItem("Aprendiendo Angular",10));
        servicioContentManager.crear(new ContentItem("React desde 0",20));

        expect(servicioContentManager.getAllContentsItems().length).toBe(2);

    });

    // Caso 2: Objeto lleno.
    test('Caso 1.2 - ServiceContentManager._getAllContentsItems not to be null.', () => {

        expect(servicioContentManager.getAllContentsItems()).not.toBeNull()

    });

    // To Do: Faltan al menos 5 casos mas. 
    
});

// Escenario
describe('Escenario 2 - Busqueda por titulo ', () => {

    // let servicioContentManager = getService("test");

    let servicioContentManager = new ContentManagerServiceMock();

    test('Caso 2.1 - Probando con un titulo valido', () => {

        // Creo un filter de tipo ContentItemFilter (Instancio)
        let filter = new ContentItemFilter();
        filter.title = "Angular";
        // Respuesta;
        let response: Array<ContentItem>;
        response = servicioContentManager.getContentsItemsByFilter(filter)
        
        // Paso el filter al servicio.
        expect(response).not.toBeNull();
    })

    // test('Caso 2.2 - Probando con un titulo valido', () => {

    //     // Creo un filter de tipo ContentItemFilter (Instancio)
    //     let filter = new ContentItemFilter();
    //     filter.Title = "Angular";
    //     // Respuesta;
    //     let response: Array<ContentItem>;
    //     response = servicioContentManager.getContentsItemsByFilter(filter)
        
    //     // Paso el filter al servicio.
    //     expect(response).not.toBeNull();
    // })
});


