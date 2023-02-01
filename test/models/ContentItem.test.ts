import { ErrorExternoAlPasarParams } from "../../app/error/NoHayResultadosError";
import { IContentItemRating } from "../../app/interfaces/IContentItemRating";
import { IContentType } from "../../app/interfaces/IContentType";
import { ContentItem } from "../../app/models/ContentItem";
import { Duration } from "../../app/models/Duration";
import { contentTypeDefault, fechaCreacionDefault, FechaCreacionSinceDefault, RatingDefault } from "../../app/utils/ConfigurationENV";
import { CustomLogger } from "../../app/utils/CustomLogger";

/**
 * 1) Title
 * 2) Title or Description
 * 3) ContentType
 * 4) Description
 * 5) Duration
 * 6) Rating
 * 7) Fecha Creacion
 * 8) Tags, removeTag, containTag, containsEveryTags, Add Tag.
 */


let customLogger = new CustomLogger();

//? - - - - - - - - -  - - - TITLE  - - - - - - - - -  - - - //  

describe('Escenario 01 - Test ContentItem - TITLE', () => {

    test('Caso 1.1 - Nuevo', () => {

        let contenido1 = new ContentItem()
        
        contenido1.title = "Angular";
    
        expect(contenido1.title).toBe("Angular");
    });
    

});

//? - - - - - - - - -  - - - TITLEORDESCRIPTION  - - - - - - - - -  - - - //  
describe('Escenario 02 - Test ContentItem - TITLEORDESCRIPTION', () => {

    //? Solo titulo
    test('Caso 2.1  - Solo Titulo Case Insensitive', () => {

        let contenido1 = new ContentItem()
        contenido1.title = "El titulo es este";

        let filter = "TituLO";
        let response = contenido1.containDescriptionOrTitle(filter);

        expect(response).toBeTruthy();
    });

    //? Solo descripcion
    test('Caso 2.2  -Solo Descripcion Case Insensitive', () => {

        let contenido1 = new ContentItem()
        contenido1.description = "La descripcion";

        let filter = "DEScriPciOn";
        let response = contenido1.containDescriptionOrTitle(filter);
        
        expect(response).toBeTruthy();
    });

    //? Titulo or descripcion
    test('Caso 2.3 - Descripcion y titulo Case Insensitive', () => {

        let contenido1 = new ContentItem();
        contenido1.title = "El titulo es este";
        contenido1.description = "La descripcion";

        let filter = "DEScriPciOn";
        let response = contenido1.containDescriptionOrTitle(filter);
        
        expect(response).toBeTruthy();
    });
   
    //! No contiene titulo.
    test('Caso 2.4 - Contiene titulo - False ', () => {
    
        let contenido1 = new ContentItem();
        contenido1.title = "Esto es un nuevo titulo";
        contenido1.description = "River Plate";

        let response = contenido1.containDescriptionOrTitle("NO TIENE");
        expect(response).toBeFalsy()

    });

    
});

//? - - - - - - - - -  - - - CONTENTTYPE  - - - - - - - - -  - - - //  

describe('Escenario 03 - Test ContentItem - CONTENTTYPE', () => {

    //? Default
    test('Caso 3.1 - Default', () => {
        
        let contenido1 = new ContentItem()
       
        expect(contenido1.contentType).toBe(contentTypeDefault)
    }); 

    //? Nuevo
    test('Caso 3.2 - Nuevo', () => {
        
        let contenido1 = new ContentItem()
        contenido1.contentType = IContentType.Article
       
        expect(contenido1.contentType).toBe(IContentType.Article)
    }); 

    //? Video
    test('Caso 3.3 - Video', () => {
        
        let contenido1 = new ContentItem()
        contenido1.contentType = IContentType.Video
       
        expect(contenido1.contentType).toBe(IContentType.Video)
    }); 

        //? Caso Falso
    test('Caso 3.4 - False Case', () => {
        
        let contenido1 = new ContentItem()
        contenido1.contentType = IContentType.Video
       
        expect(contenido1.contentType).not.toBe(IContentType.Article)
    }); 

});

