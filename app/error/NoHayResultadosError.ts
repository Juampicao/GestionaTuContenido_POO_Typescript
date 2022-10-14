// Distinguir el tipo de error.
export class NoHayResultadosError extends Error {

    constructor(message : string) {
        super(message)
    }

}

export class ErrorExternoAlPasarParams extends Error {

    constructor(message : string) {
        super(message)
    }

}

