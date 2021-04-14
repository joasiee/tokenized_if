import React from 'react';
import { Row, Col, Card, Table, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";

class offer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            price: null,
            buyback: null,
            id: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        console.log(event.target.value);
        console.log(event.target.name);
        const { name, value } = event.target;
        console.log(name);
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.requestedShipment);
        const result = { "price": this.state.price, "buyback": this.state.buyback };
        console.log(result);
        fetch(`http://tokenized_if_importer:3001/api/shipments/${this.state.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        });
        window.location.reload(false);
    }
    render() {
        const { data } = this.state;
        return (

            < Aux >
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add shipment</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <h5>Offer deal</h5>
                                    <hr />
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormOwnerName">
                                                <Form.Label>Shipment id</Form.Label>
                                                <Form.Control type="text" placeholder="name" name="id" onChange={this.handleInputChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <h5 className="mt-5">Deal</h5>
                                    <hr />
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="Price" name="price" onChange={this.handleInputChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="Buyback" name="buyback" onChange={this.handleInputChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button type="submit">Submit</Button>
                                    {/* <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="description" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="amount" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="description" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="amount" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="description" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="amount" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="description" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="amount" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="description" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="amount" />
                                            </Form.Group>
                                        </Col>
                                    </Row> */}

                                </Form>
                            </Card.Body>
                        </Card>
                    </Col >
                </Row >
            </Aux >
        );
    }
}

export default offer;