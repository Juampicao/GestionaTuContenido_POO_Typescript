import { ErrorExternoAlPasarParams } from "../error/NoHayResultadosError";

export class Duration {
    private _hh: number; 
    private _mm: number;
    private _ss: number;

    constructor() {
        this._hh = 0
        this._mm = 0;
        this._ss = 0;
    }

    /**
     * Crear la duracion desde este método, tiene las restricciones (numeros negativos, numeros maximos.)
     * ! Ningun param puede ser negativo
     * @param hh number 
     * @param mm number 
     * @param ss number 
     */
    setDuration(hh: number = 0, mm: number = 0, ss: number = 0) {
        if (hh < 0 || mm < 0 || ss < 0) {        
            throw new ErrorExternoAlPasarParams(`No puede ser negativa la duracion hh:${hh}, mm:${mm}, ss:${ss}`)
        }
    
        this._hh = hh; 
        this._mm = mm;
        this._ss = ss; 

    }

    getDuration() {
        let response = `${this.padTo2Digits(this._hh)+`:`+ this.padTo2Digits(this._mm)+`:`+this.padTo2Digits(this._ss)}`
        return response;
    }

    getDurationWithLetter() {
        let response = `${this.padTo2Digits(this._hh)+`hh`+`:`+ this.padTo2Digits(this._mm)+`mm`+`:`+this.padTo2Digits(this._ss)+`ss`}`
        return response;
    }

    getDurationWithDescription() {
        return `${this.padTo2Digits(this._hh)} hours: ${this.padTo2Digits(this._mm)} minutes: ${this.padTo2Digits(this._ss)} seconds`
    }

    getDurationTotalInSeconds(duration: Duration) : number {
    
        let response = duration.getDuration();
        let hours = response.slice(0, 2)
        let minutes = response.slice(3, 5)
        let seconds = response.slice(6, 8)
        
        let totalSecondsDuration = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds); 

        return totalSecondsDuration;
    }

    getDurationTotalInMinutes(duration: Duration) : number {
    
        let response = duration.getDuration();
        let hours = response.slice(0, 2)
        let minutes = response.slice(3, 5)
        let seconds = response.slice(6, 8)
        
        let totalSecondsDuration = Number(hours) * 60 + Number(minutes) * 1 + Number(seconds) * 0.0166667; 

        return totalSecondsDuration;
    }

    // Convert 2 digits number
    padTo2Digits(num : number) {
        return num.toString().padStart(2, '0');
    }
    
    
}