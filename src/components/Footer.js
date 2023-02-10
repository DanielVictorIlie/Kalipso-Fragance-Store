import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
    return (
        <footer className='my-auto '>
            <Container fluid >
                <Row >
                    <Col sm={12} className='text-center py-3 bg-dark text-white '>Copyright &copy; Kalipso</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
