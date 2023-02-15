import React from 'react'
import { Card, CardImg, Col } from 'react-bootstrap'
import './../App.css';
import { Link } from 'react-router-dom'
import Rating from './Rating'
function ProductList({ prod }) {

    return (
        <Col>
            {
                !prod.inStock ? (
                    <Link to={`/product/${prod.name}`}>
                        <Card className='text-center'>
                            <CardImg className='pb-1 pt-2 img-link' variant='top' src={prod.image} alt={prod.name} />
                            <Card.ImgOverlay className='d-flex'>
                                <Card.Title className='card-overlay-title text-secondary'> OUT OF STOCK</Card.Title>
                            </Card.ImgOverlay>
                            <Card.Subtitle className='pb-1'>{prod.brand}</Card.Subtitle>
                            <Card.Title className='pb-1'>{prod.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{prod.for} fragrance {prod.ml[0]} ml </Card.Subtitle>
                            <Card.Subtitle className='pb-2'> <Rating className='pb-1' rating={prod.rating} /></Card.Subtitle>
                            <Card.Title> € {prod.price[0]}</Card.Title>
                        </Card>
                    </Link>
                ) : (
                    <Link to={`/product/${prod.name}`}>
                        <Card className='text-center product'>
                            <CardImg className='pb-1 pt-2 img-link' variant='top' src={prod.image} alt={prod.name} />
                            <Card.Subtitle className='pb-1'>{prod.brand}</Card.Subtitle>
                            <Card.Title className='pb-1'>{prod.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{prod.for} fragrance {prod.ml[0]} ml</Card.Subtitle>
                            <Card.Subtitle className='pb-2'> <Rating className='pb-1' rating={prod.rating} /></Card.Subtitle>
                            <Card.Title> € {prod.price[0]}</Card.Title>
                        </Card>
                    </Link>
                )
            }
        </ Col>
    )
}

export default ProductList