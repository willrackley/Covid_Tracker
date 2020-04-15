import React from "react"

//this component will create a card deck of all 50 states and DC with their covid stats
export default function StatesCard(props) {
    return (
        <div className="card-deck d-flex justify-content-center">
            {props.results.map((states, index) => (
                <div key={states.key}>
                    <div className="card mb-5" style={{ width: '18rem' }}>
                        <div className="card-header text-center font-weight-bold">{states.state}</div>
                        <div className="card-body">
                            
                            <div className="card-text">
                                <div className="">
                                    <div>Total Cases: <span className="font-weight-bold">{states.totalCases}</span></div>
                                    
                                    <div>Total Deaths: <span className="font-weight-bold">{states.totalDeaths}</span></div>
                                </div>
                            </div>
                        </div>

                        {(states.totalCases - props.day_change_cases[index].totalCases) > 0 || (states.totalDeaths - props.day_change_cases[index].totalDeaths) > 0? <div className="card-footer">
                            
                            <div className="font-weight-bold text-center">Day Change</div>
                            <div>Total Cases: <span className="font-weight-bold">
                            {states.totalCases - props.day_change_cases[index].totalCases}
                            
                            </span></div>
                                    
                            <div>Total Deaths: <span className="font-weight-bold">{states.totalDeaths - props.day_change_cases[index].totalDeaths}</span></div>
                        </div> : <div className="card-footer">
                                    <div className="font-weight-bold text-center">Day Change</div>
                                    <div>No Changes</div>
                                </div>} 
                        
                    </div>
                </div>
            ))}
        </div>
    )
}