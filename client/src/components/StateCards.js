import React from "react"


//this component will create a card deck of all 50 states and DC with their covid stats
export default function StatesCard(props) {
    return (
        <div className="card-deck d-flex justify-content-center">
            {props.results.map(states => (
                <div>
                <div className="card p-2 mb-5" key={states.state} style={{ width: '18rem' }}>
                    <div className="card-body">
                        <div className="card-title">{states.state}</div>
                        <div className="card-text">

                            Total Cases 
                            {states.totalCases}
                            Total Deaths
                            {states.totalDeaths}
                            
                        
                            {/* <Card>
                                <Card.Title> Total Deaths </Card.Title>
                                <Card.Text>
                                    {states.totalDeaths}
                                </Card.Text>
                            </Card> */}
                        
                           
                        </div>
                    </div>
                </div>
                </div>
            ))}
        </div>
    )
}