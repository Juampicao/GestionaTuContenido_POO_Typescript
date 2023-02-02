import { ErrorExternoAlPasarParams } from "../error/NoHayResultadosError";
import { IContentItemRating } from "../interfaces/IContentItemRating";
import { IContentType } from "../interfaces/IContentType";
import { contentTypeDefault, durationDefaultContentItem, fechaCreacionDefault, FechaCreacionSinceDefault, FechaCreacionUntilDefault, maxDurationUntil, maxDurationVideo, maxFechaCreacion, maxFechaCreacionSince, maxRatingFilter, minDurationSince, minDurationVideo, minFechaCreacion, minFechaCreacionSince, minRatingFilter, RatingDefault } from "../utils/ConfigurationENV";
import { CustomLogger } from "../utils/CustomLogger";
import { Duration } from "./Duration";

let customLogger = new CustomLogger();

export class ContentItem {
    
    private _title: string;
    private _description: string;
    private _contentType: IContentType;
    private _tags: Array<string>;
    private _duration: Duration;
    private _rating: IContentItemRating;
    private _fechaCreacion: Date;
    
    /**
     * 
     * @param title  Titulo.
     * @param description Descripcion.
     * @param contentType tipo de contenido : IContentType.
     * @param tags etiquetas para categorizar el contentItem.
     * @param duration duración.
     * @param rating ranking personal.
     * @param fechaCreacion fecha que fue creado.
     */
    constructor(title: string = "",  description: string = "", contentType: IContentType = contentTypeDefault, tags: Array<string> = [], duration: Duration = durationDefaultContentItem , rating: IContentItemRating = RatingDefault,
        fechaCreacion: Date = fechaCreacionDefault
    ) {
        this._title = title;
        this._description = description;
        this._contentType = contentType;
        this._tags = tags;
        this._duration = duration;
        this._rating = rating;
        this._fechaCreacion = fechaCreacion;
    }

    /**
     * Setear el titulo del contentItem
     * @param title: Titulo
     */
    set title(title: string) {
        this._title = title;
    }

    /**
     * @return title del contentItem.
     */
    get title() : string{
        return this._title
    }

    /**
    * Setear la descripción del contentItem
    * @param description: descripción.
    */
    set description(description: string) {
        this._description = description;
    }

    /**
     * @return description del contentItem
     */
    get description() : string {
        return this._description
    }

  
    /**
     * Verifica si contiene  titulo o descripcion.
     * @param titleOrDescription: string 
     * @return Boolean. 
     */
    containDescriptionOrTitle(titleOrDescription: string) : Boolean {
    
        if (this._title.toLowerCase().includes(titleOrDescription.toLowerCase())) {
            return true
        } else if (this._description.toLowerCase().includes(titleOrDescription.toLowerCase())){
            return true
        } else {
            return false
        }

    }
    
    /**
     * Setear el tipo de contenido del contentItem
     * @param contentType Tipo de contenido : IContentType
     */
    set contentType(contentType: IContentType) {
        this._contentType = contentType;
    }

    /**
     * @return tipo de contenido del contentItem
     */
    get contentType() : IContentType {
        return this._contentType
    }

    /**
     * Setear los tags del contentItem
     * @param tags: etiquetas.
     */
    set tags(tags: string[]) {
        this._tags = tags;
    }

    /**
     * @return tags del contentItem
     */
    get tags() : string[] {
        return this._tags
    }
    
    /**
     * Agrega 1 etiqueta al contentItem
     * @param tag : Etiqueta a agregar.
     */
    addTag(tag: string) {

        if (this._tags.toString().toLocaleLowerCase().includes(tag)) {
            customLogger.logDebug("Ya existe esta etiqueta")
            throw new ErrorExternoAlPasarParams(`Ya existe esta etiqueta`)
        } else {
            this._tags.push(tag);
        }
        
        customLogger.logDebug(`Se ha agregado ${tag}. El nuevo tagArray es:${this._tags}`)
    }
    
    /**
     * Elimina una etiqueta del contentItem
     * @param tag : Etiqueta a eliminar.
     */
    removeTag(tag: string) {

        if (this.containTags([tag])) {
            var index = this._tags.indexOf(tag);
            this._tags.splice(index, 1);
            
            customLogger.logDebug(`Se ha removido ${tag}. El nuevo tagArray es:${this._tags}`)
        } else {
            throw new ErrorExternoAlPasarParams(`No existe la etiqueta ${tag} que se quiso eliminar.`)
        }
    }

