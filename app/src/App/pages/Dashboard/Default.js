import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";
import Card from "../../components/MainCard";

class DashboardDefault extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: [],
        };
    }
    componentDidMount() {
        fetch('http://localhost:8084/test2.json')
            .then(response => response.json())
            .then(data => this.setState({ item: data.item }));
    }
    render() {
        const { item } = this.state;
        console.log({ item });
        return (
            item.map(it =>
                < Aux >
                    <Row>
                        <Col>
                            <Card title={it.Titel} isOption>
                                {it.Naam}
                                <p>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            </p>
                            </Card>
                        </Col>
                    </Row>
                </Aux >
            )
        );
    }
}

export default DashboardDefault;