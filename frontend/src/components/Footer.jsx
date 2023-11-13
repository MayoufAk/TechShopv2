import {Container,Row ,Col} from "react-bootstrap"


import React from 'react'

const cuurentYear=new Date().getFullYear()

const Footer = () => {
  return (
    <footer>

        <Container>
            <Row>
                <Col className="text-center py-3">
                <p>Mayouf&copy;{cuurentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer