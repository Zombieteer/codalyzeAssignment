import { Button, Checkbox, Collapse, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { pricingInfo } from "../React-products";

import { updateProduct } from '../actions/jsonActions'

import '../assets/styles/Details.css'
import { Alert } from '@material-ui/lab';

export const ModifyProduct = ({ products: { current }, updateProduct, ...props }) => {

    const [open, setOpen] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        pricingTier: "",
        priceRange: "",
        weight: "",
        availability: "",
        productUrl: "",
        isEditable: "",
    });

    const { id } = props.location.state
    console.log(id)

    useEffect(() => {
        current !== null &&
            setFormData({
                name: current.name,
                pricingTier: current.pricingTier,
                priceRange: current.priceRange,
                weight: current.weight,
                availability: current.availability,
                productUrl: current.productUrl,
                isEditable: current.isEditable,
            });
    }, [current]);

    const {
        name,
        pricingTier,
        priceRange,
        weight,
        availability,
        productUrl,
        isEditable,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onChangeIsEditable = (e) => {
        setFormData({ ...formData, isEditable: !isEditable })
    }

    const onSubmit = (e) => {
        if (name && pricingTier && priceRange && weight && availability && productUrl) {
            e.preventDefault();
            setOpen(false)
            updateProduct(formData, id);
            props.history.push("/");
        }
        else {
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 3000);
        }
    };

    return (
        <Fragment>
            <Grid className="container">
                <h1 className='editTitle'>Edit Product Details</h1>
                <FormGroup>

                    <Grid container className='inputGrid'>
                        <TextField label="Name" variant="outlined" name="name"
                            value={name}
                            onChange={(e) => onChange(e)} className='inputField' />
                        <TextField label="Weight" variant="outlined" name="weight"
                            value={weight}
                            onChange={(e) => onChange(e)} className='inputField' />
                    </Grid>

                    <Grid container className='inputGrid'>
                        <TextField label="Availability" variant="outlined" name="availability" type='number'
                            value={availability}
                            onChange={(e) => onChange(e)} className='inputField' />
                        <TextField label="Product Url" variant="outlined" name="productUrl"
                            value={productUrl}
                            onChange={(e) => onChange(e)} className='inputField' />
                    </Grid>

                    <Grid container style={{ alignItems: 'center' }}>
                        <RadioGroup className='inputField' name="pricingTier" value={pricingTier} onChange={(e) => onChange(e)}>
                            <Grid container>
                                <FormControlLabel value='budget' control={<Radio />} label="Budget" />
                                <FormControlLabel value='premier' control={<Radio />} label="Premier" />
                            </Grid>
                        </RadioGroup>

                        <FormControl variant="outlined" className='inputField priceInput'>
                            <InputLabel>Price Range</InputLabel>
                            {pricingTier === 'premier' ?
                                <Select
                                    value={priceRange}
                                    onChange={(e) => onChange(e)}
                                    name="priceRange"
                                    label='Price Range'
                                >
                                    {pricingInfo["premier"].map((priceRange, index) => (
                                        <MenuItem key={index} value={priceRange}>{priceRange}</MenuItem>
                                    ))}
                                </Select>
                                :
                                <Select
                                    value={priceRange}
                                    onChange={(e) => onChange(e)}
                                    name="priceRange"
                                    label='Price Range'
                                >
                                    {pricingInfo["budget"].map((priceRange, index) => (
                                        <MenuItem key={index} value={priceRange}>{priceRange}</MenuItem>
                                    ))}
                                </Select>
                            }
                        </FormControl>
                    </Grid>

                    <FormControlLabel className='inputField' control={<Checkbox
                        checked={isEditable} name="isEditable" onChange={(e) => onChangeIsEditable(e)} />} label="Editable" />

                    <Button className='submitBtn' onClick={(e) => onSubmit(e)} variant="contained">Submit</Button>
                </FormGroup>

                <Collapse style={{ marginTop: 40 }} in={open}>
                    <Alert severity="error">Please fill all the fields</Alert>
                </Collapse>
            </Grid>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    products: state.jsonFile
})

export default connect(mapStateToProps, { updateProduct })(ModifyProduct)