//? - - - - - - - - -  - - - DESCRIPTION  - - - - - - - - -  - - - //  

describe('Escenario 04 - Test ContentItem - DESCRIPTION', () => {
    
    test('Caso 4.1 - Nuevo', () => {

        let contenido1 = new ContentItem();
        contenido1.description = "Esto es la descripcion de un contenido."

        expect(contenido1.description).toBe("Esto es la descripcion de un contenido.")
    });

    test('Caso 4.1 - Nuevo', () => {

        let contenido1 = new ContentItem();
        contenido1.description = "Esto es la descripcion de un contenido."

        expect(contenido1.description).toBe("Esto es la descripcion de un contenido.")
    });

});

//? - - - - - - - - -  - - - DURATION  - - - - - - - - -  - - - //  

describe('Escenario 05 - Test ContentItem - DURATION', () => {

    // Ambos parametros, Since & Until. Expect truthy.
    test('Caso 5.1 - Duration - Ambos parametros. 4 & 6 minutos.', () => {
       
        let contenido1 = new ContentItem()
        contenido1.duration.setDuration(0,5,0)
        
        // Crear 2 Durations Class, para comparar 2 valores.
        let durationSince = new Duration()
            durationSince.setDuration(0, 4, 0);
        let durationUntil = new Duration()  
            durationUntil.setDuration(0, 6, 0); 
        
        let response: Boolean = contenido1.containsItemsBetweenTwoDurations(durationSince, durationUntil);

        expect(response).toBeTruthy();
        
    })

    // Ambos parametros, Since & Until. Pero no cumple con los parametros, expect false.
    test('Caso 5.2 - Duration - Solo Until. 6 y 8 minutos  ', () => {       
        
        let contenido1 = new ContentItem()
        contenido1.duration.setDuration(0, 5, 0)
        
        // Crear 2 Durations Class, para comparar 2 valores.
        let durationSince = new Duration()
            durationSince.setDuration(0, 6, 0);
        let durationUntil = new Duration()  
            durationUntil.setDuration(0, 8, 0); 
        
        let response: Boolean = contenido1.containsItemsBetweenTwoDurations(durationSince, durationUntil);

        expect(response).toBeFalsy();
        
     })
    
    
    // Solo Until
    test('Caso 5.3 - Duration - Solo Until. Until 10 minutos  ', () => {

        let contenido1 = new ContentItem()
        contenido1.duration.setDuration(0, 5, 0)
        
         // Crear 2 Durations Class, para comparar 2 valores.
        let durationSince = new Duration()
            durationSince.setDuration(0, 0, 0);
        let durationUntil = new Duration()  
            durationUntil.setDuration(0, 10, 0); 
        
        let response: Boolean = contenido1.containsItemsBetweenTwoDurations(durationSince, durationUntil);


        expect(response).toBeTruthy();

    })

    // Solo Until espero false. 
    test('Caso 5.4 - Duration - Solo Until. Until 3,20 minutos. False ', () => {

        let contenido1 = new ContentItem()
        contenido1.duration.setDuration(0, 5, 0)
        
         // Crear 2 Durations Class, para comparar 2 valores.
        let durationSince = new Duration()
            durationSince.setDuration(0, 0, 0);
        let durationUntil = new Duration()  
            durationUntil.setDuration(0, 3, 20); 
        
        let response: Boolean = contenido1.containsItemsBetweenTwoDurations(durationSince, durationUntil);


        expect(response).toBeFalsy();

    })


    // Solo Since
    test('Caso 5.5 - Duration - Solo Since.  Since 3.2 minutos  ', () => {
      
        let contenido1 = new ContentItem()
        contenido1.duration.setDuration(0, 5, 0)
        
            // Crear 1 Durations Class, para FILTRAR.
        let durationSince = new Duration()
            durationSince.setDuration(0, 3, 20);
         
        let response: Boolean = contenido1.containsItemsBetweenTwoDurations(durationSince);

        expect(response).toBeTruthy();
        
    })

    // Solo Since, expect false
     test('Caso 5.6 - Duration - Solo Since. Since 6,4 minutos. expect False  ', () => {
      
        let contenido1 = new ContentItem()
         contenido1.duration.setDuration(0, 5, 0)
         
            // Crear 1 Durations Class, para FILTRAR.
        let durationSince = new Duration()
            durationSince.setDuration(0, 6, 40); 
      
        
        let response: Boolean = contenido1.containsItemsBetweenTwoDurations(durationSince);

        expect(response).toBeFalsy();
        
     })
    
     // 2 contenidos 
     test('Caso 5.6 BIS - Duration - Solo Since. 2 contenidos  ', () => {
      
        let contenido1 = new ContentItem()
         contenido1.duration.setDuration(0, 5, 0)
         
        let contenido2 = new ContentItem()
        contenido2.duration.setDuration(0, 10, 0)
        
          // Crear 1 Durations Class, para FILTRAR.
        let durationSince = new Duration()
            durationSince.setDuration(0, 6, 40); 
      
        
         let responseContenido1: Boolean = contenido1.containsItemsBetweenTwoDurations(durationSince);
         let responseContenido2: Boolean = contenido2.containsItemsBetweenTwoDurations(durationSince);
         

        expect(responseContenido1).toBeFalsy();
        expect(responseContenido2).toBeTruthy();
         
     })
    
    test('Caso 5.7 - Crear ContentItem con duration', () => {
        
        let contenido1 = new ContentItem()
        
        contenido1.duration.setDuration(11, 22, 3)
         
        let response = contenido1.duration.getDuration();

        expect(response).toBe(`11:22:03`)
     });
    
    test('Caso 5.8 - Retornar los segundos totales de duracion de video', () => {

        let contenido1 = new ContentItem();
        contenido1.duration.setDuration(2, 0, 25)
        let result = contenido1.duration.getDurationTotalInSeconds(contenido1.duration);

        console.log(`El total de segundos es:  ${result}`)
         
        expect(result).toEqual(7225)

    });

    test('Caso 5.9- Crear duracion negativa', () => {

        try {
            let contenido1 = new ContentItem().duration.setDuration(-1, 10, 20)
            expect(contenido1).not.toBeNull();
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }      
    })

    test('Caso 5.10- Crear duracion MAXDURATIONVIDEO & MINDURATIONVIDEO ERROR', () => {

        try {
            let contenido1 = new ContentItem().duration.setDuration(4, 10, 20)
            expect(contenido1).not.toBeNull();
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }      
    })

});


