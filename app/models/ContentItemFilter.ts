import { ErrorExternoAlPasarParams } from "../error/NoHayResultadosError";
import { IContentItemRating } from "../interfaces/IContentItemRating";
import { IContentType } from "../interfaces/IContentType";
import { FechaCreacionSinceDefault, FechaCreacionUntilDefault, maxDurationSince, maxDurationUntil, maxFechaCreacionSince, maxFechaCreacionUntil, maxRatingFilter, minDurationSince, minDurationUntil, minFechaCreacionSince, minFechaCreacionUntil, minRatingFilter } from "../utils/ConfigurationENV";
import { CustomLogger } from "../utils/CustomLogger";
import { Duration } from "./Duration";

let _customLogger = new CustomLogger(); 

export class ContentItemFilter {    
 
    private _title: string;
    private _titleOrDescription: string; 
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
        this._titleOrDescription = "";
        this._contentType = IContentType.Void;
        this._tags = [];
        this._description = "";
        this._durationSince = minDurationSince;
        this._durationUntil = maxDurationUntil;
        this._ratingSince = IContentItemRating.Uno;
        this._ratingUntil = IContentItemRating.Cinco;
        // this._ratingSince = IContentItemRating.Uno;
        // this._ratingUntil = IContentItemRating.Cinco;
        this._fechaCreacionSince = FechaCreacionSinceDefault;
        this._fechaCreacionUntil = FechaCreacionUntilDefault;
    }
    
    /**
     * Setear el titulo del filtro.
     * @param title: Titulo
     */
    public set title(title: string) {
        
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

     /**
     * @return title del filtro .
     */
    public get title() : string {
        return this._title.toLowerCase();
    }

    /**
     * Setea el titulo o descripcion del filtro.
     * @param titleOrDescription : El titulo o la descripcion pueden ser ingresadas.
     */
    public set titleOrDescription(titleOrDescription: string) {
          let RegEx3Letters: RegExp = /(.*[a-z]){3}/i;

        if (RegEx3Letters.test(titleOrDescription)) {

            this._titleOrDescription = titleOrDescription.toLocaleLowerCase(); 
            
        } else {
            throw new ErrorExternoAlPasarParams(`Debe contener al menos 3 letras.`)
        }
    }

    /**
     * @return el titulo o la descripcion del filtro.
     */
    public get titleOrDescription() : string {
        return this._titleOrDescription.toLocaleLowerCase();
    }

    /**
     * Setear el tipo de contenido del filtro
     * @param contentType Tipo de contenido : IContentType
     */
    set contentType(contentType: IContentType) {
        this._contentType = contentType;
    }

    /**
     * @return el tipo de contenido del filtro.
     */
    public get contentType() : IContentType{
        return this._contentType
    }

    /**
     * Setea todos los tags del filtro
     * @param tags: Array de etiquetas. 
     */
    public set tags(tags: string[]) {
        this._tags = tags;
    }

    /**
     * @return todo el array de etiquetas del filtro.
     */
    public get tags(): string[] {
        return this._tags
    }

    /**
     * Setea la descripción del filtro.
     * @param description descripción del filtro.
     */
    public set description(description: string) {
        this._description = description.toLowerCase();
    };

    /**
     * @return la descripcion del filtro.
     */
    public get description() : string {
        return this._description.toLowerCase();
    }

    
    /**
     * Setea la duración desde, del filtro.
     * ! negativo ! <minDurationSince ! >maxDurationSince>
     * @param durationSince:Duration
     */
    public set durationSince(durationSince: Duration) {
        if (durationSince > maxDurationSince || durationSince < minDurationSince) {
            throw new ErrorExternoAlPasarParams(`La duracion debe estar entre ${minDurationSince} y ${maxDurationSince} `)
        }
        this._durationSince = durationSince
    }

    /**
     * @return la duración desde, del filtro.
     */
    public get durationSince() : Duration {
        return this._durationSince;
    }

    /**
    * Setea la duracion hasta del filtro.
    * ! negativo ! < minDurationUntil ! > maxDurationUntil
    * @param durationUntil:Duration
    */
    public set durationUntil(durationUntil: Duration) {
          if (durationUntil > maxDurationUntil || durationUntil < minDurationUntil) {
            throw new ErrorExternoAlPasarParams(`La duracion debe estar entre ${minDurationSince} y ${maxDurationSince} `)
        }
        this._durationUntil = durationUntil
    }

    /**
     * @return la duracion hasta del filtro.
     */
    public get durationUntil() : Duration {
        return this._durationUntil;
    }

    /**
    * Setea el rating desde del filtro.      
    * ! < minRatingFilter ! > maxRatingFilter
    * @param rating:IContentItemRating
    */
    public set ratingSince(rating: IContentItemRating) {
        if (rating > maxRatingFilter || rating < minRatingFilter) {
            throw new ErrorExternoAlPasarParams(`El rating debe estar entre ${minRatingFilter} y ${maxRatingFilter}. El rating filtrado actual es Desde:${this._ratingSince}  Hasta:${this._ratingUntil}`)
        }
        this._ratingSince = rating; 
    }

    /**
     * @return el ratingdesde del filtro.
     */
    public get ratingSince() : IContentItemRating {
        return this._ratingSince;
    }

    /**
     * Setea el rating hasta a buscar por el filtro.
     * ! < minRatingFilter ! > maxRatingFilter
     * @param rating:IContentItemRating
     */
    public set ratingUntil(rating: IContentItemRating) {
        if (rating > maxRatingFilter || rating < minRatingFilter) {
            throw new ErrorExternoAlPasarParams(`El rating debe estar entre ${minRatingFilter} y ${maxRatingFilter}. El rating filtrado actual es Desde:${this._ratingSince}  Hasta:${this._ratingUntil}`)
        }
        this._ratingUntil = rating;
    }

    /**
     * @returns el rating hasta del filtro a buscar.
     */
    public get ratingUntil() : IContentItemRating{
        return this._ratingUntil;
    }
  

    /**
     * Setea la fecha de creacion desde a buscar por el filtro
     * ! <minFechaCreacionSince ! > maxFechaCreacionSince
     * @param fechaCreacionSince: Fecha desde.
     */
    public set fechaCreacionSince(fechaCreacionSince: Date) {
        
        _customLogger.logDebug(`ContentItemFilter, FechaCreacionSinceParam:${fechaCreacionSince}`)
        if (fechaCreacionSince > maxFechaCreacionSince || fechaCreacionSince < minFechaCreacionSince) {
            throw new ErrorExternoAlPasarParams(`La fechaCreacionSince debe estar entre ${minFechaCreacionSince} y ${maxFechaCreacionSince} `)
        }
        this._fechaCreacionSince = fechaCreacionSince;
    }

    /**
     * 
     * @returns la fecha de creacion desde a buscar por el filtro
     */
    public get fechaCreacionSince()  : Date {
        return this._fechaCreacionSince
    }

    /**
     * Setea la fecha de creacion hasta a buscar por el filtro
     * ! <minFechaCreacionUntil ! > maxFechaCreacionUntil
     * @param fechaCreacionUntil: Fecha hasta a buscar por el filtro.
     */
    public set fechaCreacionUntil(fechaCreacionUntil: Date) {

        _customLogger.logDebug(`ContentItemFilter, FechaCreacionUntilParam:${fechaCreacionUntil}`)
         if (fechaCreacionUntil > maxFechaCreacionUntil || fechaCreacionUntil < minFechaCreacionUntil) {
            throw new ErrorExternoAlPasarParams(`La fechaCreacionUntil debe estar entre ${minFechaCreacionUntil} y ${maxFechaCreacionUntil} `)
        }
        this._fechaCreacionUntil = fechaCreacionUntil;
    }

    /**
     * @returns fecha de creacion hasta a abuscar por el filtro.
     */
    public get fechaCreacionUntil() : Date {
        return this._fechaCreacionUntil
    }

    
    // ToString
    public toString() : string {
        return `ContentItemFilter: title=${this._title} , description=${this._description}, contentType=${this._contentType}, durationSince=${JSON.stringify(this._durationSince)}, durationUntil=${JSON.stringify(this._durationUntil)}, fechaCreacionSince=${this._fechaCreacionSince}, fechaCreacionUntil=${this._fechaCreacionUntil}, ratingSince=${this._ratingSince}, ratingUntil=${this._ratingUntil}, tags=${this._tags}` 
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