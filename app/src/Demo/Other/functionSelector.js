import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import Cookies from 'universal-cookie';
import { Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

const cookies = new Cookies();
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pkey: ""
        }
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClickLSP(e) {
        e.preventDefault();
        cookies.set("role", "lsp", { path: '/' });
        window.location.href = "/dashboard/default";
    }
    handleClickIMP(e) {
        e.preventDefault();
        cookies.set("role", "imp", { path: '/' });
        window.location.href = "/dashboard/default";
    }
    handleClickFIN(e) {
        e.preventDefault();
        cookies.set("role", "fin", { path: '/' });
        window.location.href = "/dashboard/default";
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        alert("Private key has been saved ");
        cookies.set("pkey", this.state.pkey);
    }
    render() {
        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>

                        <Card tag="a" onClick={this.handleClickLSP} style={{ cursor: "pointer" }}>
                            <Card.Body>
                                <h6 className='mb-4'>LSP</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> $249.95</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">50%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card tag="a" onClick={this.handleClickIMP} style={{ cursor: "pointer" }}>
                            <Card.Body>
                                <h6 className='mb-4'>Importer</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5" /> $2.942.32</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">36%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{ width: '35%' }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card tag="a" onClick={this.handleClickFIN} style={{ cursor: "pointer" }}>
                            <Card.Body>
                                <h6 className='mb-4'>Financier</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> $8.638.32</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">70%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Form onSubmit={this.mySubmitHandler}>
                    <Form.Group controlId="formEthkey">
                        <Form.Label>Private key</Form.Label>
                        <Form.Control type="text" name="pkey" value={this.state.pkey} placeholder="private key" onChange={this.changeHandler} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Aux>


        );
    }
}

export default Dashboard;