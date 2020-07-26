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

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos Productos
export function crearNuevosProductosAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto);

            // si todo sale bien cambia el state
            dispatch(agregarProductoExito(producto));

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(agregarProductoError(true));

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

// FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BASE DE DATOS
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch( obtenerProductos())

        try {
            // Descargar los productos
           const resultado =  await clienteAxios.get('/productos');
            // mandado al estado los productos
            dispatch(obtenerProductosExito(resultado.data))

        } catch (error) {
            console.log(error)
             dispatch(obtenerProductosError())
        }
    }
}

const obtenerProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload:true
});

const obtenerProductosExito = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const obtenerProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// FUNCION PARA ELIMINAR PRODUCTO DE LA BASE DE DATOS
export function eliminarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`);

            dispatch(productoeliminarExito())

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente',
                'success'
              )
        } catch (error) {
            console.log(dispatch(productoeliminarError()))
            
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const productoeliminarExito = () => ({
    type:PRODUCTO_ELIMINADO_EXITO
})

const productoeliminarError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})



//funcion para editar productos de la base de datos
export function editarProductoAction(producto){
    return  (dispatch) => {
        dispatch(obtenerProductoAction(producto))
    }
}

const obtenerProductoAction = producto => ({
    type:OBTENER_PRODUCTO_EDITAR,
    payload:producto
})

// Edita un producto en la api y state
export function editaProducto(producto){
    return async (dispatch) => {
        dispatch(editarProducto());

        try {
           await clienteAxios.put(`/productos/${producto.id}`, producto);
           
          dispatch(productoeditadoExito(producto))

        } catch (error) {
            console.log(error)
            dispatch(productoeditarError());
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload:true
})

const productoeditadoExito = producto => ({
    type:PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const productoeditarError = () => ({
    type:PRODUCTO_EDITADO_ERROR
})