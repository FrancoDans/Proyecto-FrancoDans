import React, { useContext, useState } from 'react'
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
    tel: ''
}

const schema = Yup.object().shape({
    nombre: Yup.string()
            .required('Este campo es obligatorio')
            .min(2, 'Ingrese un nombre válido')
            .max(30, 'Ingrese un nombre válido'),
    email: Yup.string()
            .required('Este campo es obligatorio')
            .email('Ingrese un Email válido'),
    tel: Yup.string()
            .required('Este camp es obligatorio')
            .min(8, 'Ingrese un número válido')
            .max(18, 'Ingrese un número válido')
})

export const Checkout = () => {

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

                 <>
                    <h2>Checkout</h2>
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
                                    className='form-control my-4'
                                    type="text"
                                    placeholder="Nombre"
                                />
                                {formik.errors.nombre && <p className='alert alert-danger'>{formik.errors.nombre}</p>}

                                <input
                                    name='email'
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    className='form-control my-4'
                                    type="email"
                                    placeholder="Email"
                                />
                                {formik.errors.email && <p className='alert alert-danger'>{formik.errors.email}</p>}

                                <input
                                    name='tel'
                                    onChange={formik.handleChange}
                                    value={formik.values.tel}
                                    className='form-control my-4'
                                    type="tel"
                                    placeholder="Teléfono"
                                />
                                {formik.errors.tel && <p className='alert alert-danger'>{formik.errors.tel}</p>}

                                <button type='submit' className='btn btn-success'>Enviar</button>
                            </form>
                        )}
                    </Formik>

                    
                </>
            
        </div>
    ) 
 }
