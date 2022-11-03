import { Duration } from "../models/Duration";
import { IContentItemRating } from "../interfaces/IContentItemRating";
import { IContentType } from "../interfaces/IContentType";

// - - - - -  DURATION - - - - - //
//? Duration Video
export const minDurationVideo: Duration = new Duration()
minDurationVideo.setDuration(0, 0, 1)

export const maxDurationVideo: Duration = new Duration()
maxDurationVideo.setDuration(3, 0, 0)

//? Since
export const maxDurationSince: Duration = new Duration()
maxDurationSince.setDuration(3, 0, 0)
        
export const minDurationSince: Duration = new Duration()
minDurationSince.setDuration(0, 0, 1)

//? Until
export const maxDurationUntil: Duration = new Duration()
maxDurationUntil.setDuration(3, 0, 1)

export const minDurationUntil: Duration = new Duration()
minDurationUntil.setDuration(0, 0, 2)

// - - - - -  RATING - - - - - //
// ? Rating Default 
export const RatingDefault: IContentItemRating = IContentItemRating.Void; 

// ? Rating ContentItem
export const minRatingContentItem: IContentItemRating = IContentItemRating.Uno; 
export const maxRatingContentItem: IContentItemRating = IContentItemRating.Cinco; 

// ? Rating ContentitemFilter
export const minRatingFilter: IContentItemRating = IContentItemRating.Uno; 
export const maxRatingFilter: IContentItemRating = IContentItemRating.Cinco; 

// - - - - -  FECHA CREACION - - - - - //
//? FechaCreacionPorDefecto

export const fechaCreacionDefault: Date = new Date();

//? FechaCreacion
export const maxFechaCreacion: Date = new Date("2040 01 01");
export const minFechaCreacion: Date = new Date("2000 01 01");

//? FechaCreacionSinceFilter
export const minFechaCreacionSince: Date = new Date("2000 01 01");
export const maxFechaCreacionSince: Date = new Date("2040 01 01");
export const FechaCreacionSinceDefault: Date = minFechaCreacionSince;

//? FechaCreacionUntilFilter
export const minFechaCreacionUntil: Date = new Date("2000 01 01");
export const maxFechaCreacionUntil: Date = new Date("2040 01 01");
export const FechaCreacionUntilDefault: Date = maxFechaCreacionUntil
    
//? Pagination
// export const pageDefault: number = 1;
// export const limitDefault: number = 2;
// export const startIndex: number = (page - 1) * limit
// export const endIndex:number = page * limit

// - - - - --  ContentType Default - - - - - // 
export const contentTypeDefault: IContentType = IContentType.Video; 

// ? Page Iterator // 
export const maxLimitByPage: number = 200;
export const minLimitByPage: number = 1;


//Todo Hoy => Export como json;




