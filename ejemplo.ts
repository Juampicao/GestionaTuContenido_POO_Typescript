// Forma Explicita. Asume estado Falso. 
// class Pago {
//     private _montoPagoSuscripcion: number;
//     private _pagado: boolean;

//     constructor( montoPagoSuscripcion: number) {
//         this._montoPagoSuscripcion = montoPagoSuscripcion;
//         this._pagado = false;
//      }

//     get montoPagoSuscripcion(): number {
//         return this._montoPagoSuscripcion;
//     }
    
//     set pagado(pagado:boolean) {
//         this._pagado = pagado;
//     }

//     get isPagado() {
//         return this._pagado;
//     }
// }

// const ejemplo = new Pago(1);

// // Pagador => Declara que hace
// class PagadorService {
//     private _pagosRealizados: Array<Pago>;

//     constructor() {  
//         this._pagosRealizados = new Array<Pago>;
//     }

//     pagar(pago : Pago) {
//         console.log("Realizando un pago de PagadorService..."
//         + pago.montoPagoSuscripcion); 
//         pago.pagado = true; // Set pagado, encuebierto.
//         this._pagosRealizados.push(pago)
//     }

//     getAllPagos() : Array<Pago> {
//         return this._pagosRealizados
//     }
// }

// // Instancio el servicio.
// let servicioPagador = new PagadorService();

// // Realizando el pago 1.
// servicioPagador.pagar(new Pago(100));

// // Realizando el pago 2.
// let p2 = new Pago(200);
// servicioPagador.pagar(p2);

// // Verificando los pagos realizados
// servicioPagador.getAllPagos();


// Crear test para ver si me devuelte 2. Correcto. Si devuelve diferente a 2,
// esta mal.Escenario 1. Test del pagadorService.No mezclar con codigo en la aplicacion, probarlo en test.
// Escenario 2, comporbar el monto (si es 100, o 200).














// Forma simplificada pero no la mas apropiada. 
class Pago2 {    
    constructor( private _montoPagoSuscripcion: number) {}

    get montoPagoSuscripcion(): number {
        return this._montoPagoSuscripcion;
    }
   
}
const ejemplo2 = new Pago2(19);