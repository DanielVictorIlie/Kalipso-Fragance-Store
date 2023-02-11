import { ReactComponent as Cart } from '../assets/cart.svg';
import { ReactComponent as Bin } from '../assets/bin.svg';
import filters from '../assets/filters.png';
import React, { useState } from 'react'
import { Container, Navbar, NavbarBrand, FormControl, Nav, Button, Row, Offcanvas, Stack, Col, FormCheck } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom";
import { CartState } from '../context/Context';
import './../App.css';
import { useMediaQuery } from 'react-responsive';
import Rating from './Rating';


function Header() {
    const {
        productState: { sort, byGendre, byRating },
        state: { cart, products },
        dispatch,
        productDispatch
    } = CartState();

    const mobileWidth = useMediaQuery({ query: `(max-width: 992px)` })

    const [highPriceFilter, setHighPriceFilter] = useState("lowToHigh");
    const [lowPriceFilter, setLowPriceFilter] = useState("highToLow");
    const [mensFilter, setMensFilter] = useState("Men's");
    const [womensFilter, setWomensFilter] = useState("Women's");
    const [unisexFilter, setUnisexFilter] = useState("Unisex");
    const pathname = window.location.pathname
    const [openCart, setOpenCart] = useState(false);
    const [showFilter, setShowFilters] = useState(!mobileWidth);
    const toggleCart = () => setOpenCart((s) => !s);
    const toggleShow = () => setShowFilters((s) => !s);
    let navigate = useNavigate();

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            navigate('/')
            productDispatch({
                type: 'FILTER_BY_SEARCH',
                payload: e.target.value
            })
            e.target.value = ''
        }
    }
    return (
        <Navbar bg='dark' variant='dark' sticky='top' >
            <Container>
                {
                    pathname === '/' ? (
                        <>
                            <Button variant="light" onClick={toggleShow} className="d-lg-none rounded-circle d-flex filter-button justify-content-center">
                                <img src={filters} alt='filters icon' className='align-self-center' />
                            </Button>
                            <Offcanvas show={showFilter} scroll={true} onHide={toggleShow} backdrop={false} className='offcanvas-filters'>
                                <Offcanvas.Title className='d-none d-lg-block p-3'>
                                    <div className='pb-2 fs-5'>Perfumes</div>
                                </Offcanvas.Title >
                                <Offcanvas.Header closeButton className='d-lg-none'>
                                    <Offcanvas.Title>
                                        <div className='pb-2 fs-5'>Perfumes</div>
                                    </Offcanvas.Title >
                                </Offcanvas.Header >
                                <Offcanvas.Body>
                                    <FormCheck
                                        className='pb-2'
                                        type="switch"
                                        label="Men's"
                                        name='group1'
                                        onChange={(e) => {
                                            productDispatch({
                                                type: 'FILTER_BY_GENDRE',
                                                payload: mensFilter
                                            })
                                            if (e.target.checked) {
                                                setMensFilter("")
                                                setWomensFilter("Women's")
                                                setUnisexFilter("Unisex")
                                            } else {
                                                setMensFilter("Men's")
                                            }
                                        }}
                                        checked={byGendre === "Men's" ? true : false}
                                    />

                                    <FormCheck
                                        className='pb-2'
                                        type="switch"
                                        label="Women's"
                                        name='group1'
                                        onChange={(e) => {
                                            productDispatch({
                                                type: 'FILTER_BY_GENDRE',
                                                payload: womensFilter
                                            })
                                            if (e.target.checked) {
                                                setWomensFilter("")
                                                setMensFilter("Men's")
                                                setUnisexFilter("Unisex")
                                            } else {
                                                setWomensFilter("Women's")
                                            }

                                        }}
                                        checked={byGendre === "Women's" ? true : false}
                                    />

                                    <FormCheck
                                        className='pb-2'
                                        type="switch"
                                        label="Unisex"
                                        name='group1'
                                        onChange={(e) => {
                                            productDispatch({
                                                type: 'FILTER_BY_GENDRE',
                                                payload: unisexFilter
                                            })
                                            if (e.target.checked) {
                                                setUnisexFilter("")
                                                setMensFilter("Men's")
                                                setWomensFilter("Women's")
                                            } else {
                                                setUnisexFilter("Unisex")
                                            }
                                        }}
                                        checked={byGendre === "Unisex" ? true : false}
                                    />
                                    <FormCheck
                                        className='pb-2'
                                        type="switch"
                                        id="custom-switch"
                                        label="Rising Prices"
                                        name='group1'
                                        onChange={(e) => {
                                            productDispatch({
                                                type: 'SORT_BY_PRICE',
                                                payload: highPriceFilter
                                            })

                                            if (e.target.checked) {
                                                setHighPriceFilter("")
                                                setLowPriceFilter("highToLow")
                                            } else {
                                                setHighPriceFilter("lowToHigh")

                                            }
                                        }}
                                        checked={sort === 'lowToHigh' ? true : false}
                                    />
                                    <FormCheck
                                        className='pb-2'
                                        type="switch"
                                        label="Falling Prices"
                                        name='group1'
                                        onChange={(e) => {
                                            productDispatch({
                                                type: 'SORT_BY_PRICE',
                                                payload: lowPriceFilter
                                            })
                                            if (e.target.checked) {
                                                setLowPriceFilter("")
                                                setHighPriceFilter("lowToHigh")
                                            } else {
                                                setLowPriceFilter("highToLow")
                                            }
                                        }
                                        }
                                        checked={sort === 'highToLow' ? true : false}
                                    />
                                    <span>
                                        <label className='pr-1 pb-3'> Rating :</label>
                                        <Rating
                                            rating={byRating}
                                            onClick={(i) =>
                                                productDispatch({
                                                    type: 'FILTER_BY_RATING',
                                                    payload: i + 1
                                                })
                                            }
                                            style={{ cursor: 'pointer' }} />
                                    </span>
                                    <div>
                                        <Button className='w-75'
                                            onClick={() =>
                                                productDispatch({
                                                    type: 'CLEAR_FILTERS',
                                                })
                                            }
                                            variant='dark'
                                        >Clear Filters</Button>
                                    </div>
                                </Offcanvas.Body>
                            </Offcanvas >
                        </>
                    ) : ''
                }
                <NavbarBrand>
                    <Link to='/' onClick={() =>
                        productDispatch({
                            type: 'CLEAR_FILTERS',
                        })
                    }>
                        <div className='fs-2 fs-4-sm logo'>Kalipso</div>
                    </Link>
                </NavbarBrand>
                <Navbar.Text className='search'>
                    <FormControl
                        className='mx-auto'
                        placeholder='Search a fragance'
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </Navbar.Text>
                <Nav>
                    <Button variant='light' onClick={toggleCart} className="rounded-circle position-relative cart-button p-0">
                        <Cart />
                        {
                            (cart !== null && cart.length) ? (
                                <div className="rounded-circle bg-danger d-flex   justify-content-center align-self-center cart-badge">
                                    {cart.length}</div>
                            ) : (
                                <></>
                            )
                        }
                    </Button>
                    <Offcanvas show={openCart} onHide={toggleCart} placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Cart</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className='p-0 pt-1'>
                            <Stack gap={3} >
                                {
                                    (cart !== null && cart.length) ? (
                                        <>
                                            {
                                                cart.map(prod => (
                                                    <Container fluid key={prod.id} className="header-cart-container">
                                                        <Row className='align-items-center p-1'>
                                                            <div className='col-3 '>
                                                                <Link to={`/product/${prod.name}`} onClick={toggleCart} >
                                                                    <img
                                                                        src={prod.image}
                                                                        className='img-header-cart'
                                                                        alt={prod.name} />
                                                                </Link>
                                                            </div>
                                                            <div className='col-7'>
                                                                <Link to={`/product/${prod.name}`} onClick={toggleCart} >
                                                                    <div className='text-truncate'>{prod.brand}</div>
                                                                    <div className='text-truncate text-muted'>{prod.name}</div>
                                                                    <Row>
                                                                        <Col xs={3} className='text-start'>{prod.qty}pcs</Col>
                                                                        <Col xs={5} className='text-center'>  {prod.ml} ml</Col>
                                                                        <Col xs={4} className='text-end'> € {prod.price}</Col>
                                                                    </Row>
                                                                </Link>
                                                            </div>
                                                            <div className='col-1 '>
                                                                <Bin
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => {
                                                                        dispatch({
                                                                            type: 'REMOVE_FROM_CART',
                                                                            payload: {
                                                                                id: prod.id,
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
                                                                    }}
                                                                />
                                                            </div>
                                                        </Row>
                                                    </Container>
                                                ))}
                                            <Link to='/cart'>
                                                <Button className='w-100 mb-1' variant='dark' onClick={toggleCart}>
                                                    Go To Cart
                                                </Button>
                                            </Link>
                                        </>
                                    ) : (
                                        <div className=' text-center'>Cart is Empty!</div>

                                    )
                                }
                            </Stack>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header