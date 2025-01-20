import React, {useState,useEffect} from "react";
import "./XCountriesSearch.css";

const XCountriesSearch = () => {
    const [countryList, setCountryList] = useState([]);
    const [currentList, setCurrentList] = useState(countryList);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading,setLoading] = useState(true);
    const [timerID, setTimerID] = useState(null);

    const countryListURL = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

    const handleChange = (e) => {
        setSearchTerm(e.target.value);

        if(!searchTerm){
            setCurrentList(countryList);
            return;
        }

        const query = searchTerm.toLowerCase();
        const filteredCountries = countryList.filter(country => 
        country.common.toLowerCase().includes(query));
        setCurrentList(filteredCountries);
        console.log(`currentList: ${currentList}`);

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(countryListURL);
                console.log(response);
                const result = await response.json();
                setCountryList(result);
                setCurrentList(result);
            } catch (error) {
                console.log("Error fetching data: ",error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

 

    return(
        <div className="main-container">
            <div style={{
                backgroundColor:"#F0F0F0",
                height: "2.5rem",
                width: "85%",
                margin: "0 auto"}}
            >
                <label htmlFor="search"></label>
                <input  className="search-field" 
                        type="text" 
                        name="search" 
                        placeholder="Search for countries..." 
                        onChange={handleChange}>
                </input>
            </div>
            <div className="grid-container">
                {currentList.map((ctry,idx) => (
                    <div className="country-card">
                        <img  style={{
                            width: "50%",
                            aspectRatio:"1",
                            padding:"10px"
                            }} 
                            src={ctry.png} 
                            alt="Unavailable">
                        </img>
                        <h4 style={{marginTop:"-10px"}}>{ctry.common}</h4>
                    </div>
                ))}                   
            </div>
        </div>
    )

}

export default XCountriesSearch;