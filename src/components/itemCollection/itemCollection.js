import React, { useEffect, useState, useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { db } from '../../firebase/config'
import { collection, getDocs, query, where, addDoc, documentId, Timestamp, writeBatch } from 'firebase/firestore/lite'
import { Link, Navigate } from 'react-router-dom'
import { Loader } from '../Loader/Loader'
import { Formik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
    nombre: "",
    email: "",
    phone: ''
}

const schema = Yup.object().shape({
    nombre: Yup.string()
            .min(1,'El nombre ingresado es incorrecto' )
            .max(15, 'El nombre es demasiado largo'),
    email: Yup.string()
            .email('Email inválido'),
    phone: Yup.string()
            .min(8, 'El numero ingresado es incorrecto')
            .max(15, 'El numero ingresado es incorrecto')
})

export const ItemCollection = () => {

    const { carrito, totalCompra, vaciarCarrito } = useContext(CartContext)
    const [orderId, setOrderId] = useState(null)
    const [loading, setLoading] = useState(false)

    

    const handleSubmit = (values) => {

        const order = {
            buyer: values,
            items: carrito,
            total: totalCompra(),
            date: Timestamp.fromDate( new Date() )
        }

        const batch = writeBatch(db)
        const ordersRef = collection(db, "orders")
        const productosRef = collection(db, "productos")
        const q = query(productosRef, where(documentId(), 'in', carrito.map(el => el.id)))

        const outOfStock = []

        setLoading(true)
        getDocs(q)
            .then((res) => {
                res.docs.forEach((doc) => {
                    const itemInCart = carrito.find((prod) => prod.id === doc.id)

                    if (doc.data().stock >= itemInCart.cantidad) {
                        batch.update(doc.ref, {
                            stock: doc.data().stock - itemInCart.cantidad
                        })
                    } else {
                        outOfStock.push(itemInCart)
                    }
                })

                if (outOfStock.length === 0) {

                    addDoc(ordersRef, order)
                        .then((res) => {
                            batch.commit()
                            setOrderId(res.id)
                            vaciarCarrito()
                            setLoading(false)
                        })
                } else {
                    alert("No hay stock de uno de los productos")
                    setLoading(false)
                }
            })
    }

    if (carrito.length === 0) {
        return <Navigate to="/"/>
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="container my-5">

            {
                orderId 
                ? <>
                    <h2>Orden de compra realizada con exito!</h2>
                    <hr/>
                    <p>Tu número de orden es: {orderId}</p>
                    <Link to="/" className='btn btn-success'>Volver</Link>
                </>

                : <>
                    <h2>Temina tu compra!</h2>
                    <hr/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit}>
                                <input
                                    name="nombre"
                                    onChange={formik.handleChange}
                                    value={formik.values.nombre}
                                    className='form-control my-2'
                                    type="text"
                                    placeholder="Nombre"
                                />
                                {formik.errors.nombre && <p className='alert alert-danger'>{formik.errors.nombre}</p>}
                                
                                <input
                                    name='email'
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    className='form-control my-2'
                                    type="email"
                                    placeholder="Email"
                                />
                                {formik.errors.email && <p className='alert alert-danger'>{formik.errors.email}</p>}

                                <input
                                    name='phone'
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                    className='form-control my-2'
                                    type="phone"
                                    placeholder="Teléfono"
                                />
                                {formik.errors.phone && <p className='alert alert-danger'>{formik.errors.phone}</p>}

                                <button type='submit' className='btn btn-success'>Enviar</button>
                            </form>
                        )}
                    </Formik>

                    
                </>
            }
        </div>
    )
}