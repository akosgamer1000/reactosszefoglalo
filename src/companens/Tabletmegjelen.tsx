import { useEffect, useState } from "react";
import Card from "./card";
import { Tablet } from "./tabletinterface";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";

export default function Tabletekmegjelen(){
    
    const [tablet,setTablet]=useState<Tablet>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const{tabletid}=useParams <{tabletid:string}>()
    useEffect(() => {

        fetch(`http://localhost:3000/tablets/${tabletid}`)
            .then((response) => {
               
               
                return response.json();
            })
            .then((data) => {
                setTablet(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return <div>
          <Navbar></Navbar>
       {
        
        <Card 
        product_id={tablet!.product_id}
         name={tablet!.name}
        description={tablet!.description}
        operating_system={tablet!.operating_system}
        processor_clock_speed={tablet!.processor_clock_speed}
        processor_cores={tablet!.processor_cores}
        screen_size={tablet!.screen_size}
        screen_resolution={tablet!.screen_resolution}
        ram_size={tablet!.ram_size}
        year={tablet!.year}
        color_options={tablet!.color_options}
        price={tablet!.price}
/>}
    </div>
        
    
    
    
}