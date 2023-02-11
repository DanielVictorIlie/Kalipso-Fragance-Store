import React, { useState } from 'react'
import { Button, Col, Image, Container, Row, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Rating from './Rating';
import { CartState } from '../context/Context';
import { useParams } from 'react-router-dom';
import './../App.css';


const Product = () => {
    const { name } = useParams();
    const { state: { products, cart }, dispatch } = CartState();
    let currentProduct = products.filter(item => item.name === name);
    const [price, setPrice] = useState((parseInt(currentProduct.map(item => item.price[0]))))
    const [ml, setMl] = useState(parseInt(currentProduct.map(item => item.ml[0])))

    return (
        <div className='pt-5 product-page '>
            {
                currentProduct.map((prod, i) => (
                    <Container key={i}>
                        <Row>
                            <Col md={6} className='align-self-center' >
                                <Image src={prod.image} alt={prod.name} className='img-prod' />
                            </Col>
                            <Col md={4} >
                                <Row >
                                    <Col>
                                        <Row >
                                            <Col className='fs-3 text-muted'>{prod.brand}</Col>
                                        </Row>
                                        <Row>
                                            <Col className='fs-5'>{prod.name}</Col>
                                        </Row>
                                        <Row>
                                            <Col className='fs-6 py-1'>{prod.for} fragrance</Col>
                                        </Row>
                                        <Row>
                                            <Col className='py-1'><Rating rating={prod.rating} /></Col>
                                        </Row>
                                        <Row className='border-bottom'>
                                            <Col className='fs-5  py-1 align-self-end'> {!ml ? prod.ml[0] : ml} ml</Col>
                                            <Col className='fs-1 text-end'>
                                                {!price ? <div>€ {prod.price[0]}</div> :
                                                    prod.price.map((item, i) => i === (prod.ml.indexOf(ml)) ? <div>€ {item}</div> : "")}
                                            </Col>
                                        </Row>
                                        <Row className='text-center' >
                                            <Col>
                                                <ButtonGroup className='py-3'>
                                                    {
                                                        prod.ml.map((mls, index) =>
                                                            <ToggleButton
                                                                key={index}
                                                                variant="light"
                                                                className='mx-2 p-3' type="checkbox"
                                                                checked={ml === mls}
                                                                onClick={() => {
                                                                    setMl(parseInt(mls));
                                                                    prod.price.forEach((item, i) => {
                                                                        if (i === (prod.ml.indexOf(parseInt(mls)))) {
                                                                            return (
                                                                                setPrice(item)
                                                                            )
                                                                        }
                                                                    }
                                                                    )
                                                                }} value={mls}>{mls} ml
                                                                {
                                                                    prod.price.map((prices, subindex) => subindex === index ? <div className=' fs-5' key={subindex}>€{prices} </div> : '')
                                                                }
                                                            </ToggleButton>
                                                        )
                                                    }
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {

                                                    <Button
                                                        className='text-white w-100'
                                                        onClick={() => {
                                                            (cart !== null) && cart.length && cart.some(item => item.name === prod.name && item.ml === ml && item.qty >= 1) ? (
                                                                cart.map(asset => {
                                                                    if (asset.name === prod.name && asset.ml === ml && asset.qty >= 1) {
                                                                        dispatch({
                                                                            type: 'ADD_QTY_WHEN_ADD_TO_CART',
                                                                            payload: {
                                                                                qty: asset.qty += 1,
                                                                                inStock: prod.inStock -= 1
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                )
                                                            ) : (
                                                                dispatch({
                                                                    type: 'ADD_TO_CART',
                                                                    payload: {
                                                                        cart: prod,
                                                                        ml: ml,
                                                                        price: price,
                                                                        id: Date.now(),
                                                                        inStock: prod.inStock -= 1,
                                                                    }
                                                                })
                                                            )
                                                        }}
                                                        variant='dark' disabled={!prod.inStock} >
                                                        {!prod.inStock ? 'Out of stock' : "Add to cart"}
                                                    </Button>
                                                }
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='pt-5'>
                            <Col md={7}>
                                <h3 className='border-bottom'>Description</h3>
                                <p>{prod.description}</p>
                            </Col>
                            <Col md={3}>
                                <h3 className='border-bottom'>Ingredients</h3>
                                <p className='fw-bold'>Top notes :</p>
                                <p>{prod.ingredients.top}</p>
                                <p className='fw-bold'>Middle notes :</p>
                                <p>{prod.ingredients.middle}</p>
                                <p className='fw-bold'>Base notes :</p>
                                <p>{prod.ingredients.base}</p>
                            </Col>
                        </Row>

                    </Container>
                ))
            }
        </div >
    )
}

export default Product