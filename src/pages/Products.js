import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadProduct, setCurrent } from '../actions/jsonActions'

import '../assets/styles/products.css'

import { Button, CircularProgress, Grid } from '@material-ui/core'

export const Products = ({ products: { products, loading }, loadProduct, setCurrent }) => {

    useEffect(() => {
        loadProduct()
    }, [loadProduct])

    const handleSetCurrent = (product) => {
        setCurrent(product)
    }

    return (
        <Fragment>
            {(!loading && products === null) ? <Grid><CircularProgress /></Grid> :
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Weight (gms)</th>
                            <th>Availability</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, id) => (
                            <tr key={id} className='tableRow'>
                                <td>{product.name}</td>
                                <td>{product.weight}</td>
                                <td>{product.availability}</td>
                                <td>
                                    {product.isEditable && (
                                        <Link
                                            to={{
                                                pathname: `/edit-product`, state: {
                                                    id: id
                                                }
                                            }}
                                            onClick={() => handleSetCurrent(product)}>
                                            <Button variant='outlined' className='editBtn'>
                                                Edit
                                            </Button>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </Fragment >
    )
}

const mapStateToProps = (state) => ({
    products: state.jsonFile
});

export default connect(mapStateToProps, { loadProduct, setCurrent })(Products)