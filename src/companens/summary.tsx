import { useEffect, useState } from "react";
import { Tablet } from "./tabletinterface";
import Card from "./card";
import Navbar from "./navbar";

export default function Summary(){
    const [tablet,setTablet]=useState<Tablet[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredtablet, setFilteredTablet] = useState<Tablet[]>([]);
    const[SearchTerm, setSearchTerm]= useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [status,setStatus] = useState(true)
    const [sortConfig, setSortConfig] = useState<{ key: keyof Tablet; direction: 'asc' | 'desc' } | null>(null);
    const fetchTablet = (page: number) => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/tablet?page=${page}&limit=3`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTablet(data.data);
                setFilteredTablet(data.data);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };
    const normalfetch = () => {
        fetch('http://localhost:3000/tablets')
        .then((response) => {
           
           
            return response.json();
        })
        .then((data) => {
            setTablet(data);
            setFilteredTablet(data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    useEffect(() => {
        if(status){
            fetchTablet(currentPage)
        }
        else{
            normalfetch()
        }
    }, [currentPage,status]);
    const sortTablet = (key: keyof Tablet, direction: 'asc' | 'desc') => {
        const sortedPhones = [...filteredtablet].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredTablet(sortedPhones);
        setSortConfig({ key, direction });
    };
    const handledelete= async(id:number)=>{

        let answer=confirm('biztosan akarod törölni' )
        if(answer){
            try{
                console.log(id)
                const response=await fetch('http://localhost:3000/tablets/'+id,{
                  method: 'DELETE'
                })
                
                setFilteredTablet(tablet.filter(tablet=>tablet.product_id !== id))
                
              }catch(err){
                  alert('error')
              }
        }
    }
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = tablet.filter(
            (tablet) =>
               tablet.name.toLowerCase().includes(term) 
              
                
        );
        setFilteredTablet(filtered);
    };
    const statuschange=()=>{
        if(status){
            setStatus(false)
        }
        else {
            setStatus(true)
        }
    }
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return  <div>
        <Navbar></Navbar>
        <table>
  <thead>
    <tr>
    <th>Product ID</th>
      <th>Name <button
                                onClick={() => sortTablet('name', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablet('name', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
      <th>Description</th>
      <th>Operating System </th>
      <th>Processor Clock Speed <button
                                onClick={() => sortTablet('processor_clock_speed', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablet('processor_clock_speed', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
      <th>Processor Cores <button
                                onClick={() => sortTablet('processor_cores', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablet('processor_cores', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
      <th>Screen Size <button
                                onClick={() => sortTablet('screen_size', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablet('screen_size', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
      <th>Screen Resolution<button
                                onClick={() => sortTablet('screen_resolution', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablet('screen_resolution', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
      <th>RAM Size <button
                                onClick={() => sortTablet('ram_size', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablet('ram_size', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
      <th>Color Options</th>
      <th>Year <button
                                onClick={() => sortTablet('year', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablet('year', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
      <th>Price <button
                                onClick={() => sortTablet('price', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablet('price', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
      <th>Action</th>
      <th>Action2</th>
      <th><input
       type="text"
       value={SearchTerm}
       onChange={handleSearch}
       ></input></th>
    </tr>
  </thead>
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
            <a href={`/tabletek-megjelen/${e.product_id}`}>megnézem</a>
          </span>
        </td>
        <td>
        <span
        style={{marginLeft:'10xp',cursor:'pointer'}}
        onClick={()=>handledelete(e.product_id)}
      
        >törlés</span>
        </td>
        
      </tr>
    ))}
  </tbody>
</table>
 <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Előző
                </button>
                <span>
                    Oldal {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Következő
                </button>
                <button
                    onClick={()=>statuschange()}
                >switch</button>

    </div>
    

  
        
    
}