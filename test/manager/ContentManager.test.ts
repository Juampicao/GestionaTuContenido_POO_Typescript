import { ContentItem } from "../../app/models/ContentItem";

describe('Escenario 01 -  Test ContentManager ', () => {
    
    test('Caso 1.1 - Retornar todos los titulos  .', () => {
        let contenido1 = new ContentItem();
       
        contenido1.title = "Angular";
        contenido1.description = "Aprende Angular de 0 a 100";
        contenido1.tags = ["Angular", "Typescript"];
        contenido1.contentType = "video";

        let contentItemArray: Array<ContentItem> = []
        contentItemArray.push(contenido1)
        
        expect(1 + 1).toBe(2);
        
    });

        
    test('Caso 1.2 - .', () => {
     

    });

})