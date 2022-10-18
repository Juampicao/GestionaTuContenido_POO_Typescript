import { ErrorExternoAlPasarParams } from "../../app/error/NoHayResultadosError";
import { pruebaPagination } from "../../app/pagination/paginationNumbers";

describe('Escenario 1 - Pagination  - Pruebas numeros', () => { 

    test('Caso 1.1- Retornar los primeros 2 elementos', () => {
        
        let response: Array<number> = pruebaPagination();

        expect(response).toHaveLength(2);
        expect(response).toEqual([1,2])
    });

    
    test('Caso 1.2 . Retronar los 3 primeros', () => {
        
        let response: Array<number> = pruebaPagination(1,3);

        expect(response).toHaveLength(3);
        expect(response).toEqual([1,2,3])

    });

    test('Caso 1.3 Parametros negativos, error.', () => {
        try {

            let response: Array<number> = pruebaPagination(-1,-3);

            expect(response).toHaveLength(3);
            
        } catch (error) {

            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }
        
    });

    test('Caso 1.4 pagina 2, limit 3.', () => {
    
        let response: Array<number> = pruebaPagination(2,3);

        expect(response).toHaveLength(3);
        expect(response).toEqual([4,5,6])

    });

    test('Caso 1.5 pagina 3, limit 1.', () => {
    
        let response: Array<number> = pruebaPagination(3,1);

        expect(response).toHaveLength(1);
        expect(response).toEqual([3])

    });
});
