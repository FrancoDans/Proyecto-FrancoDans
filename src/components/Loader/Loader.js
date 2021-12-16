import React from 'react'
import { Spinner } from 'react-bootstrap'
import './Loader.scss'

export const Loader = () => {

    return (
        <div className="loader">
            <Spinner animation="grow" variant="primary"/>
            <h2 className="my-3">Cargando productos...</h2>
        </div>
    )
}
