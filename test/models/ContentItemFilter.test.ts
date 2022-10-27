import { ErrorExternoAlPasarParams } from "../../app/error/NoHayResultadosError";
import { IContentItemRating } from "../../app/interfaces/IContentItemRating";
import { IContentType } from "../../app/interfaces/IContentType";
import { ContentItem } from "../../app/models/ContentItem";
import { ContentItemFilter } from "../../app/models/ContentItemFilter";
import { Duration } from "../../app/models/Duration";
import { FechaCreacionSinceDefault, FechaCreacionUntilDefault } from "../../app/utils/ConfigurationENV";
import { CustomLogger } from "../../app/utils/CustomLogger";

let customLogger = new CustomLogger();
/**
 * 1) Title
 * 2) ContentType
 * 2 Bis) Title or description
 * 3) Tags
 * 4) Description
 * 5) Duration
 * 6) Rating
 * 7) Fecha Creacion
 */


//? - - - - - - - - -  - - - TITLE  - - - - - - - - -  - - - //  

describe('Escenario 1 - ContentItemFilter - TITLE ', () => {

    // case-sensitive.
    test('Caso 1.1 - Crear Filter titulo "AngulAR", case-sensitive.', () => {
        let filter = new ContentItemFilter();
        filter.title = "AngulAR";

        let response = filter.title;       
        expect(response).toBe("angular");
    })

    // Crear titulo < 2 letras. Espero un error.
   test('Caso 1.2 - Buscar titulo de 2 letras.', () => {

       let filter = new ContentItemFilter()
        
       try {
           filter.title = "AB";
           
        } catch (error) { 
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
            // expect(error).toStrictEqual(error2)
        }        
   });

});




//? - - - - - - - - -  - - - CONTENTTYPE  - - - - - - - - -  - - - //  

describe('Escenario 2 - ContentItemFilter - CONTENTTYPE ', () => {
    
    // Filter = ContentType.
    test('Caso 2.1 - Buscar por contentType.', () => {

        let contenido1 = new ContentItem();
        contenido1.contentType = IContentType.Video; 

        let filter = new ContentItemFilter();
        filter.contentType = IContentType.Video;
        
        let response = contenido1.contentType;

        expect(response).toBe(filter.contentType);
    })

    // Diferente a 
    test('Caso 2.2 - Diferente a Video.', () => {

        let contenido1 = new ContentItem();
        contenido1.contentType = IContentType.Article; 

        let filter = new ContentItemFilter();
        filter.contentType = IContentType.Video;
        
        let response = contenido1.contentType;

        expect(response).not.toBe(filter.contentType);
    })


});


//? - - - - - - - - -  - - - TITLEORDESCRIPTION  - - - - - - - - -  - - - //  

describe('Escenario 2 Bis - ContentItemFilter - TITLEORDESCRIPTION ', () => {

    // Default
    test('Caso 2.1 BIS - Default ', () => {
        let filter = new ContentItemFilter();
        
        expect(filter.titleOrDescription).toBe("");
    });

    // Nuevo
    test('Caso 2.2 bis - Nuevo', () => {
        let filter = new ContentItemFilter();
        filter.titleOrDescription = "Busca por titulo o descripcion"; 

        expect(filter.titleOrDescription).toBe("busca por titulo o descripcion")
    });
});

//? - - - - - - - - -  - - - TAGS  - - - - - - - - -  - - - //  

describe('Escenario 3 - ContentItemFilter - TAGS ', () => {

     // Crear un tag.
    test('Caso 3.1- Crear un Filter con tag "Python". ', () => {

        let filter = new ContentItemFilter();
        filter.tags =  ["React"];
        
        let response = filter.tags;       
        
        // Verificar si contiene Python.
        function ContainsReactTrue() {
        if (response.includes("Python")) {
                return true;
            } else {
                return false;
            }
        }

        expect(ContainsReactTrue()).toBeFalsy();
    })

    test('Caso 3.2- Crear un Filter con tag "React". ', () => {

        let filter = new ContentItemFilter();
        filter.tags =  ["React"];
        
        let response = filter.tags;       
        
        // Verificar si contiene Python.
        function ContainsReactTrue() {
        if (response.includes("React")) {
                return true;
            } else {
                return false;
            }
        }

        expect(ContainsReactTrue()).toBeTruthy();
    })


});


//? - - - - - - - - -  - - - DESCRIPTION  - - - - - - - - -  - - - //  

describe('Escenario 4 - ContentItemFilter - DESCRIPTION ', () => {

    // Crear descripcion case-senstivie.
    test('Caso 4.1 - Crear Filter con descripcion "El mEJor dE ToDOS"- Case sensitive.', () => {

        let filter = new ContentItemFilter();
        filter.description = "El mEJor dE ToDOS";
        
        let response = filter.description;       
        expect(response).toBe("el mejor de todos");
    })


    // // containDescription false. 
    // test('Caso 4.2 - Filter containDescription - False -  Case sensitive.', () => {
    //     let contenido1 = new ContentItem(); 
    //     contenido1.description = "No es el mejor de todos"

    //     let filter = new ContentItemFilter();
    //     filter.description = "Not found";
        
    //     let response = contenido1.containDescription(filter.description)       
    //     expect(response).toBeFalsy();
    // })
});


//? - - - - - - - - -  - - - DURATION  - - - - - - - - -  - - - //  

