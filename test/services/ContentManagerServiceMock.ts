import { IContentType } from "../../app/interfaces/Interfaces";
import { ContentItem } from "../../app/models/ContentItem";
import { ContentItemFilter } from "../../app/models/ContentItemFilter";
import { IContentManagerService } from "../../app/services/IContentManagerService";
import { CrearDosItems } from "../utils/CrearDosItems";

export class ContentManagerServiceMock implements IContentManagerService{

    private _contentItems: Array<ContentItem>;
 
    constructor() {  
        // Objeto creado, retorna una lista con 2 objetos creados. 
        this._contentItems = new CrearDosItems().obtenerContentItemsList2ContentItems();
    }
 
    // Creo items para pushear al array. 
    crear(contentItem : ContentItem) {
        console.log("Creando un nuevo contentItem..."); 
        this._contentItems.push(contentItem)
    }
  
    getAllContentsItems(): Array<ContentItem> {
        return this._contentItems
    }
    
    // Retorna el array con los items creados en el paso anterior. 
    getContentsItemsByFilter(filter: ContentItemFilter ): Array<ContentItem> {     
        
        // Finish::  Implementar el filtro (titulo, descripcion, tags , type) Recorriendo la lista de items y filtrando en consecuencia. 
        // Recorrer y verificar si coincide, pushear al array que voy a retornar.
        // Prioridad hoy: Sin filtro // Titulo o descripcion // Content Type // Tags. 
        // Preguntar al GET de cada atributo.
        
        
        // 4° Buscar en _contentItemList si hay algun contentItem que en getTitle coincida con el titulo. Si coincide, agregarlo a _filterContentList
        // Si el getTitle !== empty, buscar en title
        // Si el getTag !== empty, buscar en tag.
        // si el getContentType !== empty, buscar en contentType. 
        
        let _filterContentList: Array<ContentItem> = []; 
        
        for (let i = 0; i < this._contentItems.length; i++) {
            
            // Finish: ver poner un break/continue para no duplicar, saltear los siguientes filtros.
            // Finish: case-insensitive // Includes
            // To-Do: que sea parecido (3 letras?)
           
            // Title
            if (filter.title !== "") {
                
                if (this._contentItems[i].title.toLowerCase().includes(filter.title)) {     
                    
                    _filterContentList.push(this._contentItems[i])
                }

                continue;
            }

            // Descripcion
            if (filter.description !== "") {
                
                if (this._contentItems[i].description.toLocaleLowerCase().includes(filter.description)) {     
                    
                    _filterContentList.push(this._contentItems[i])
                }

                continue;
            }
            
            // 2° Si filtro.tag contiene algo, busca por tag.
            // Finish:: Funcionalidad aparte para iterar por tags. 
            // Caso base: el tag esta en un item?
            // If contains : "tag"; 
            // Crear desde el contentItem tenes estos tags? (ejemplo isPagado?)
            // Retornar primero en falso. Hacerlo basico. Luego que funcione. Pero que tire algo.
            
            // Tags
            if (filter.tags.length !== 0) {
                
                if (this._contentItems[i].containTag(filter.tags)) {
                    
                    
                    _filterContentList.push(this._contentItems[i])
                }

                continue;
            }
            
            // ContentType
            if (filter.contentType !== "") {
                
                if (this._contentItems[i].contentType === filter.contentType) {     
                    
                    _filterContentList.push(this._contentItems[i])
                }

                continue;
            }
        }
        
        // 5° Retornar la _filterContentList (lista con los items que ya filtrados)
        
        return _filterContentList; 
    }
}


// Finish:: Crear estos 2 items desde afuera, y llamarlo desde aca el constructor. Mas limpio, mas simple.
// Finish:: Usarlo en ContentManagerServiceMock.
















// // Instancio el servicio.
// let servicioPagador = new PagadorService();

// // Realizando el pago 1.
// servicioPagador.pagar(new Pago(100));

// // Realizando el pago 2.
// let p2 = new Pago(200);
// servicioPagador.pagar(p2);

// // Verificando los pagos realizados
// servicioPagador.getAllPagos();
