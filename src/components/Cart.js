import React, { useEffect, useState } from 'react'
import { ReactComponent as Bin } from '../assets/bin.svg';
import { Button, Col, Container, FormSelect, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { CartState } from '../context/Context'
import Rating from './Rating';
import { Link } from 'react-router-dom';

function Cart() {
    const { state: { cart, products }, dispatch } = CartState();
    const [total, setTotal] = useState();

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + (+curr.price) * curr.qty, 0))
    }, [cart])

    return (
        <Container fluid className='cart-page pt-2'>
            <Row className='justify-content-center'>
                <Col lg={7} md={12} >
                    <ListGroup>
                        {
                            cart.map(prod => (
                                <ListGroupItem key={prod.id}>
                                    <Row className='align-items-center '>
                                        <Col md={2}>
                                            <Link to={`/product/${prod.name}`}>
                                                <Image src={prod.image} alt={prod.name} className='img-cart' />
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            <Link to={`/product/${prod.name}`}>
                                                <Row className='text-muted'> {prod.brand} {prod.name}</Row>
                                                <Row className='text-truncate'>{prod.for} fragrance {prod.ml} ml  </Row>
                                            </Link>
                                        </Col>
                                        <Col md={2} xs={6} className='p-0'><Rating rating={prod.rating} /></Col>
                                        <Col md={2} xs={5}>
                                            <FormSelect
                                                className='p-lg-2 p-sm-0 my-2 w-75'
                                                onChange={(e) =>
                                                    dispatch({
                                                        type: 'CHANGE_CART_QTY',
                                                        payload: {
                                                            name: prod.name,
                                                            ml: prod.ml,
                                                            qty: parseInt(e.target.value),
                                                        }
                                                    })
                                                }
                                                as='select'
                                                value={prod.qty}>
                                                {
                                                    [...Array(prod.inStock).keys()].map((item) => (
                                                        <option key={item + 1}>{item + 1}</option>
                                                    ))
                                                }
                                            </FormSelect>
                                        </Col>
                                        <Col md={1} xs={6} className='py-3'>€ {prod.price}</Col>
                                        <Col md={1} xs={6}>
                                            <Button
                                                className='w-75'
                                                variant='light'
                                                onClick={() => {
                                                    dispatch({
                                                        type: 'REMOVE_FROM_CART',
                                                        payload: {
                                                            id: prod.id,
                                                            inStock: prod.inStock += 1
                                                        }
                                                    })
                                                    products.map(item => (item.name === prod.name) ? (
                                                        dispatch({
                                                            type: 'ADD_STOCK_WHEN_REMOVE',
                                                            payload: {
                                                                qty: item.qty -= item.inStock,
                                                                inStock: item.inStock += prod.qty
                                                            }
                                                        })
                                                    ) : ''
                                                    )
                                                }}>
                                                <Bin />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>
                    <Row>
                        <Col>
                            <Row className='bg-light text-secondary p-3 my-2'>
                                <Col>
                                    <h3 className='fw-light'> Subtotal {cart.length} items</h3>
                                </Col>
                                <Col>
                                    <h3 className='text-end fw-light'>Total:  <nobr className='text-dark'>€{total}</nobr> </h3>
                                </Col>
                            </Row>
                            <Row className=' my-3'>
                                <Col>
                                    <Link to={'/'}><Button variant='outline-dark h-100'>Continue Shopping</Button></Link>
                                </Col>
                                <Col className='text-end'>
                                    <Button variant='dark' disabled={cart.length === 0}>Proceed to Checkout</Button>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart