import { ContentItem } from "../../app/models/ContentItem";

describe('Escenario 01 - Test ContentItem ', () => {
    

    test('Caso 1.1 - Crear un ContentItem solo titulo not to be null.', () => {

        let contenido1 = new ContentItem()
        
        contenido1.title = "Angular";
    
        expect(contenido1.title).toBe("Angular");
        expect(contenido1).not.toBe(null);
    });


    test('Caso 1.2 - Crear ContentItem con los 4 atributos principales.', () => {

        let contenido1 = new ContentItem()

        contenido1.title = "Angular";
        contenido1.description = "Aprende Angular de 0 a 100";
        contenido1.tags = ["Angular", "Typescript"];
        contenido1.contentType = "video";

        expect(contenido1).not.toBeNull()
     });
    
    
    test(`Caso 1.3 - TagsArray length 3`, () => {
      
        let contenido1 = new ContentItem()
      
        contenido1.tags = ["React", "Angular", "Typescript"]
        
        expect(contenido1.tags).toHaveLength(3)
    });
    

    test('Caso 1.4 - Verificar si contiene "REACT".', () => {
        
        let contenido1 = new ContentItem()
      
        contenido1.tags = ["React","Angular","Typescript"]

        expect(contenido1.tags).toContain("React")
     });
    

})

// CODIGO  VIEJO

// import { ContentItem } from "../../app/models/ContentItem";

// describe('Escenario 01 - Test ContentItem ', () => {
//     let contenido1 = new ContentItem("Aprendiendo Python", 100)
//     let cantidadItemsArray = 2; 
//     let cantidadErroneaItemsArray = cantidadItemsArray + 1;

//     test('Caso 1.1 - Crear un ContentItem.', () => {
//         expect(contenido1.contentDetails).toBe("El titulo es Aprendiendo Python y tiene una duracion de 100");
//     });

//     test('Caso 1.2 - Tags not to be null.', () => {
//         expect(contenido1).not.toBeNull()
//      });
    
    
//     test(`Caso 1.3 - TagsArray length ${cantidadItemsArray}`, () => {
//         contenido1.setTags = "React"
//         contenido1.setTags = "Angular"

//         expect(contenido1.getTags).toHaveLength(cantidadItemsArray)
//     });

//      test('Caso 1.4 - Verificar si contiene "REACT".', () => {
//         expect(contenido1.getTags).toContain("React")
//      });
    

// })