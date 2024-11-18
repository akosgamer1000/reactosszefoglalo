import { Tablet } from "./tabletinterface"

interface props extends Tablet{

}

export default function Card(props: props){
    return<>
    
    <div className="card">
    <h2 className="card-title">{props.name}</h2>
    <div className="card-body">
        
        <p className="card-text">{props.description}</p>
        <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>OS:</strong> {props.operating_system}</li>
            <li className="list-group-item"><strong>Processor:</strong> {props.processor_clock_speed} GHz, {props.processor_cores} cores</li>
            <li className="list-group-item"><strong>Screen:</strong> {props.screen_size} inches, {props.screen_resolution}</li>
            <li className="list-group-item"><strong>RAM:</strong> {props.ram_size} GB</li>
            <li className="list-group-item"><strong>Release Year:</strong> {props.year}</li>
            <li className="list-group-item"><strong>Colors:</strong> {props.color_options}</li>
        </ul>
       
    </div>
    </div>
    
    </>
    
    
    
    
}