describe('Escenario 5 - ContentItemFilter - DURATION ', () => {

    test('Caso 5.1- DurationSince & DurationUntil', () => {

        let filter = new ContentItemFilter();
        filter.durationSince = new Duration();
        filter.durationSince.setDuration(0, 1, 10)
        filter.durationUntil = new Duration();
        filter.durationUntil.setDuration(0, 3, 20);

         
        let durationSince = filter.durationSince;
        let durationUntil = filter.durationUntil;
        
        expect(durationSince.getDuration()).toEqual(`00:01:10`)
        expect(durationUntil.getDuration()).toEqual(`00:03:20`)

    })


    test('Caso 5.2- Crear Filter DurationSince & DurationUntil Negativos', () => {

        try {
            let filter = new ContentItemFilter();
            filter.durationSince = new Duration()
            filter.durationSince.setDuration(-1, 10,20);
            filter.durationUntil = new Duration();
            filter.durationUntil.setDuration(0, 3, 20)

        } catch (error) {
          
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }      
    })

    test('Caso 5.3- DurationSince & DurationUntil NO PERMITIDOS POR LA CONFIGURACION MAXIMA SINCE', () => {

        try {
            let filter = new ContentItemFilter();
            filter.durationSince = new Duration()
            filter.durationSince.setDuration(5,10,20);
        
             let durationSince = filter.durationSince;
             expect(durationSince).toBeNull()

        } catch (error) {
            expect(error).toBeInstanceOf(Error)
         }
        
    })

    test('Caso 5.4- Crear Filter DurationSince & DurationUntil NO PERMITIDOS POR LA CONFIGURACION MAXIMA UNTIL', () => {

        try {
            let filter = new ContentItemFilter();
            filter.durationUntil = new Duration()
            filter.durationSince.setDuration(3,10,20);
        
             let durationSince = filter.durationSince;
             expect(durationSince).toBeNull()

        } catch (error) {
            expect(error).toBeInstanceOf(Error)
         }
        
    })

});

//? - - - - - - - - -  - - - RATING  - - - - - - - - -  - - - //  

describe('Escenario 6 - ContentItemFilter - RATING ', () => {

    test('Caso 6.1- Crear un FilterRaiting vacio.', () => {

        let filter = new ContentItemFilter();
         
        expect(filter.ratingSince).toBe(IContentItemRating.Void);
    })

    test('Caso 6.2- Crear un FilterRatingSince & FilterRatingUntil', () => {

        let filter = new ContentItemFilter();
        filter.ratingSince = IContentItemRating.Tres; 
        filter.ratingUntil = IContentItemRating.Cinco

        let filterSince = filter.ratingSince;
        let filterUntil = filter.ratingUntil;
         
        expect(filterSince).toBe(3);
        expect(filterUntil).toBe(5);
    })
});

//? - - - - - - - - -  - - - FECHA CREACION  - - - - - - - - -  - - - //  
describe('Escenario 7 - ContentItemFilter - FECHA CREACION ', () => {

    // Since y Until Default
    test('Caso 7-1 - Filter con fechaCreacionSince & fechaCreacionUntil Default', () => {
         
        let contenido1 = new ContentItemFilter();
       
        let fechaCreacionSince = contenido1.fechaCreacionSince.toLocaleDateString();
        let fechaCreacionUntil = contenido1.fechaCreacionUntil.toLocaleDateString();

        let fechaCreacionSinceDefault = FechaCreacionSinceDefault.toLocaleDateString();
        let fechaCreacionUntilDefault = FechaCreacionUntilDefault.toLocaleDateString();

        customLogger.logDebug(`ContentItemFilterTest, la fechaCreacionSince default=${fechaCreacionSince} & fechaCreacionUntil default =${fechaCreacionUntil} `)

        expect(fechaCreacionSince).toBe(fechaCreacionSinceDefault);
        expect(fechaCreacionUntil).toBe(fechaCreacionUntilDefault);

    });

    // Since y Until nuevas
    test('Caso 7-2 - Filter con fechaCreacionSince & fechaCreacionUntil nueva', () => {
         
        let contenido1 = new ContentItemFilter();
        contenido1.fechaCreacionSince = new Date(2022, 1, 10)
        contenido1.fechaCreacionUntil= new Date(2022,10,10)
        
        let fechaCreacionSince = contenido1.fechaCreacionSince
        let fechaCreacionUntil = contenido1.fechaCreacionUntil
        
        customLogger.logDebug(`ContentItemFilterTest, la fechaCreacionSince nueva=${fechaCreacionSince} & fechaCreacionUntil nueva=${fechaCreacionUntil}`)

        expect(fechaCreacionSince).not.toBeNull();
        expect(fechaCreacionUntil).not.toBeNull();      
        
    });

    // Max error
    test('Caso 7-3 - Filter con fechaCreacionSince & fechaCreacionUntil max error', () => {
        try {

            let contenido1 = new ContentItemFilter();
            contenido1.fechaCreacionSince = new Date(2050, 10, 10)
            contenido1.fechaCreacionUntil = new Date(2050,10,10)
            
            let response: Date = contenido1.fechaCreacionSince; 
            let response2: Date = contenido1.fechaCreacionUntil 
            
            expect(response).not.toBeNull();
            expect(response2).not.toBeNull();

        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }
    });

    // Min error
    test('Caso 7-4 - Filter con fechaCreacionSince & fechaCreacionUntil min error', () => {    
       try {

            let contenido1 = new ContentItemFilter();
            contenido1.fechaCreacionSince = new Date(1950, 10, 10)
            contenido1.fechaCreacionUntil = new Date(1950,10,10)
            
            let response: Date = contenido1.fechaCreacionSince; 
            let response2: Date = contenido1.fechaCreacionUntil 
            
            expect(response).toBeNull();
            expect(response2).toBeNull();

        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }
        
    });
});



