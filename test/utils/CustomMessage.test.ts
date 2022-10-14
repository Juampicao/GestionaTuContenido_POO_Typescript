import { CustomMessage } from "../../app/utils/CustomMessage";

describe('Escenario 01 - CustomMessage  ', () => {

    // Crear un mensaje 
    test('Caso 1.1 - Crear Mensaje de exito.', () => {

        let response = new CustomMessage().message("Esto es un CustomMessage")

        // CustomMessage: (desde el custom) + mensaje creado aca. 
        expect(response).toBe("CustomMessage: Esto es un CustomMessage");
    });

     test('Caso 1.2 - Crear Mensaje de Error.', () => {

        let response = new CustomMessage().error("Esto es un CustomMessage error")
        
        expect(response).toBe("CustomMessage: Esto es un CustomMessage error");
    });

});