//? - - - - - - - - -  - - - RATING  - - - - - - - - -  - - - //  

describe('Escenario 06 - Test ContentItem - RATING', () => {

    //? Crear Rating
    test('Caso 6.1 - Crear un item con rating 5', () => {
        let contenido1 = new ContentItem();
        contenido1.rating = IContentItemRating.Cinco

        let response = contenido1.rating
           
        expect(response).toBe(5)  
    });

    //? Default 1 a 5 rating.
    test('Caso 6.2 - containsRating(), SIN FILTROS', () => {
         
        let contenido1 = new ContentItem();
        contenido1.rating = IContentItemRating.Cinco;

        let response = contenido1.containsRating();
        
        expect(response).toBeTruthy();
        
    });

    //? Solo SinceRating
    test('Caso 6.3 - containsRating(), SinceRating = 2', () => {
         
        let contenido1 = new ContentItem();
        contenido1.rating = IContentItemRating.Cinco;

        let response = contenido1.containsRating(IContentItemRating.Uno);
        
        expect(response).toBeTruthy();
    });

    // Solo UntilRating
    // ! Si paso el 0, en vez de tomar el minRatingFilter, toma el 0.
    // Todo: ¿Como evito pasar el since?
    test('Caso 6.4- containsRating(), UntilRating = 4', () => {
         
        let contenido1 = new ContentItem();
        contenido1.rating = IContentItemRating.Cinco;

        let untilRating = IContentItemRating.Cinco;
        let response = contenido1.containsRating(0, untilRating);
        
        expect(response).toBeTruthy();
        
    });

     test('Caso 6.5- containsRating(), expect false', () => {
         
        let contenido1 = new ContentItem();
        contenido1.rating = IContentItemRating.Cinco;

        let untilRating = IContentItemRating.Cuatro;
        let response = contenido1.containsRating(0, untilRating);
        
        expect(response).toBeFalsy();
        
     });
    
    test('Caso 6.6- containsRating(), ambos parametros', () => {
         
        let contenido1 = new ContentItem();
        contenido1.rating = IContentItemRating.Cinco;

        let sinceRating = IContentItemRating.Cuatro;
        let untilRating = IContentItemRating.Cinco;
        let response = contenido1.containsRating(sinceRating, untilRating);
        
        expect(response).toBeTruthy();
        
    });
    
    test('Caso 6.7- containsRating(), ambos parametros - False', () => {
         
        let contenido1 = new ContentItem();
        contenido1.rating = IContentItemRating.Tres;

        let sinceRating = IContentItemRating.Cuatro;
        let untilRating = IContentItemRating.Cinco;
        let response = contenido1.containsRating(sinceRating, untilRating);
        
        expect(response).toBeFalsy();
        
    });
    
    
    // Todo Deberia dar un error 
    test('Caso 6.8- containsRating(), ambos parametros - Since mas grande que Until', () => {
         
        let contenido1 = new ContentItem();
        contenido1.rating = IContentItemRating.Tres;

        let sinceRating = IContentItemRating.Cuatro;
        let untilRating = IContentItemRating.Tres;
        let response = contenido1.containsRating(sinceRating, untilRating);
        
        expect(response).toBeFalsy();
        
     });
    
    test('Caso 6.9- rating default', () => {
         
        let contenido1 = new ContentItem();

        let response = contenido1.rating
        
        expect(response).toBe(RatingDefault);
        
    });
  
    
});

