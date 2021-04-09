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
        fetch('http://127.0.0.1:3002/api/offers')
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
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
                                            <th>Deal</th>
                                            <th>Importer</th>
                                            <th>Price</th>
                                            <th>Buyback</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {console.log(this.state.data)}
                                        {this.state.data.map(offer => {
                                            console.log(offer)
                                            // if (!offer.financer === '1') {
                                            return (

                                                <tr>
                                                    <th scope="row">{offer.id}</th>
                                                    <td>{offer.financer}</td>
                                                    <td>{offer.price}</td>
                                                    <td>{offer.buyback}</td>
                                                </tr>
                                            )
                                            // }

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