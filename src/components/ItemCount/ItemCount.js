import React from 'react'

export const ItemCount = ( {max, setCantidad, cantidad, onAdd} ) => {

    const countRestar = () => {
        cantidad > 0 && setCantidad(cantidad - 1)
    }

    const countSumar = () => {
        cantidad < max && setCantidad(cantidad + 1)
    }

    const config = {
        className: `btn ${cantidad === 0 ? "btn-outline-danger" : "btn btn-light"}`,
        disabled: cantidad === 0,
        onClick: countRestar
    }

    return (
        <div className="my-3">
            <button {...config}>
                -
            </button>
            <span className="mx-4">{cantidad}</span>
            <button 
                className={cantidad === max ? "btn btn-danger" : "btn btn-success"}
                disabled={cantidad === max}
                onClick={countSumar}
            >
                +
            </button>
            <br/>
            <button className="btn btn-info my-3" onClick={onAdd} disabled={cantidad===0}>
                Añadir al carrito
            </button>
        </div>
    )
}
