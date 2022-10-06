import { IContentType } from "../../app/interfaces/Interfaces";
import { ContentManager } from "../../app/manager/ContentManager";
import { ContentItem } from "../../app/models/ContentItem";
import { ContentManagerServiceMock } from "../services/ContentManagerServiceMock";
import { CrearDosItems } from "../utils/CrearDosItems";


describe('Escenario 01 - Test ContentManager - Filtros ', () => {

    let servicioContentManager = new ContentManagerServiceMock();


    // Deberia recibir bien el titulo
    test('Caso 1.1 - Pasar titulo not null.', () => {

        // Crear objeto. Guardar la referencia.
        let contentManager1 = new ContentManager(servicioContentManager); 
        
        // Filtro por titulo
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTitle("Angular");

        // To-Do: Completar la explicacion de que es. 
        console.log(`Caso 1.1 ${response}`)

        expect(response).not.toBeNull();
    });

    

     // Buscar por filtro tag // Case sensitive.
    test('Caso 1.2 - Buscar filtro tag "angular', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTag(["angular"]);
 
        expect(response).toHaveLength(1);
    });


    // Buscar por filtro title
    test('Caso 1.3 - Buscar filtro title "angular', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTitle("angular");
 
        expect(response).toHaveLength(1);
    });

    // Buscar por filtro contentType
    test('Caso 1.4 - Buscar contentType "video', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByContentType(IContentType.video);

        expect(response).toHaveLength(1);
    });

     // Buscar por filtro descripcion
    test('Caso 1.5 - Buscar descripcion "experto', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByDescription("experto");

        expect(response).toHaveLength(1);
    });

     // Retornar todos los elementos  de la lista sin filtro.
    test('Caso 1.6 - Sin filtro, retornar lista 2 items.', () => {

        let response = servicioContentManager.getAllContentsItems()

        expect(response).toHaveLength(2);
    });

    //  // Buscar por filtro title or description.
    test('Caso 1.7 - Buscar filtro title or descripcion "angular', () => {

        let contentManager1 = new ContentManager(servicioContentManager); 
        
        let response: Array<ContentItem> = contentManager1.getContentsItemsByTag(["angular"]);
 
        expect(response).toHaveLength(1);
    });


   

})

describe('Escenario 02 - Test ContentManager - Tags ', () => {

    // Agregar un tag la lista.

    test('Caso 2.1 - Agregando un tag nuevo "Poo" .', () => {
        
        let contenido1 = new CrearDosItems().contenido1;
        
        contenido1.addTag("Poo")
        
        console.log(contenido1.tags);
        
        expect(contenido1.tags).toHaveLength(3)
    });
    
    // No agregar tags duplicados.
    test('Caso 2.2- Agregando un tag duplicado "Angular" .', () => {
        
        let contenido1 = new CrearDosItems().contenido1;
        
        contenido1.addTag("Angular")
        
        console.log(contenido1.tags);
        
        expect(contenido1.tags).toHaveLength(2)
    });
    
    
    // Remove un tag
    test('Caso 2.3 - Remove tag "Typescript". ', () => {
        
        let contenido1 = new CrearDosItems().contenido1;
        
        contenido1.removeTag("Typescript")
        
        console.log(contenido1.tags);
        
        expect(contenido1.tags).toHaveLength(1)
    });
});