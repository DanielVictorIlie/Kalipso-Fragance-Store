import React from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'

export default function NotFoundProduct({ searchQuery }) {
    return (
        <Container className=' mt-5'>
            <Row className='text-center justify-content-center mt-5'>
                {
                    searchQuery.length === 0 ?
                        <div> <Spinner animation="border" variant="secondary" role="status" /><br />Loading...</div> :
                        <>
                            <Spinner animation="grow" variant="danger" />
                            <p>Parfume "{searchQuery}" not found</p>
                        </>

                }
            </Row>
        </Container>
    )
}
