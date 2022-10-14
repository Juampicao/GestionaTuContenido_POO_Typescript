import { ErrorExternoAlPasarParams } from "../error/NoHayResultadosError";
import { IContentType } from "../interfaces/IContentType";
import { IContentItemRating } from "../interfaces/IContentItemRating";
import { fechaCreacionDefault, FechaCreacionSinceDefault, FechaCreacionUntilDefault, maxDurationUntil, maxDurationVideo, maxFechaCreacion, maxFechaCreacionSince, maxRatingFilter, minDurationVideo, minFechaCreacion, minFechaCreacionSince, minRatingFilter } from "../utils/ConfigurationENV";
import { CustomLogger } from "../utils/CustomLogger";
import { Duration } from "./Duration";

let customLogger = new CustomLogger();

export class ContentItem {
    
    private _title: string; 
    private _contentType: IContentType;
    private _tags: string[];
    private _description: string;
    private _duration: Duration;
    private _rating: IContentItemRating;
    private _fechaCreacion: Date;
    
    constructor(title: string = "", contentType: IContentType = IContentType.Video, tags: Array<string> = [], description: string = "", duration: Duration = new Duration(), rating: IContentItemRating = IContentItemRating.Void,
        fechaCreacion: Date = fechaCreacionDefault
    ) {
        this._title = title;
        this._contentType = contentType;
        this._tags = tags;
        this._description = description;
        this._duration = duration;
        this._rating = rating;
        this._fechaCreacion = fechaCreacion;
    }

    // Title
    set title(title: string) {
        this._title = title;
    }

    get title() {
        return this._title
    }

    // ContentType
    set contentType(contentType: IContentType) {
        this._contentType = contentType;
    }

    get contentType() {
        return this._contentType
    }

    // Tags
    set tags(tags: string[]) {
        this._tags = tags;
    }

    get tags() {
        return this._tags
    }
    
    addTag(tag: string) {

        if (this._tags.toString().includes(tag)) {
            customLogger.logDebug("Ya existe esta etiqueta")
            return
        } else {
            this._tags.push(tag);
        }
        
        customLogger.logDebug(`${this._tags}`)
    }
    
    removeTag(tag: string) {
        var index = this._tags.indexOf(tag);
        this._tags.splice(index, 1);
        
        customLogger.logDebug(`${this._tags}`)
    }

    /**
     * Verifica si contiene TODAS las etiquetas.
     * 
     * @param tagArr string[];
     * @returns True or False.
     */
    containsEveryTags(tagArr: string[]): Boolean {

        let response = containsEveryElements(tagArr, this._tags)
        
        function containsEveryElements(array: string[], target: string[]) {

            if (target.every(element => array.includes(element))) {
                return true
            } else {
                return false
            }
        }
        return response;
    }

    /**
     * Verifica si contiene AL MENOS UNA de las etiquetas.
     * 
     * @param tagArr string[]
     * @returns True or false
     */
    containTags(tagArr: string[]): Boolean {
        
        let response = containsAtLeastOneElementTrue(tagArr, this._tags)
       
        function containsAtLeastOneElementTrue(array1: string[], array2: string[]) {
           
            for (let i = 0; i < array1.length; i++) {
               
                for (let j = 0; j < array2.length; j++) {
                    if (array1[i].toLowerCase() === array2[j].toLowerCase()) {
                        return true;
                    }
                }
            }
            return false;
        }
        return response
    }

    // Description
    set description(description: string) {
        this._description = description;
    }

    get description() {
        return this._description
    }

    
    // Duration
    /**
     * ! maxDuration | minDuration
     * @param duration :Duration 
     */
    set duration(duration: Duration) {
        
        if (duration > maxDurationVideo || duration < minDurationVideo) {
            throw new ErrorExternoAlPasarParams(`La duracion debe estar entre ${maxDurationVideo} y ${minDurationVideo} `)
        }
        this._duration = duration
    }

    get duration() {
        return this._duration
    }

    /**
     * Verificar si el contenido se encuentra entre los 2 parametros de duracion.
     * 
     * @param durationSince type Duration
     * @param durationUntil type Duration, default MaxDurationUntil
     * @returns Boolean
     */
    duracionMaximaUntil: Duration = maxDurationUntil;     
    containsItemsBetweenTwoDurations(durationSince: Duration, durationUntil: Duration = this.duracionMaximaUntil): Boolean {
            
        // Since > Until, throw Error.
        if ( durationUntil !== undefined &&  durationSince > durationUntil) {
            throw new ErrorExternoAlPasarParams((`Since: ${durationSince} , no puede ser menor a Until: ${durationUntil} .`))
        }

        // ? Pasar a minutos las duraciones para comparar.
        let thisDurationInMinutes = this._duration.getDurationTotalInMinutes(this._duration) 
        let durationSinceMinutes = durationSince.getDurationTotalInMinutes(durationSince)
        let durationUntilMinutes = durationSince.getDurationTotalInMinutes(durationUntil)
        
        customLogger.logDebug(`Desde containsItemBetweenTwoDuration: thisDurationMinutes:${durationSinceMinutes}, durationSince ${durationSinceMinutes} y durationUntil ${durationUntilMinutes}`);
   
       // Ambos parametros existen.
        if (durationUntil !== undefined) {

            if ( durationSinceMinutes <= thisDurationInMinutes && thisDurationInMinutes <= durationUntilMinutes) {
                return true
            } else { 
                return false; 
            }
        }

        // Until no existe.
        else if (durationUntil === undefined) {
            if (durationSinceMinutes <= thisDurationInMinutes) {  
                return true
            } else {
                return false
            }
        }

        return false;         
        
    }

