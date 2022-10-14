import { ErrorExternoAlPasarParams } from "../error/NoHayResultadosError";
import { IContentItemRating } from "../interfaces/IContentItemRating";
import { IContentType } from "../interfaces/IContentType";
import { FechaCreacionSinceDefault, FechaCreacionUntilDefault, maxDurationSince, maxFechaCreacionSince, maxFechaCreacionUntil, maxRatingFilter, minDurationSince, minFechaCreacionSince, minFechaCreacionUntil, minRatingFilter } from "../utils/ConfigurationENV";
import { CustomLogger } from "../utils/CustomLogger";
import { Duration } from "./Duration";

let _customLogger = new CustomLogger(); 

export class ContentItemFilter {    
 
    private _title: string;
    private _contentType!: IContentType; 
    private _tags: string[];
    private _description: string;
    private _durationSince: Duration; 
    private _durationUntil: Duration; 
    private _ratingSince: IContentItemRating
    private _ratingUntil: IContentItemRating;
    private _fechaCreacionSince: Date;
    private _fechaCreacionUntil: Date;

    constructor() {
        this._title = "";
        this._contentType = IContentType.Void;
        this._tags = [];
        this._description = "";
        this._durationSince = new Duration();
        this._durationUntil = new Duration();
        this._ratingSince = IContentItemRating.Void;
        this._ratingUntil = IContentItemRating.Void;
        // ToDo : Debe empezar vacia? como fecha hoy? 
        this._fechaCreacionSince = FechaCreacionSinceDefault;
        this._fechaCreacionUntil = FechaCreacionUntilDefault;
    }

    // Title
    set title(title: string) {
        
        // RegEx 3 letters minimum.
        let RegEx3Letters: RegExp = /(.*[a-z]){3}/i;

        if (RegEx3Letters.test(title)) {

            this._title = title.toLocaleLowerCase();
            
        } else {
            throw new ErrorExternoAlPasarParams(`Debe contener al menos 3 letras.`)
        }

        // Prueba reglaRegex. 3 letras o mas es true, lo demas es false. 
        console.log( "regex ", RegEx3Letters.test('abc'))

    }

    get title() {
        return this._title.toLowerCase();
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

    // Description
    set description(description: string) {
        this._description = description.toLowerCase();
    }

    get description() {
        return this._description.toLowerCase();
    }

    // Duration
    //Todo: max y min
    set durationSince(duration: Duration) {
        //! No puede ser mayor al maxDurationSince
        if (duration > maxDurationSince || duration < minDurationSince) {
            throw new ErrorExternoAlPasarParams(`La duracion debe estar entre ${minDurationSince} y ${maxDurationSince} `)
        }
        this._durationSince = duration
    }

    get durationSince() {
        return this._durationSince;
    }

    //Todo: max y min
    set durationUntil(duration: Duration) {
        //! No puede ser mayor al maxDurationUntil
        this._durationUntil = duration
    }

    get durationUntil() {
        return this._durationUntil;
    }

    // Rating
    set ratingSince(rating: IContentItemRating) {
        if (rating > maxRatingFilter || rating < minRatingFilter) {
            throw new ErrorExternoAlPasarParams(`La duracion debe estar entre ${minRatingFilter} y ${maxRatingFilter} `)
        }
        this._ratingSince = rating; 
    }

    get ratingSince() {
        return this._ratingSince;
    }

    set ratingUntil(rating: IContentItemRating) {
        if (rating > maxRatingFilter || rating < minRatingFilter) {
            throw new ErrorExternoAlPasarParams(`La duracion debe estar entre ${minRatingFilter} y ${maxRatingFilter} `)
        }
        this._ratingUntil = rating;
    }

    get ratingUntil() {
        return this._ratingUntil;
    }
  
    // Fecha Creacion
    set fechaCreacionSince(fechaCreacionSince: Date) {
        
        _customLogger.logDebug(`ContentItemFilter, FechaCreacionSinceParam:${fechaCreacionSince}`)
        if (fechaCreacionSince > maxFechaCreacionSince || fechaCreacionSince < minFechaCreacionSince) {
            throw new ErrorExternoAlPasarParams(`La fechaCreacionSince debe estar entre ${minFechaCreacionSince} y ${maxFechaCreacionSince} `)
        }
        this._fechaCreacionSince = fechaCreacionSince;
    }

    get fechaCreacionSince() {
        return this._fechaCreacionSince
    }

    set fechaCreacionUntil(fechaCreacionUntil: Date) {

        _customLogger.logDebug(`ContentItemFilter, FechaCreacionUntilParam:${fechaCreacionUntil}`)
         if (fechaCreacionUntil > maxFechaCreacionUntil || fechaCreacionUntil < minFechaCreacionUntil) {
            throw new ErrorExternoAlPasarParams(`La fechaCreacionUntil debe estar entre ${minFechaCreacionUntil} y ${maxFechaCreacionUntil} `)
        }
        this._fechaCreacionUntil = fechaCreacionUntil;
    }

    get fechaCreacionUntil() {
        return this._fechaCreacionUntil
    }

    
    
    // ToString
    // ToDo tostring..
    toString() : string {
        return `ContentItemFilter: title=${this._title} , description=${this._description} , et..` 
    }

    // ToDo: Convertilo a json.
    // ${(JSON.stringify(filter, null, 2))}
}



// Todo: Fecha creacion no puedo no inicairlizar, por que en ts.config esta puesto que me lo pida.
// Tip: Siempre el hueso. Donde parar el paginado? el hueso.
// Servicio retorna la lista, el paginado lo recibe, y lo escupe al front.
// Todo: Paginado. Pararme en el hueso. Bajo nivel.
// Pero la interfaaz no pide el paginado al principio.
// Cuidar mi aplicacion, el paginator. depende de un parametro y me pide pagina -2, throw error. Validar que sea valido.
// Ordenar segun lo pedido, como ordeno?. Parametro que recibe, el 3° por ejemplo, por ascendente, descendente.
// Verificar que el page iterator size, coincida con los limits del pagination.
// ¿Cuantas pagians hay?¿ cual es la ultima? ¿adonde va? ¿Cuantos elementos hay? (resolverlo desde el mock, cuantos envia? eso va a repercutir con cantidad de paginas, cual es la ulitma).
// Manejar grados de informacion:
// Dato factico, cuantas cuotas quiere el cliente. no te defrauda
// Caso items, cuantos items hay, es el factico. El relativo, la cantida de paginas.
// 1° Paginado, 2° Paginador, selecciona la pagina. ¿como se en que pagina estas? Voy para la 3, la de adelante. ¿quien sabae donde estoy ahora? memoria.
// Todo: Armar logica de paginado. Test, ordenamiento testimonial, al menos escrito.
// Todo: Total de contentItems.
// Todo:2° Page iterator. 
// TOdo: terminar el tostring(), tojson() en cada contentItem y contentFilter.