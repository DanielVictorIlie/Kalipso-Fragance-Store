import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CartState } from '../context/Context';
import NotFoundProduct from './NotFoundProduct';
import ProductList from './ProductList';

const Home = () => {
    const {
        state: { products },
        productState: { byStock, byGendre, sort, byRating, searchQuery },
    } = CartState();
    const trasformProducts = () => {
        let sortedProducts = products;
        if (sort) {
            sortedProducts = sortedProducts.slice().sort((a, b) => sort === 'lowToHigh' ? a.price[0] - b.price[0] : b.price[0] - a.price[0])
        }
        if (!byStock) {
            sortedProducts = sortedProducts.filter(prod => prod.inStock)
        }
        if (byGendre) {
            sortedProducts = sortedProducts.filter(prod => prod.for === byGendre)
        }
        if (byRating) {
            sortedProducts = sortedProducts.filter(prod => parseInt(prod.rating) === byRating)
        }
        if (searchQuery) {
            sortedProducts = sortedProducts.filter(prod => prod.name.toLowerCase().includes(searchQuery) || prod.brand.toLowerCase().includes(searchQuery))
        }
        return sortedProducts;
    }

    return (
        <Container fluid >
            <Row className='justify-content-center home-page' >
                <Col sm='6'>
                    <Container >
                        <Row xs={1} md={2} lg={3} className='g-5 my-auto pb-2'>
                            {
                                trasformProducts().length === 0 ?
                                    <NotFoundProduct searchQuery={searchQuery}></NotFoundProduct> :
                                    trasformProducts().map(prod => <ProductList prod={prod} key={prod.id} />)
                            }
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Home