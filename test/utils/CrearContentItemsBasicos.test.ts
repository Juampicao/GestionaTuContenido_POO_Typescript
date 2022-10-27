import { CrearContentItemsBasicos } from "./CrearContentItemsBasicos";
import { CrearDosItems } from "./CrearDosItems";

describe('Escenario 01 - Test CrearContentItemsBasicos ', () => {


    test('Caso 1.1 - getParticularContentItemsCuantity - 5 elementos.', () => {

        let _contentItemsList = new CrearContentItemsBasicos().getParticularContentItemsCuantity(5);
    
        expect(_contentItemsList).toHaveLength(5)

    });

    test('Caso 1.2 - getParticularContentItemsCuantity - 3 elementos', () => {

         let _contentItemsList = new CrearContentItemsBasicos().getParticularContentItemsCuantity(3);
    
        expect(_contentItemsList).toHaveLength(3)

    });

    test('Caso 1.3 - getAllContentItems - 7 elementos (TODOS)', () => {

         let _contentItemsList = new CrearContentItemsBasicos().getAllContentItems();
    
        expect(_contentItemsList).toHaveLength(7)

    });
});