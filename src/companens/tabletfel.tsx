import { useState } from "react";
import Navbar from "./navbar";

export default function Tabletekfelvetel(){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [operating_system, setOperatingSystem] = useState('');
    const [processor_clock_speed, setProcessorClockSpeed] = useState(0);
    const [processor_cores, setProcessorCores] = useState(0);
    const [screen_size, setScreenSize] = useState(0);
    const [screen_resolution, setScreenResolution] = useState('');
    const [ram_size, setRamSize] = useState(0);
    const [year, setYear] = useState(0);
    const [color_options, setColorOptions] = useState('');
    const [price, setPrice] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const tablet={
             
            name: name,
            description: description,
            operating_system: operating_system,
            processor_clock_speed: processor_clock_speed,
            processor_cores: processor_cores,
            screen_size: screen_size,
            screen_resolution: screen_resolution,
            ram_size: ram_size,
            year: year,
            color_options: color_options,
            price: price

        }
        try {
            const response = await fetch('http://localhost:3000/tablets', {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(tablet)
            })
            if (!response.ok){
                const errorData = await response.json();
                setError(errorData.error)
                throw new Error(`Hiba történt: ${response.status}`)
            }

            setSuccess(true);
            setName(''); setDescription(''); setOperatingSystem(''); setProcessorClockSpeed(0); setProcessorCores(0); setScreenSize(0); setScreenResolution(''); setRamSize(0); setYear(0); setPrice(0);
        } catch (err: any) {
            setError(err.message)
        } finally {

        }
    }
    return <>
        <Navbar></Navbar>
    <h2>Tablet Felvétel</h2>
    <form onSubmit={handleSubmit}>
    <label>
        <p>Name:</p>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    </label>
    <label>
        <p>Description:</p>
        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    </label>
    <label>
        <p>Operating System:</p>
        <input
            type="text"
            value={operating_system}
            onChange={(e) => setOperatingSystem(e.target.value)}
        />
    </label>
    <label>
        <p>Processor Clock Speed (GHz):</p>
        <input
            type="number"
            value={processor_clock_speed}
            onChange={(e) => setProcessorClockSpeed(parseFloat(e.target.value))}
        />
    </label>
    <label>
        <p>Processor Cores:</p>
        <input
            type="number"
            value={processor_cores}
            onChange={(e) => setProcessorCores(parseInt(e.target.value))}
        />
    </label>
    <label>
        <p>Screen Size (inches):</p>
        <input
            type="number"
            value={screen_size}
            onChange={(e) => setScreenSize(parseFloat(e.target.value))}
        />
    </label>
    <label>
        <p>Screen Resolution:</p>
        <input
            type="text"
            value={screen_resolution}
            onChange={(e) => setScreenResolution(e.target.value)}
        />
    </label>
    <label>
        <p>RAM Size (GB):</p>
        <input
            type="number"
            value={ram_size}
            onChange={(e) => setRamSize(parseInt(e.target.value))}
        />
    </label>
    <label>
        <p>Year:</p>
        <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
        />
    </label>
    <label>
        <p>Color Options:</p>
        <input
            type="text"
            value={color_options}
            onChange={(e) => setColorOptions(e.target.value)}
        />
    </label>
    <label>
        <p>Price:</p>
        <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
        />
    </label>
    <button type="submit">Tablet Felvétele</button>
    {error && <p>{error}</p>}
    {success && <p>Sikeresen megtörtént a tablet felvétele.</p>}
</form>

    </>
}