import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";

class finoverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }
    componentDidMount() {
        fetch('http://localhost:8084/shipments.json')
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        const { data } = this.state;
        return (

            < Aux >
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Overview of deals</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive hover striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Deal</th>
                                            <th>Importer</th>
                                            <th>Value</th>
                                            <th>Due date</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {console.log(data)}
                                        {data.map(shipment => {
                                            console.log(shipment)
                                            return (
                                                shipment.cargo.items.map(items => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{shipment.id}</th>
                                                            <td>{items.description}</td>
                                                            <td>{items.amount}</td>
                                                            <td>{shipment.owner}</td>
                                                        </tr>
                                                    )
                                                }
                                                )
                                            )
                                        }

                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux >
        );
    }
}

export default finoverview;