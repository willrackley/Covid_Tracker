import React, { Component, } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import API from "../utils/API"

class LandingPage extends Component {

    state = {
        usa_stats: {
            total_cases: 0,
            total_deaths: 0
        }
    }

    componentDidMount(){
        this.get_usa_stats();
    }

    get_usa_stats = () => {
        API.scrape_usa()
        .then(res => {
            this.setState({
                usa_stats: {
                    total_cases: res.data.totalCases,
                    total_deaths: res.data.totalDeaths
                }
            })
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Covid Tracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Form inline>
                        <FormControl type="text" placeholder="Search State" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>

                <Jumbotron fluid="true" className="">
                    <div className="display-4 text-center mb-5">USA Covid-19 Statistics</div>
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center p-2">
                        <Card className="text-center p-2" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>USA Total Covid-19 Cases</Card.Title>
                                <Card.Text>
                                    {this.state.usa_stats.total_cases}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center p-2">
                            <Card className="text-center p-2" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>USA Total Covid-19 Deaths</Card.Title>
                                    <Card.Text>
                                        {this.state.usa_stats.total_deaths}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        )
    }
}

export default LandingPage