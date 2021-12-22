import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { ItemCount } from '../ItemCount/ItemCount'

export const ItemDetail = ({id, name, img, desc, price, category, stock}) => {

    const {agregarAlCarrito, isInCart} = useContext(CartContext)
    

    const navigate = useNavigate()
    
    const [cantidad, setCantidad] = useState(0)
    
    const volver = () => {
        navigate(-1)
    }

    const volverInicio = () => {
        navigate('/')
    }

    const agregar = () => {
        if (cantidad > 0) {
            agregarAlCarrito({
                id,
                name,
                price,
                img,
                category,
                cantidad
            })
        }   
    }

    return (
        <div>
            
            <img src={img} alt={name} style={{width: "15rem"}}/>
            <h2>{name}</h2>
            <p>{desc}</p>
            <p>Precio: ${price}</p>
            


            {
                !isInCart(id)
                    ?   <ItemCount 
                            max={stock} 
                            cantidad={cantidad} 
                            setCantidad={setCantidad}
                            onAdd={agregar}
                        />
                    :   <Link to="/collection" className="btn btn-success my-3">Finalizar compra </Link>
            }
            <br/>
            <button className="btn btn-primary" onClick={volver}>Volver</button>
            <button className="btn btn-outline-primary" onClick={volverInicio}>Volver al inicio</button>
        </div>
    )
}
