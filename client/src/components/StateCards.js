import React from "react"

//this component will create a card deck of all 50 states and DC with their covid stats
export default function StatesCard(props) {
    return (
        <div className="card-deck d-flex justify-content-center">
            {props.results.map((states, index) => (
                <div key={states.key}>
                    <div className="card mb-5" id={states.state.replace(/\s+/g, '').toLowerCase()} style={{ width: '18rem' }}>
                        <div className="card-header bg-dark text-white text-center font-weight-bold">{states.state}</div>
                        <div className="card-body">
                            
                            <div className="card-text">
                                <div className="">
                                    <div>Total Cases: <span className="font-weight-bold">{states.totalCases.toLocaleString()}</span></div>
                                    
                                    <div>Total Deaths: <span className="font-weight-bold">{states.totalDeaths.toLocaleString()}</span></div>
                                </div>
                            </div>
                        </div>

                         <div className="card-footer">
                            
                            <div className="font-weight-bold text-center">Day Change</div>

                            {(states.totalCases - props.day_change_cases[index].totalCases) <= 0 ? <div>
                            <div>Total Cases: 0</div>
                            </div> : <div>Total Cases: <span className="font-weight-bold">
                            {(states.totalCases - props.day_change_cases[index].totalCases).toLocaleString()}</span></div>}
                            
                            {(states.totalDeaths - props.day_change_cases[index].totalDeaths) <= 0 ? <div>
                            <div>Total Deaths: 0</div>
                            </div> : <div className="text-danger">Total Deaths: <span className="font-weight-bold">
                            {(states.totalDeaths - props.day_change_cases[index].totalDeaths).toLocaleString()}</span></div>}
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}