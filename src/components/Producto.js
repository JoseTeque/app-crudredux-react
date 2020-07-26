import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import {  useDispatch } from 'react-redux';
import { eliminarProductoAction, editarProductoAction } from '../actions/productosAction';

const Producto = ({producto}) => {

    const dispatch = useDispatch();
    const history = useHistory(); //Habilitar history para redireccion

    const {nombre, precio, id} = producto;

    const confirmareliminarProducto = id => {
        // preguntar al usuario
        Swal.fire({
            title: '¡Estas Seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si Eliminar!!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
              // pasarlo al action
            dispatch(eliminarProductoAction(id));
            }
          })
    }

    // funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
       dispatch( editarProductoAction(producto));
        history.push(`/productos/editar/${producto.id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button 
                type="button"
                onClick={() => redireccionarEdicion(producto)}
                className="btn btn-primary mr-2" >
                    Editar
                </button>
                <button 
                    type='button'
                    className="btn btn-danger"
                    onClick={() => confirmareliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Producto;