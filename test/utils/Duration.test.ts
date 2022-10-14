import { ErrorExternoAlPasarParams } from "../../app/error/NoHayResultadosError";
import { Duration } from "../../app/models/Duration";

describe('Escenario 01 - Duration Object  ', () => {

    test('Caso 1.1 - Create Duration simple.', () => {

        let durationExample = new Duration()
        durationExample.setDuration(2,0,25)

        let response = durationExample.getDuration()
        console.log(`Duration is ${response}`)

        expect(response).toBe(`02:00:25`)
    });


    test('Caso 1.2 - Create Duration with letters.', () => {

        let durationExample = new Duration()
        durationExample.setDuration(11, 50, 0)

        let response = durationExample.getDurationWithLetter()
        console.log(`Duration is ${response}`)

        expect(response).toBe(`11hh:50mm:00ss`)
    });

    test('Caso 1.3 - Create Duration with descripcion.', () => {

        let durationExample = new Duration()
        durationExample.setDuration(2,0,22)

        let response = durationExample.getDurationWithDescription()
        console.log(`Duration is ${response}`)

        expect(response).toBe(`02 hours: 00 minutes: 22 seconds`)
    });


    test('Caso 1.4 - Duration to seconds.', () => {

        let durationExample = new Duration()
        durationExample.setDuration(0,5,0)

        let response = durationExample.getDurationTotalInSeconds(durationExample)
        console.log(`Duration is ${response}`)

        expect(response).toBe(300)
    });

    test('Caso 1.5 - Duration to minutes.', () => {

        let durationExample = new Duration()
        durationExample.setDuration(0,5,0)

        let response = durationExample.getDurationTotalInMinutes(durationExample)
        console.log(`Duration is ${response}`)

        expect(response).toBe(5)
    });

    test('Caso 1.6 - metodo setDuration()', () => {

         let durationExample = new Duration();
         durationExample.setDuration(1, 2, 3)
         console.log(`duration example es ${durationExample.getDuration()}`)

        let response = durationExample.getDurationTotalInMinutes(durationExample)
        console.log(`Duration is ${response}`)

        expect(response).not.toBeNull()
    });

    test('Caso 1.7 - metodo setDuration() - NEGATIVO', () => {
                     
        try {
            let durationExample = new Duration();
            durationExample.setDuration(-1, 2, 3)
            console.log(`duration example es ${durationExample.getDuration()}`)

            let response = durationExample.getDurationTotalInMinutes(durationExample)
            console.log(`Duration is ${response}`)
            
        } catch (error) {   
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)            
        }
       
    });

      

    

})