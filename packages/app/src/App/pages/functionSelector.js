import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import Cookies from 'universal-cookie';
import { Form, Button } from 'react-bootstrap';

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

                        <Card className='rounded' tag="a" onClick={this.handleClickLSP} style={{ cursor: "pointer" }}>
                            <Card.Body>
                                <Card.Title><i className="feather icon-box text-c-green f-30 m-r-5" /><div className='font-weight-bold'>LSP - Logistic service provider</div></Card.Title>
                                <Card.Text>Owner of platform and transporter of goods. Also temporary storage of the goods</Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='rounded' tag="a" onClick={this.handleClickIMP} style={{ cursor: "pointer" }}>
                            <Card.Body>
                                <Card.Title><i className="feather icon-globe text-c-red f-30 m-r-5" /><div className='font-weight-bold'>Importer</div></Card.Title>
                                <Card.Text>Imports goods from manufacturers and has the desire to tokenize shipments to regain capital for optimal cashflow.</Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card className='rounded' tag="a" onClick={this.handleClickFIN} style={{ cursor: "pointer" }}>
                            <Card.Body>
                                <Card.Title ><i className="feather icon-users text-c-blue f-30 m-r-5 " /><div className='font-weight-bold'>Financier</div></Card.Title>
                                <Card.Text>Buyers of tokens, providing the required capital at a fee. Keeping hold of the tokens untill they have been paid back.</Card.Text>
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
            </Aux >


        );
    }
}

export default Dashboard;