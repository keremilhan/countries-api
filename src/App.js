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
  const [countriesDataValues] = useState([])

  // FETCHING DATA FROM API BY USING AXIOS //
  const getData = async () => {
    try {
      axios.get(`https://restcountries.com/v2/all`)
      .then((response)=>{
        const data = response.data
        setCountryData(data)

        for (let country of data) {
          collectValues(country, true);  
          countriesDataValues.push({
            countryName: country.name,
            values: JSON.parse(JSON.stringify(countryValues))
          })
        }

        setIsLoading(false)
        console.log("data fetched");
      })
    } catch (error) {
      console.log(error);
    }
  }

  let countryValues = []
  function collectValues(obj, isFirst) {
    if(isFirst){
      countryValues = []
    }
    for (var key in obj) {
        if (typeof obj[key] === "object") {
          collectValues(obj[key], false);   
        } else {
            countryValues.push(obj[key]);    
        }
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
    // eslint-disable-next-line
  }, [])

  // HANDLE INPUT CHANGES //
  
  const handleCapitalChange = (e) => {
    clearTimeout()
    // Bu metodda debouncer mekanizması kullanarak kullanıcının filtre inputunun tamamını girmesini bekleyerek her harfte search algoritmasını çalıştırmıyoruz. Bu şekilde kodumuz daha optimize bir şekilde çalışıyor.
    setTimeout(() => {
      setCapitalInput(turkishToLower(e.target.value).trim())
    }, 500);

  } 

  const handleGeneralChange = (e) => {
    clearTimeout()
    // Bu metodda debouncer mekanizması kullanarak kullanıcının filtre inputunun tamamını girmesini bekleyerek her harfte search algoritmasını çalıştırmıyoruz. Bu şekilde kodumuz daha optimize bir şekilde çalışıyor.
    setTimeout(() => {
      setGeneralInput(
        turkishToLower(e.target.value).trim()
      )
    }, 500);
  }

  function isExist(countryValues){
    for(let value of countryValues){
      if(turkishToLower(value.toString()).includes(generalInput)){
        return true
      }
    }
    return false
  }

  // FILTERING FUNCTION //
  const search = (countryData) => {

    if(capitalInput){
      countryData = countryData.filter((el)=> turkishToLower(el.capital ? el.capital : "")?.includes(capitalInput))
    }

    if(generalInput){
      let filteredCountryNames = countriesDataValues.filter(c => isExist(c.values)).map(c => c.countryName)
      countryData =  countryData.filter((el)=> filteredCountryNames.includes(el.name))
    }

    return countryData
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
