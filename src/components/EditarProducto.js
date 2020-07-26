import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import {  useDispatch, useSelector } from 'react-redux';
import { editaProducto, obtenerProductosAction } from '../actions/productosAction';

const EditarProducto = () => {

    const [nuevoProducto, guardarnuevoProducto] = useState({
        nombre:'',
        precio:''
    })

    const dispatch = useDispatch();
    const history = useHistory(); //Habilitar history para redireccion

    const producto = useSelector(state => state.productos.productoEditar);

    // guardar el state automaticamente
    useEffect(() => {

        guardarnuevoProducto(producto);

    }, [producto])

    const { nombre, precio} = nuevoProducto;
    
    const handleChange= e => {
        guardarnuevoProducto({
            ...nuevoProducto,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit= e => {
        e.preventDefault();

        dispatch(editaProducto(nuevoProducto))
        dispatch(obtenerProductosAction());
        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4 font-weight-bold" >
                        Editar Producto
                    </h2>
                    <form
                        onSubmit= { handleSubmit}
                    >
                        <div className="form-group">
                            <label>Editar Producto</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Producto"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio Producto</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Precio Producto"
                                name="precio"
                                value={precio}
                                onChange={handleChange}
                            />
                        </div>
                        <button 
                        type="submit" 
                        className="btn btn-primary  font-weight-bold text-uppercase d-block w-100"
                        > 
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default EditarProducto;