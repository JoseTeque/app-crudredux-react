import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../types/index';

// Muestra una alerta
export function mostrarAlerta(alerta){
    return (dispatch) => {
        dispatch(crearalerta(alerta));
    }
}

const crearalerta = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

// Ocultar Alerta
export function ocultarAlerta(){
    return (dispatch) => {
        dispatch(ocultaAlerta());
    }
}

const ocultaAlerta = () =>({
    type:OCULTAR_ALERTA
})