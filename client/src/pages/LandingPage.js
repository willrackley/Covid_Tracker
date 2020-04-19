import React, { Component, } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import StatesCard from "../components/StateCards"
import API from "../utils/API"
import moment from "moment";
import "./style.css"


class LandingPage extends Component {

    //refs for searching for state
    search_ref = React.createRef();
    state_ref = React.createRef();

    state = {
        usa_stats: {
            total_cases: 0,
            total_deaths: 0,
        },
        states_stats: [],
        yesterday_usa_stats: {
            total_cases: 0,
            total_deaths: 0,
            timestamp: ""
        },
        yesterday_states_stats: {
            states: [],
            timestamp: ""
        },
        day_change_stats: {
            total_cases: 0,
            total_deaths: 0
        },
        isLoading_day_change: true,
        isLoading_usa_current_stats: true,
        isLoading_states_stats: true,
        state_search_box: "none",
        predictive_text_options: "",
        show_predictive_text: false
    }

    async componentDidMount(){
        await this.get_current_usa_stats();
        await this.get_current_states_stats();
        await this.get_yesterday_states_stats();
        await new Promise((resolve, reject) => setTimeout(resolve, 2000))
        this.get_yesterday_usa_stats();
        this.save_usa_stats();
        this.save_states_stats();
    }

    get_current_usa_stats = () => {
        API.scrape_usa()
        .then(res => {
            this.setState({
                usa_stats: {
                    total_cases: res.data.totalCases,
                    total_deaths: res.data.totalDeaths
                },
                isLoading_usa_current_stats: false
            })
        })
        .catch(err => console.log(err));
    }

    get_yesterday_usa_stats = () => {
        API.get_latest_usa_stats()
        .then(res => {
            //check to see if the user is looking within the same day as when the latest entry was saved. If so, retrieve the prior entry (which woul be the day before)
            if (moment().format("MMMM Do YYYY") === moment(res.data[0].created_at).format("MMMM Do YYYY")) {
                this.setState({
                    yesterday_usa_stats: {
                        total_cases: res.data[1].totalCases,
                        total_deaths: res.data[1].totalDeaths,
                        timestamp: moment(res.data[1].created_at).format("h:mma MMMM Do YYYY")
                    }, 
                    day_change_stats: {
                        total_cases: parseInt(this.state.usa_stats.total_cases.replace(/,/g,'')) - parseInt(res.data[1].totalCases),
                        total_deaths: parseInt(this.state.usa_stats.total_deaths.replace(/,/g,'')) - parseInt(res.data[1].totalDeaths) 
                    },
                    isLoading_day_change: false,
                })
            } else {
                this.setState({
                    yesterday_usa_stats: {
                        total_cases: res.data[0].totalCases,
                        total_deaths: res.data[0].totalDeaths,
                        timestamp: moment(res.data[0].created_at).format("h:mma MMMM Do YYYY")
                    }, 
                    day_change_stats: {
                        total_cases: parseInt(this.state.usa_stats.total_cases.replace(/,/g,'')) - parseInt(res.data[0].totalCases),
                        total_deaths: parseInt(this.state.usa_stats.total_deaths.replace(/,/g,'')) - parseInt(res.data[0].totalDeaths) 
                    },
                    isLoading_day_change: false,
                })
            }   
        })
    }

    get_current_states_stats = () => {
        API.scrape_states()
        .then(res => {
            this.setState({ 
                states_stats: res.data,
                isLoading_states_stats: false
            })
        })
    }

    get_yesterday_states_stats = () => {
        API.get_latest_states_stats()
            .then(res => {
                //check if the latest stats are from today, if so then grab the entry before that
                if ((moment().format("MMMM Do YYYY") === moment(res.data[0].created_at).format("MMMM Do YYYY"))) {
                    this.setState({
                        yesterday_states_stats: {
                            states: res.data[1].states,
                            timestamp: res.data[1].created_at
                        }
                    })
                } else {
                    this.setState({
                        yesterday_states_stats: {
                            states: res.data[0].states,
                            timestamp: res.data[0].created_at
                        }
                    })
                }
                
            })
            .catch(err => console.log(err))
    }

    save_usa_stats = () => {
        //saving the stats for the day if its past 5pm (but only save it once)
        if (moment().isAfter(moment('5:00pm', 'h:mma')) && !this.state.usa_stats_saved) {

            //first check if the stats have been saved for today, if not then we save them
            API.get_latest_usa_stats()
            .then(res => {

                //if database is empty then add the stats, if not check if the latest entry matches todays date. If so then dont add it.
                if (res.data.length === 0) {

                    let saved_stats = {
                    totalCases: parseInt(this.state.usa_stats.total_cases.replace(/,/g,'')),
                    totalDeaths:  parseInt(this.state.usa_stats.total_deaths.replace(/,/g,''))
                    }
                    
                    API.save_current_usa_stats(saved_stats)
                    .then(res => {
                    })
                    .catch(err => console.log(err))
                } else {
                    if (moment().format("MMMM Do YYYY") === moment(res.data[0].created_at).format("MMMM Do YYYY")) {
                        return;
                    } else {
                        let saved_stats = {
                            totalCases: parseInt(this.state.usa_stats.total_cases.replace(/,/g,'')),
                            totalDeaths:  parseInt(this.state.usa_stats.total_deaths.replace(/,/g,''))
                        }
                        
                        API.save_current_usa_stats(saved_stats)
                        .then(res => {
                        })
                        .catch(err => console.log(err))
                    }
                }
            })
            .catch(err => console.log(err)) 
        }
    }

