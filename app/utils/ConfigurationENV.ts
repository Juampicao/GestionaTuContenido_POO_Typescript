import { Duration } from "../models/Duration";
import { IContentItemRating } from "../interfaces/IContentItemRating";

// - - - - -  DURATION - - - - - //
//? Duration Video
export let minDurationVideo: Duration = new Duration()
minDurationVideo.setDuration(0, 0, 1)

export let maxDurationVideo: Duration = new Duration()
maxDurationVideo.setDuration(3, 0, 0)

//? Since
export let maxDurationSince: Duration = new Duration()
maxDurationSince.setDuration(3, 0, 0)
        
export let minDurationSince: Duration = new Duration()
minDurationSince.setDuration(0, 0, 1)

//? Until
export let maxDurationUntil: Duration = new Duration()
maxDurationUntil.setDuration(3, 0, 1)

export let minDurationUntil: Duration = new Duration()
minDurationUntil.setDuration(0, 0, 2)

// - - - - -  RATING - - - - - //
// ? Rating ContentItem
export let minRatingContentItem: IContentItemRating = IContentItemRating.Uno; 
export let maxRatingContentItem: IContentItemRating = IContentItemRating.Cinco; 

// ? Rating ContentitemFilter
export let minRatingFilter: IContentItemRating = IContentItemRating.Uno; 
export let maxRatingFilter: IContentItemRating = IContentItemRating.Cinco; 

// - - - - -  FECHA CREACION - - - - - //
//? FechaCreacionPorDefecto

export let fechaCreacionDefault: Date = new Date();

//? FechaCreacion
export let maxFechaCreacion: Date = new Date("2040 01 01");
export let minFechaCreacion: Date = new Date("2000 01 01");

//? FechaCreacionSinceFilter
export let minFechaCreacionSince: Date = new Date("2000 01 01");
export let maxFechaCreacionSince: Date = new Date("2040 01 01");
export let FechaCreacionSinceDefault: Date = minFechaCreacionSince;

//? FechaCreacionUntilFilter
export let minFechaCreacionUntil: Date = new Date("2000 01 01");
export let maxFechaCreacionUntil: Date = new Date("2040 01 01");
export let FechaCreacionUntilDefault: Date = maxFechaCreacionUntil
    