//? - - - - - - - - -  - - - FECHA CREACION  - - - - - - - - -  - - - //  
describe('Escenario 07 - Test ContentItem - Fecha Creacion', () => {

    // Por defecto
    test('Caso 7.1- Creando item fecha de creacion por defecto', () => {
         
        let contenido1 = new ContentItem();
        contenido1.fechaCreacion = new Date()

        let response = contenido1.fechaCreacion.toLocaleDateString(); 
        let fechaCreacionPorDefecto = fechaCreacionDefault.toLocaleDateString();
        
        customLogger.logDebug(`ContentItemTest, 7.1 la fecha creacion por defecto es: ${response}`)

        expect(response).toBe(fechaCreacionPorDefecto)
        
    });

    // Correcta
    test('Caso 7.2- Creando un item con fecha de creacion correcta', () => {
         
        let contenido1 = new ContentItem();
        contenido1.fechaCreacion = new Date(2022, 12, 1)

        let response = contenido1.fechaCreacion
        
        customLogger.logDebug(`ContentItemTest, la fecha creacion correcta sin formatear es: ${response}`)

        expect(response).not.toBeNull();
        
    });

    // Max error.
    test('Caso 7.3- Creando un item con fecha de creacion maxima con error', () => {
        try {
            let contenido1 = new ContentItem();
            contenido1.fechaCreacion = new Date(2050, 12, 1)
    
            let response = contenido1.fechaCreacion
            
            customLogger.logDebug(`ContentItemTest, la fecha creacion maxima con error es: ${response}`)
    
            expect(response).not.toBeNull();
            
        } catch (error) {
            
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams);
        }
    });

    // Min error.
    test('Caso 7.4- Creando un item con fecha de creacion minima con error', () => {
        try {
            let contenido1 = new ContentItem();
            contenido1.fechaCreacion = new Date(1990, 12, 1)
    
            let response = contenido1.fechaCreacion
            
            customLogger.logDebug(`ContentItemTest, la fecha creacion minima con error es: ${response}`)
    
            expect(response).not.toBeNull();
            
        } catch (error) {
            
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams);
        }
    });

    // containsFechaCreacion 2 parametros TRUE
    test('Caso 7.5- containsFechaCreacion() 2 parametros correctos', () => {

            let contenido1 = new ContentItem();
            contenido1.fechaCreacion = new Date(2022, 12, 1)
    
            // Filtros
            let fechaCreacionSince = new Date(2015, 10, 10);
            let fechaCreacionUntil = new Date(2025, 10, 10);
      
            let response = contenido1.containsFechaCreacion(fechaCreacionSince, fechaCreacionUntil)

            expect(response).toBeTruthy()
            
    });

    // containsFechaCreacion 2 parametros FALSE
    test('Caso 7.6- containsFechaCreacion() 2 parametros correctos', () => {
            let contenido1 = new ContentItem();
            contenido1.fechaCreacion = new Date(2022, 12, 1)
    
            // Filtros
            let fechaCreacionSince = new Date(2023, 10, 10);
            let fechaCreacionUntil = new Date(2024, 10, 10);
      
            customLogger.logDebug(`ContentItemTest, containsFechaCreacion(), la fechaCreacionSince ${fechaCreacionSince}, fechaCreacionuntil ${fechaCreacionUntil}`)

            let response = contenido1.containsFechaCreacion(fechaCreacionSince, fechaCreacionUntil)

            expect(response).toBeFalsy()
    });

    // containsFechaCreacion solo since
    test('Caso 7.7- containsFechaCreacion() SOLO SINCE', () => {
            let contenido1 = new ContentItem();
            contenido1.fechaCreacion = new Date(2022, 12, 1)
    
            // Filtros
            let fechaCreacionSince = new Date(2020, 10, 10);
      
            customLogger.logDebug(`ContentItemTest, containsFechaCreacion(), la fechaCreacionSince ${fechaCreacionSince}`)

            let response = contenido1.containsFechaCreacion(fechaCreacionSince)

            expect(response).toBeTruthy()
    });

    // containsFechaCreacion solo until
     test('Caso 7.8- containsFechaCreacion() SOLO UNTIL', () => {
            let contenido1 = new ContentItem();
            contenido1.fechaCreacion = new Date(2022, 12, 1)
    
            // Filtros
            let fechaCreacionSince = FechaCreacionSinceDefault
            let fechaCreacionuntil = new Date(2020, 10, 10);
      
            customLogger.logDebug(`ContentItemTest, containsFechaCreacion(), la fechaCreacionUntil ${fechaCreacionuntil}`)

            let response = contenido1.containsFechaCreacion(fechaCreacionSince,fechaCreacionuntil)

            expect(response).toBeFalsy()
    });

    // containsFechaCreacion error parametros
     test('Caso 7.9- containsFechaCreacion() ERROR', () => {
        try {
            let contenido1 = new ContentItem();
            contenido1.fechaCreacion = new Date(2022, 12, 1)
    
            // Filtros
            let fechaCreacionSince = FechaCreacionSinceDefault
            let fechaCreacionuntil = new Date(1900, 10, 10);
      
            customLogger.logDebug(`ContentItemTest, containsFechaCreacion(), la fechaCreacionUntil ${fechaCreacionuntil}`)

            let response = contenido1.containsFechaCreacion(fechaCreacionSince,fechaCreacionuntil)

            expect(response).toBeFalsy()
            
        } catch (error) {
            
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams);
        }
    }); 
});



