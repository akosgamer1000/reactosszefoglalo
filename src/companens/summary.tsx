import { useEffect, useState } from "react"; // Importing necessary hooks from React
import { Tablet } from "./tabletinterface"; // Importing Tablet interface definition for TypeScript typing
import Card from "./card"; // Importing Card component
import Navbar from "./navbar"; // Importing Navbar component

// Main component for summarizing tablets
export default function Summary() {

    // State to determine if a specific status is active
    const [status, setStatus] = useState(true);

    // State for search functionality
    const [SearchTerm, setSearchTerm] = useState(''); // Holds the search term input 1
    const [filteredtablet, setFilteredTablet] = useState<Tablet[]>([]); // Holds filtered tablet data based on search 1


    // State for storing list of tablets and related states
    const [tablet, setTablet] = useState<Tablet[]>([]); // Holds fetched tablet data
    const [error, setError] = useState(null); // State for capturing errors 
    const [loading, setLoading] = useState(true); // Loading state during fetches

    // Function to fetch the list of tablets
    const normalfetch = () => {
        fetch('http://localhost:3000/tablets')
            .then((response) => response.json()) // Parse response to JSON
            .then((data) => {
                setTablet(data); // Set tablet data in state
                setFilteredTablet(data); // Initially set filtered tablets to all
                setLoading(false); // Mark loading as complete
            })
            .catch((error) => { // Catch and handle errors
                setError(error.message);
                setLoading(false);
            });
    };

    // Function to handle deletion of a tablet
    const handledelete = async (id: number) => {
        let answer = confirm('biztosan akarod törölni'); // Confirmation for deletion
        if (answer) {
            try {
                console.log(id); // Log the id of the tablet being deleted
                const response = await fetch('http://localhost:3000/tablets/' + id, {
                    method: 'DELETE'
                });
                // Update the filtered tablet list to exclude the deleted tablet
                setFilteredTablet(tablet.filter(tablet => tablet.product_id !== id));
            } catch (err) {
                alert('error'); // Alert user in case of error
            }
        }
    };

    // Function to handle search input changes 1
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase(); // Get the input value in lowercase
        setSearchTerm(term); // Update search term state
        // Filter tablets based on the search term
        const filtered = tablet.filter((tablet) => tablet.name.toLowerCase().includes(term));
        setFilteredTablet(filtered); // Update filtered tablets
    };


    // State for sorting tablets
    const [sortConfig, setSortConfig] = useState<{ key: keyof Tablet; direction: 'asc' | 'desc' } | null>(null); // State for sorting configuration


    // Function to sort tablets based on a given key and direction
    const sortTablet = (key: keyof Tablet, direction: 'asc' | 'desc') => {
        // Create a copy of the filtered tablets and sort it
        const sortedPhones = [...filteredtablet].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredTablet(sortedPhones); // Update the state with sorted tablets
        setSortConfig({ key, direction }); // Set the sort configuration
    };


    // State for pagination
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [totalPages, setTotalPages] = useState(1); // Total number of pages 

    // Function to fetch tablets with pagination functionality
    const fetchTablet = (page: number) => {
        setLoading(true); // Set loading to true while fetching
        setError(null); // Reset error state

        fetch(`http://localhost:3000/tablet?page=${page}&limit=3`) // Fetch tablets with pagination
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`); // Throw error if response is not ok
                }
                return response.json(); // Parse JSON
            })
            .then((data) => {
                setTablet(data.data); // Update tablet data
                setFilteredTablet(data.data); // Update filtered tablets
                setCurrentPage(data.currentPage); // Update current page
                setTotalPages(data.totalPages); // Update total pages
                setLoading(false); // Mark loading as complete
            })
            .catch((error) => {
                setError(error.message); // Set error message in state
                setLoading(false); // Mark loading as complete
            });
    };

    // Function to handle page changes for pagination
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page); // Update the current page state
        }
    };

    // useEffect to fetch data based on current page and status
    useEffect(() => {
        if (status) {
            fetchTablet(currentPage); // Fetch tablets with pagination
        } else {
            normalfetch(); // Fetch all tablets without pagination
        }
    }, [currentPage, status]);

    // Function to toggle the status variable
    const statuschange = () => {
        setStatus(!status); // Toggle status state
    };

    // Loading state UI
    if (loading) {
        return <p>Loading...</p>;
    }

    // Error state UI
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Main UI rendering
    return (
        <div>
            <Navbar></Navbar> {/* Render Navbar component */}
            <table>
                <thead>
                    <tr>
                        {/* Table headers with sorting options */}
                        <th>Product ID</th>
                        <th>Name
                            <button onClick={() => sortTablet('name', 'asc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8593;</button>
                            <button onClick={() => sortTablet('name', 'desc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8595;</button>
                        </th>
                        <th>Description</th>
                        <th>Operating System</th>
                        <th>Processor Clock Speed
                            <button onClick={() => sortTablet('processor_clock_speed', 'asc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8593;</button>
                            <button onClick={() => sortTablet('processor_clock_speed', 'desc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8595;</button>
                        </th>
                        <th>Processor Cores
                            <button onClick={() => sortTablet('processor_cores', 'asc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8593;</button>
                            <button onClick={() => sortTablet('processor_cores', 'desc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8595;</button>
                        </th>
                        <th>Screen Size
                            <button onClick={() => sortTablet('screen_size', 'asc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8593;</button>
                            <button onClick={() => sortTablet('screen_size', 'desc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8595;</button>
                        </th>
                        <th>Screen Resolution
                            <button onClick={() => sortTablet('screen_resolution', 'asc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8593;</button>
                            <button onClick={() => sortTablet('screen_resolution', 'desc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8595;</button>
                        </th>
                        <th>RAM Size
                            <button onClick={() => sortTablet('ram_size', 'asc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8593;</button>
                            <button onClick={() => sortTablet('ram_size', 'desc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8595;</button>
                        </th>
                        <th>Color Options</th>
                        <th>Year
                            <button onClick={() => sortTablet('year', 'asc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8593;</button>
                            <button onClick={() => sortTablet('year', 'desc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8595;</button>
                        </th>
                        <th>Price
                            <button onClick={() => sortTablet('price', 'asc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8593;</button>
                            <button onClick={() => sortTablet('price', 'desc')} style={{ textDecoration: 'none', border: 'none', background: 'none' }}>&#8595;</button>
                        </th>
                        <th>Action</th>
                        <th>Action2</th>
                        <th>
                            <input type="text" value={SearchTerm} onChange={handleSearch}></input> {/* Search input field */}
                        </th>
                    </tr>
                </thead>
                {/* Table body displaying filtered tablets */}
                <tbody>
                    {filteredtablet.map((e) => (
                        <tr key={e.product_id}>
                            <td>{e.product_id}</td>
                            <td>{e.name}</td>
                            <td>{e.description}</td>
                            <td>{e.operating_system}</td>
                            <td>{e.processor_clock_speed}</td>
                            <td>{e.processor_cores}</td>
                            <td>{e.screen_size}</td>
                            <td>{e.screen_resolution}</td>
                            <td>{e.ram_size}</td>
                            <td>{e.color_options}</td>
                            <td>{e.year}</td>
                            <td>{e.price}</td>
                            <td>
                                <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
                                    <a href={`/tabletek-megjelen/${e.product_id}`}>megnézem</a> {/* Link to view tablet details */}
                                </span>
                            </td>
                            <td>
                                <span style={{ marginLeft: '10xp', cursor: 'pointer' }} onClick={() => handledelete(e.product_id)}>törlés</span> {/* Button to delete tablet */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Előző</button>
                <span>Oldal {currentPage} / {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Következő</button>
                <button onClick={() => statuschange()}>switch</button> {/* Button to switch status */}
            </div>
        </div>
    );
}
