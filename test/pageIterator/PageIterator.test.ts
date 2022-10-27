import { NoHayResultadosError } from "../../app/error/NoHayResultadosError";
import { ContentItem } from "../../app/models/ContentItem";
import { CrearContentItemsBasicos } from "../utils/CrearContentItemsBasicos";

describe('Escenario 1 - PageIterator  - ', () => {

    // Primera Pagina.
    test('Caso 1.1- ', () => {
        // 1° Recibo parametros del front

        // 2° Paso estos parametros al Mock.

        // 3° Recibo una respuesta del mock y la retorno.

    });
    // Ultima Pagina.
    
    // Siguiente Pagina.
    
    // Pagina no existente
    test('Caso 1.4- Pagina inexistente', () => {
        
        try {
        // let response: Array<ContentItem> = new CrearContentItemsBasicos().getParticularContentItemsCuantity(5);
        // expect(response).toHaveLength(2); 
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError);
        }

     
    });
    
    // Parametros Negativos
    test('Caso 1.5- Parametros negativos ', () => {
        
        try {
        // let response: Array<ContentItem> = new CrearContentItemsBasicos().getParticularContentItemsCuantity(5);
        // expect(response).toHaveLength(2);
        } catch (error) {
            expect(error).toBeInstanceOf(NoHayResultadosError);
        }

        
    });

});