import React, { useContext } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { CartContext } from '../../context/CartContext'

export const CartItem = ({name, price,img, cantidad, id}) => {

    const {removerDelCarrito} = useContext(CartContext)

    return (
        <div>
            <h3>{name}</h3>
            <img src={img} alt={name} style={{width: "10rem"}}/>
            <p>Precio: ${price}</p>
            <p>Cantidad: {cantidad}</p>
            <button 
                className="btn btn-danger"
                onClick={() => { removerDelCarrito(id) }}
            >
                <BsFillTrashFill/>
            </button>
        </div>
    )
}
