import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types/index';


// cada reducer tiene su propio state
const initialState = {
    productos:[],
    error: false,
    loading:false,
    productoeliminar: null,
    productoEditar:null
}

export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_EDICION_PRODUCTO:
        case COMENZAR_DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                productos: [...state.productos, action.payload],
                loading:false
            }
        case PRODUCTO_ELIMINADO_ERROR:
        case DESCARGA_PRODUCTOS_ERROR:
        case AGREGAR_PRODUCTO_ERROR:
        case PRODUCTO_EDITADO_ERROR:
            return{
                ...state,
                error: action.payload,
                loading:false
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return{
                ...state,
                loading: false,
                productos: action.payload,
                error:null
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return{
                ...state,
                productoeliminar:action.payload
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return{
                ...state,
                productos:state.productos.filter(producto => producto.id !== state.productoeliminar),
                productoeliminar:null
            }
        case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                productoEditar:action.payload
            }
        case PRODUCTO_EDITADO_EXITO:
            return{
                ...state,
                productoEditar:null,
                productos: state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload : producto)
            }
        default:
            return state;
    }
}

