import React from 'react';
import { Row, Col, Card, Table, Button, Form } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";

class releaserequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', jsondata: [], requestedShipment: '' };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch('http://localhost:3000/api/shipments')
            .then(response => response.json())
            .then(data => this.setState({ jsondata: data }));
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.requestedShipment);
        fetch(`http://localhost:3000/api/shipments/${this.state.requestedShipment}`, {
            method: 'DELETE',
            body: this.state.requestedShipment,
        });
    }

    render() {
        return (

            < Aux >
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">List of release requests</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Table responsive hover striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Importer</th>
                                                <th>Tokenized</th>
                                                <th>Released</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.jsondata.map(shipment => {
                                                return (
                                                    shipment.cargo.items.map(items => {
                                                        return (

                                                            <tr>
                                                                <th scope="row">{shipment.id}</th>
                                                                <td>{items.description}</td>
                                                                <td>{items.amount}</td>
                                                                <td>{shipment.owner}</td>
                                                                {/* <td>< Button type="submit" onClick={() => this.state.requestedShipment = shipment.id.toString() + ' ' + items.amount.toString()} disabled={(items.amount > 10) ? true : false} variant={(items.amount > 10) ? "secondary" : "primary"}>Release</Button></td> */}
                                                                <td>< Button type="submit" onClick={() => this.setState({ requestedShipment: shipment.id })} disabled={(items.amount > 10) ? true : false} variant={(items.amount > 10) ? "secondary" : "primary"}>Release</Button></td>


                                                            </tr>
                                                        )
                                                    }
                                                    )
                                                )
                                            }
                                            )
                                            }
                                        </tbody>
                                    </Table>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux >
        );
    }
}

export default releaserequests;