//? - - - - - - - - -  - - - 8  TAGS  - - - - - - - - -  - - - //


describe('Escenario 08 - Test ContentItem - TAGS', () => {

    //? 3 Tags.
    test(`Caso 8.1 - TagsArray length 3`, () => {
      
        let contenido1 = new ContentItem()
      
        contenido1.tags = ["React", "Angular", "Typescript"]
        
        expect(contenido1.tags).toHaveLength(3)
    });
    

//? - - - - - - Contain Tag   - - - -  - - - //  

    //? 1 Tag.
    test('Caso 8.2 - containTags - Verificar si contiene "REACT".', () => {
        
        let contenido1 = new ContentItem()
      
        contenido1.tags = ["React", "Angular", "Typescript"]

        let response = contenido1.containTags(["React"]);

        expect(response).toBeTruthy();
    });

    //? Contiene uno pero otros no.
    test('Caso 8.3 - containTags - Si contiene al menos 1, es true. ', () => {
        
        let contenido1 = new ContentItem()

        contenido1.tags = ["React", "Angular", "Typescript"]

        let response = contenido1.containTags(["Este no lo contiene", "Angular", "Pyton"])

        expect(response).toBeTruthy();
       
    });
    
    //! No Contiene ninguno.
    test('Caso 8.4-  containTags - Si contiene al menos 1, es true.(expect false) ', () => {
        
        let contenido1 = new ContentItem()

        contenido1.tags = ["React", "Angular", "Typescript"]

        let response = contenido1.containTags(["Este no lo contiene", "Este tampoco", "Pyton"])

        expect(response).toBeFalsy(); 
    });

//? - - - - -  - Contains Every Tag   - - -   - - - //
    
    //? Contiene todos true.
    test('Caso 8.5-  containTags - Deben estar todos los elementos para ser true.', () => {
        
        let contenido1 = new ContentItem()

        contenido1.tags = ["React", "Angular", "Typescript"]

        let response = contenido1.containsEveryTags(["React", "Angular", "Typescript"])

        expect(response).toBeTruthy();
       
    });

    //! No contiene todos.
    test('Caso 8.6 - containTags - Deben estar todos los elementos para ser true.(caso falso) ', () => {
        
        let contenido1 = new ContentItem()

        contenido1.tags = ["React", "Angular", "Typescript"]

        let response = contenido1.containsEveryTags(["Este no lo contiene", "Angular", "Typescript"])

        expect(response).toBeFalsy();
       
    });


//? - - - - -  - Add Tag    - - -   - - - //

    //? Agregar una etiqueta 
    test('Caso 8.7 - AddTag - Agregar una etiqueta duplicada ', () => {

        let contenido1 = new ContentItem()
        contenido1.tags = ["Angular", "React"]
        contenido1.addTag("Javascript")

        expect(contenido1.tags).toStrictEqual(["Angular","React", "Javascript"])

    });

    //! Etiqueta duplicada.
    test('Caso 8.8 - AddTag - Agregar una etiqueta duplicada ', () => {

        try {
            let contenido1 = new ContentItem()
            contenido1.tags = ["Angular", "React"]
            contenido1.addTag("angular")

            let response = contenido1.tags
            expect(response).toHaveLength(4);

        } catch (error) {
            expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
        }
    });

//? - - - - -  - Remvoe Tag    - - -   - - - //
    
    //? Eliminar 1.
    test('Caso 8.9 -Remove Tag  - Remove una etiqueta  ', () => {
    
        let contenido1 = new ContentItem()

        contenido1.tags = ["React", "Angular", "Typescript"]

         contenido1.removeTag("React")

        expect(contenido1.tags).toStrictEqual(["Angular", "Typescript"]);
    });


    //! Error no existe la etiqueta a remover.
    test('Caso 8.10 - Remove una etiqueta inexistente ', () => {
    
       try {
         let contenido1 = new ContentItem()

        contenido1.tags = ["React", "Angular", "Typescript"]

         contenido1.removeTag("No existe")

        expect(contenido1.tags).toStrictEqual(["React", "Angular", "Typescript"]);
       } catch (error) {
           
        expect(error).toBeInstanceOf(ErrorExternoAlPasarParams)
       }
    });

});