    /**
     * Verifica si contiene TODAS las etiquetas.
     * @param tagArr string[];
     * @returns True or False.
     */
    containsEveryTags(tagArr: Array<string>): Boolean {

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
     * @param tagArr string[]
     * @returns True or false
     */
    containTags(tagArr: Array<string>): Boolean {
        
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

  
    /**
     * Setea la duration del ContentItem.
     * ! > maxDuration | < minDuration
     * @param duration duration del contentItem :Duration 
     */
    set duration(duration: Duration) {
        
        if (duration > maxDurationVideo || duration < minDurationVideo) {
            throw new ErrorExternoAlPasarParams(`La duracion debe estar entre ${maxDurationVideo} y ${minDurationVideo} `)
        }
        this._duration = duration
    }

    /**
     * @return la duration del contentItem.
     */
    get duration() : Duration{
        return this._duration
    }

    /**
     * Verificar si el contenido se encuentra entre los 2 parametros de duracion.
     * 
     * @param durationSince: Duration =  MinDurationUntil
     * @param durationUntil: Duration =  MaxDurationUntil
     * @returns Boolean
     */
    
    containsItemsBetweenTwoDurations(durationSince: Duration = minDurationSince, durationUntil: Duration = maxDurationUntil): Boolean {
            
        // Since > Until, throw Error.
        if ( durationUntil !== undefined && durationSince > durationUntil) {
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

    /**
     * Setea el ranking del ContentItem.
     * @param rating  rating del contentItem : IContentItemRating.
     */
    set rating(rating: IContentItemRating) {
        this._rating = rating;
    }

    /**
     * @return rating del contentItem.
     */
    get rating() : IContentItemRating {
        return this._rating;
    }

    
    /**
     * Verifica si existe entre los dos filtros.
     * 
     * @param ratingSince: IContentItemRating = minRatingFilter; 
     * @param ratingUntil: IContentItemRating = maxRatingFilter;
     * 
     * @return Boolean
     */
    containsRating(ratingSince: IContentItemRating = minRatingFilter, ratingUntil :IContentItemRating = maxRatingFilter) : Boolean{
        
        customLogger.logDebug(`Desde containsRating(), this._rating=${this._rating}, ratingSince=${ratingSince} y ratingUntil=${ratingUntil}`)
         
        // Ambos parametros existen.
        // if (ratingSince !== undefined) {

        //     if ( ratingSince <= this._rating && this._rating <= ratingUntil) {
        //         return true
        //     } else { 
        //         return false; 
        //     }
        // }
        if (ratingSince !== undefined) {

            if ( this._rating >= ratingSince && this._rating <= ratingUntil) {
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

    /**
     * Setea la fecha de creación del ContentItem.
     * ! < minFechaCreacion ! > maxFechaCreacion
     * @param fechaCreacion: Date de creacion.
     */
    set fechaCreacion(fechaCreacion: Date) {
        if (fechaCreacion > maxFechaCreacion || fechaCreacion < minFechaCreacion) {
            throw new ErrorExternoAlPasarParams(`La fechaCreacion debe estar entre ${maxFechaCreacion} y ${minFechaCreacion} `)
        }
        this._fechaCreacion = fechaCreacion; 
    }

    get fechaCreacion() : Date {
        return this._fechaCreacion
    }

    /**
     * Verifica si el contentItem se encuentra en el rango de dos fechas.
     * ! > maxFechaCreacionSince ! < minFechaCreacionSince;
     * @param fechaCreacionSince : Date = FechaCreacionSinceDefault
     * @param fechaCreacionUntil : Date = FechaCreacionUntilDefault
     * @returns boolean
     */
    containsFechaCreacion(fechaCreacionSince: Date = FechaCreacionSinceDefault, fechaCreacionUntil: Date = FechaCreacionUntilDefault) : Boolean{
        
        customLogger.logDebug(`Desde containsFechaCreacion(), this._fechaCreacion=${this._fechaCreacion}, fechaCreacionSince=${fechaCreacionSince} y fechaCreacionUntil=${fechaCreacionUntil}`)
         
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

    toString(): string {
        return `ContentItem: Title=${this._title}, ContentType=${this._contentType}, Duration=${JSON.stringify(this._duration)}, fechaCreacion=${this._fechaCreacion}, rating=${this._rating}, tags=${this._tags}, descripcion=${this._description}`
    }
};


