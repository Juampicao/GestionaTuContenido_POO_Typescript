import {describe, expect, test} from '@jest/globals';
import { ContentItem } from '../../app/models/ContentItem';
import { ContentManagerService } from '../../app/services/ContentManagerService';
import { IContentManagerService } from '../../app/services/IContentManagerService';
import { ContentManagerServiceMock } from './ContentManagerServiceMock';
import { ContentItemFilter } from "../../app/models/ContentItemFilter"
import { IContentType } from '../../app/interfaces/Interfaces';

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

        // To-Do: ¿Por que 2 es correcto? Deberia ser 0..
        expect(servicioContentManager.getAllContentsItems()).toHaveLength(2);

    });

    // Caso 2: Objeto lleno.
    test('Caso 1.2 - no sea nulo.', () => {

        servicioContentManager.crear(new ContentItem("Aprendiendo Angular", IContentType.video, ["Angular", "Typescript"], "Aprende angular de 0 a 1000"));
        
        expect(servicioContentManager.getAllContentsItems()).not.toBeNull()

    });

    // To Do: Faltan al menos 5 casos mas. 
    
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

    // To-Do: Test de tags array

    test('Caso 2.3 - Array Tags incluya "Pyton', () => {

        // let filter = new ContentItemFilter();
        // filter.tags = ["Typescript"];

        // let response: Array<ContentItem> = servicioContentManager.getContentsItemsByFilter(filter)
        
        // expect(response).toHaveLength(1);
    })


});


