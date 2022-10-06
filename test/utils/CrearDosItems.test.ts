import { CrearDosItems } from "./CrearDosItems";

describe('Escenario 01 - Test CrearDosItems ', () => {

    // Caso 2: Objeto lleno.
    test('Caso 1.1 - Retornar una lista con 2 items.', () => {

        let _contentItemsList = new CrearDosItems().obtenerContentItemsList2ContentItems();

        console.log(_contentItemsList)

        expect(_contentItemsList).toHaveLength(2)

    });

    test('Caso 1.2 - Retornar 1 ContentItem.', () => {

        let contenido1 = new CrearDosItems().obtener1ContentItem();

        console.log(contenido1)

        expect(contenido1).toBeTruthy();

    });
});