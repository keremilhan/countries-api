import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react'
import axios from 'axios';
import CountriesTable from './components/CountriesTable/CountriesTable';
import Image from 'react-bootstrap/Image'
import loadingGif from './assets/loading.gif'
import SearchInput from './components/SearchInput/SearchInput';

function App() {

  // STATES and VARIABLES //
  const [countryData, setCountryData] = useState([])
  const [capitalInput, setCapitalInput] = useState("")
  const [generalInput, setGeneralInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const keys = ["name", "capital", "region"]

  // FETCHING DATA FROM API BY USING AXIOS //
  const getData = async () => {
    try {
      axios.get(`https://restcountries.com/v2/all`)
      .then((response)=>{
        const data = response.data
        setCountryData(data)
        setIsLoading(false)
        console.log("data fetched");
      })
    } catch (error) {
      console.log(error);
    }
  }

  const turkishToLower = (string) =>{
	let letters = { 
    "İ": "i", 
    "I": "i",
    "ı": "i"
   };
	string = string.replace(/(([İIı]))/g, function(letter){ return letters[letter]; })
	return string.toLowerCase(); 
  }

  useEffect(() => {
    getData();
  }, [])

  // HANDLE INPUT CHANGES //
  
  const handleCapitalChange = (e) => {
    setCapitalInput(turkishToLower(e.target.value))
  } 

  const handleGeneralChange = (e) => {
    setGeneralInput(turkishToLower(e.target.value))
  }

  // FILTERING FUNCTION //
  const search = (countryData) => {
    return countryData.filter((country)=> turkishToLower(country.capital ? country.capital : "")?.includes(capitalInput)).filter((country)=> keys.some(key => turkishToLower(country[key] ? country[key]: "").includes(generalInput)))
  }

  return (
    <div className='bg-secondary min-vh-100'>
      <div className='container pb-1'>
        {
          !isLoading 
          ?(  
            <>
              <div className='d-flex justify-content-between pt-5'>
                <SearchInput handleChange={handleCapitalChange} title="Capital Filter" />
                <SearchInput handleChange={handleGeneralChange} title="General Filter"/>
              </div>
              <CountriesTable data={search(countryData)} />
            </>
          )
          :(
            <Image src={loadingGif} alt="loading" />
          )
        }
      </div>
    </div>
      
  );
}

export default App;