    set rating(rating: IContentItemRating) {
        this._rating = rating;
    }

    get rating() {
        return this._rating;
    }

    
    /**
     * Por defecto usa los minRatingFilter/maxRatingFilter de la aplicacion.
     * 
     * @param1 RatingSince: IContentItemRating = minRatingFilter; 
     * @param2 RatingUntil: IContentItemRating = maxRatingFilter;
     * 
     * @return Boolean
     */
    containsRating(ratingSince: IContentItemRating = minRatingFilter, ratingUntil :IContentItemRating = maxRatingFilter) : Boolean{
        
        customLogger.logDebug(`Desde containsRating(), this._rating=${this._rating}, ratingSince=${ratingSince} y ratingUntil=${ratingUntil}`)
         
        // Ambos parametros existen.
        if (ratingSince !== undefined) {

            if ( ratingSince <= this._rating && this._rating <= ratingUntil) {
                return true
            } else { 
                return false; 
            }
        }

         // Until no existe.
        else if (ratingUntil === undefined) {
            if (ratingSince <= this._rating) {  
                return true
            } else {
                return false
            }
        }

        return false;       
    }

    // Fecha Creacion
    set fechaCreacion(fechaCreacion: Date) {
        if (fechaCreacion > maxFechaCreacion || fechaCreacion < minFechaCreacion) {
            throw new ErrorExternoAlPasarParams(`La fechaCreacion debe estar entre ${maxFechaCreacion} y ${minFechaCreacion} `)
        }
        this._fechaCreacion = fechaCreacion; 
    }

    get fechaCreacion() {
        return this._fechaCreacion
    }

    containsFechaCreacion(fechaCreacionSince: Date = FechaCreacionSinceDefault, fechaCreacionUntil: Date = FechaCreacionUntilDefault) : Boolean{
        
        customLogger.logDebug(`Desde containsRating(), this._fechaCreacion=${this._fechaCreacion}, fechaCreacionSince=${fechaCreacionSince} y fechaCreacionUntil=${fechaCreacionUntil}`)
         
         if (fechaCreacionSince > maxFechaCreacionSince || fechaCreacionSince < minFechaCreacionSince) {
            throw new ErrorExternoAlPasarParams(`La fechaCreacionSince debe estar entre ${minFechaCreacionSince} y ${maxFechaCreacionSince} `)
        }

        // Ambos parametros existen.
        if (fechaCreacionSince !== undefined) {

            if ( fechaCreacionSince <= this._fechaCreacion && this._fechaCreacion <= fechaCreacionUntil) {
                return true
            } else { 
                return false; 
            }
        }

         // Until no existe.
        else if (fechaCreacionUntil === undefined) {
            if (fechaCreacionSince <= this._fechaCreacion) {  
                return true
            } else {
                return false
            }
        }

        return false;       
    }

};


/**
 * HACER HOY
 
 * Todo: 1) ToJson y ToString
 *             - ContentItem.
 *             - COntentItemFilter.
 * TOdo: 2) Ordenar test
 *    - // //  ContentItemTest
 *    - // // ContentItemFilterTest
 *    - ContentManagerTest
 *    - ServicioTest
 * 
 * Todo 3) Ordenar comentarios de funciones importentes, quitar codigo extra. Luego los cambio, ordenar
 * Todo 4) Comentarios lindos explicativos en funciones importantes
 * 
 * todo 5) Duration
 *          Todo Extra: 1 solo params en el servicioMock
 *          ? Un minimo y un maximo. Archivo externo con los max y min. Cuidar la aplicacion. Throw error de tipo?
 *          - Debe recibir solo 1 parametros los filtros.
 *          - Test con 1 parametros
 *          - Pasar a ContentFilter
 *          - Pasar a ContentManager
 *          - Pasar a ServicioMock
 *          ! Cada test es por nivel, el problema esta ahi. No ir mas arriba para solucionar el test.
 * 
 *  todo 5) Rating
 *         ? Supocision, Si recibo 2, es de 2 al maximo. Plantear y testear cada caso.
 *          - Debe recibir solo 1 parametros los filtros.
 *          - Test con 1 parametros
 *          - Pasar a ContentFilter
  *          - Pasar a ContentManager
  *          - Pasar a ServicioMock
  *          ! Cada test es por nivel, el problema esta ahi. No ir mas arriba para solucionar el test.
  * 
  * todo 5) Fecha Creacion
  *         ? Una fecha de since y until. Recibir fecha larga y fecha corta. 
  *         ? Iniciar FilterFecha con void.
  *          - Debe recibir solo 1 parametros los filtros.
  *          - Test con 1 parametros
  *          - Pasar a ContentFilter
  *          - Pasar a ContentManager
  *          - Pasar a ServicioMock
  *          ! Un minimo
  * 
  *  HACER MANAÑA
    // Todo: Paginacion. Aparte, con test. Despues con IContentService
    // Todo: Crear una clase "CustomErrorManager" => Get Error Message. adentro crea un throw new error, con el mensaje que pongo aca.
    // Todo: separar interface ICOntetnType de la otra, archivos separados.
 */ 