    save_states_stats = () => {
        //saving the stats for the day if its past 5pm (but only save it once)
        if (moment().isAfter(moment('5:00pm', 'h:mma')) && !this.state.usa_stats_saved) {

            //first check if the stats have been saved for today, if not then we save them
            API.get_latest_states_stats()
            .then(res => {
                
                //if database is empty then add the stats, if not check if the latest entry matches todays date. If so then dont add it.
                if (res.data.length === 0) {
                    let stats_to_save = { states: this.state.states_stats };
                    
                    API.save_current_states_stats(stats_to_save)
                    .then(res => {
                    })
                    .catch(err => console.log(err))
                } else {
                    if ((moment().format("MMMM Do YYYY") === moment(res.data[0].created_at).format("MMMM Do YYYY"))) {
                        return;
                    } else {
                        let stats_to_save = { states: this.state.states_stats };
                        API.save_current_states_stats(stats_to_save)
                        .then(res => {
                        })
                        .catch(err => console.log(err))
                    }
                } 
            })
            .catch(err => console.log(err)) 
        }
    }

    confirm_search = (state) => {
        this.search_ref.current.value = state
        this.setState({ state_search_box: "none"})
    }

    scroll_to_state = () => {
        let state_name = this.search_ref.current.value.replace(/\s+/g, '');
        let el = document.getElementById(state_name);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    getSearchText = () => {
        this.setState({ 
            show_predictive_text: true,
            state_search_box: "block"
        })
        
        let state_options = [];
        let search_text = this.search_ref.current.value;
        
        for (let i=0; i < this.state.states_stats.length; i++) {
            let state = this.state.states_stats[i].state.toLowerCase();
            if (state.indexOf(search_text.toLowerCase())===0) {
                state_options.push(<div onClick={() => this.confirm_search(state)} key={state}>{state}</div>)
            } 
            if (search_text === "") {
                state_options = [];
                this.setState({ state_search_box: "none"})
            }
        }
        
        this.setState({ predictive_text_options: state_options })
    }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/" id="brand_name"><span className="text-danger">Covid</span> Tracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        
                        </Nav>
                        
                    </Navbar.Collapse>
                </Navbar>
                    
                <Jumbotron fluid="true" id="jumbotron" className="mb-5">
                    <div className="display-4 text-center text-white mb-2">USA Covid-19 Statistics</div>
                    <div className="text-center text-white h3 mb-5">Current Statistics</div>
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center p-2">
                        <Card className="text-center p-2" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>USA Total Cases</Card.Title>
                                <Card.Text>
                                    {this.state.isLoading_usa_current_stats ? <span className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                    </span>:<span>{this.state.usa_stats.total_cases}</span>}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center p-2">
                            <Card className="text-center p-2" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>USA Total Deaths</Card.Title>
                                    <Card.Text>
                                        {this.state.isLoading_usa_current_stats ? <span className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                        </span>:<span>{this.state.usa_stats.total_deaths}</span>}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="text-center text-white h3 mt-5">Day Change Statistics </div>
                    <div className="text-center mb-2">
                        {this.state.isLoading_day_change ? <span>
                        </span>:<span className="text-white">Data saved at {this.state.yesterday_usa_stats.timestamp}</span>}
                         
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-6 d-flex justify-content-center p-2">
                        
                        <Card className="text-center p-2" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>USA Total Cases</Card.Title>
                                <Card.Text>
                                    {this.state.isLoading_day_change ? <span className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                    </span>:<span>{this.state.day_change_stats.total_cases < 0 ? <span>No new cases!</span> : <span>{this.state.day_change_stats.total_cases.toLocaleString()}</span>}</span>}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                        </div>
                        <div className="col-md-6 d-flex justify-content-center p-2">
                            <Card className="text-center p-2" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>USA Total Deaths</Card.Title>
                                    <Card.Text>
                                    {this.state.isLoading_day_change ? <span className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                    </span>:<span>{this.state.day_change_stats.total_deaths < 0 ? <span>No deaths!</span> : <span>{this.state.day_change_stats.total_deaths.toLocaleString()}</span>}</span>}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Jumbotron>

                <div className="text-center">
                    <div className="display-4 text-center mb-3"> Covid-19 Statistics by State</div>

                    <div className="d-flex justify-content-center">
                        <Form inline>
                           
                            <Form.Group >
                                <FormControl ref={this.search_ref} type="text" placeholder="search a state" onChange={this.getSearchText} className=""/>
                                
                                <Button onClick={()=> this.scroll_to_state()} variant="outline-danger">Search</Button>
                            </Form.Group>
                        </Form> 
                    </div>
                    <div className="mb-5" >
                       <div className="mb-5 mx-auto text-left border-top-0 py-2" id="predictive_text_container" style={{display: this.state.state_search_box}}>
                            {this.state.predictive_text_options}
                       </div>
                    </div>
                    

                    {this.state.isLoading_states_stats ? <div className=" spinner-border text-center" role="status">
                    <span className="sr-only">Loading...</span>
                    </div> :
                    <StatesCard 
                        results={this.state.states_stats}
                        day_change_cases={this.state.yesterday_states_stats.states}
                    />} 
                </div>
            </div>
        )
    }
}

export default LandingPage