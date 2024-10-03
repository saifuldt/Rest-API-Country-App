import { useEffect, useState } from 'react';
import Country from './Country';
import Header from './Header';
import Footer from './Footer';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchCountries = async () => {
      const fetchData = await fetch('https://restcountries.com/v3.1/all');
      const data = await fetchData.json();
      setCountries(data);

    }
    fetchCountries();



  }, []);
  useEffect(() => {
    if (searchQuery) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries); 
    }
  }, [searchQuery, countries]
  );


  const handleCountryDetails = (country) => {
    const countryCurrencies = Object.entries(country?.currencies || {}).map(
      (currency) => {
        const [code, { name, symbol }] = currency;
        return { code, name, symbol };
      }
    );

    setCountry({
      ...country,
      flag: country?.flags?.svg,
      population: country?.population?.toLocaleString(),
      currencies: countryCurrencies,

    });

    setIsModalOpen(true); // Open the modal
    console.log(countryCurrencies);
  };
  const closeModal = (e) => {
    setIsModalOpen(false); // Close the modal
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
  };

  const filteredData = ({ region, name: { common } }) => {
    if (
      region === "Europe" ||
      region === "Americas" ||
      common === "Israel" ||
      common === "India"
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className=' h-screen flex flex-col justify-between'>

      <div className="fixed w-full z-50 ">
        <Header searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      </div>

      {
        isModalOpen && (
          <div onClick={closeModal} className='flex justify-center items-center  fixed opacity-90 bg-gray-300 z-50  w-full h-full '>
            <div className="flex justify-center items-center  ">
              <div onClick={(e) => { e.stopPropagation() }} className="w-full h-1/2 bg-white p-4 rounded-lg ">

                <div className="flex justify-between ">
                  <h2 className='text-3xl font-bold text-blue-950 '> {country?.name?.common} </h2>
                  <button onClick={closeModal} className='rounded-full bg-red-700 text-white w-10 h-10  p-2' >x</button>
                </div>
                <div className="mt-4 space-y-2 ">
                  <img className="w-[350px] md:w-[400px] border-4 border-gray-300 border-opacity-20 " src={country?.flag} alt="Country flag" />
                  <p>
                    <strong>Population:</strong> {country?.population}
                  </p>
                  <p>
                    <strong>Region:</strong> {country?.region}
                  </p>
                  <p>
                    <strong>Capital:</strong>{" "}
                    {country?.capital
                      ? country?.capital
                      : "Capital not available"}
                  </p>
                  <div>

                    {country?.currencies.length > 0
                      ? country?.currencies.map((currency) => (
                        <div key={currency?.code}>
                          <p>
                            <strong>Currencies:</strong>{" "}
                            {currency?.name} ({currency?.symbol})
                          </p>
                          <p><strong>Code:</strong> {" "}{currency?.code}</p>
                        </div>
                      ))
                      : "No currencies available"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      <div className='flex gap-4 flex-wrap justify-center items-center z-10 md:pt-20 pt-28 bg-gray-200'>
        {
          filteredCountries.length > 0 ? 
            filteredCountries
              .filter(filteredData)
              .sort((a, b) => {
                return a.population - b.population;
              }).map((country) => (
              <Country key={country.cca3} country={country} handleCountryDetails={handleCountryDetails} />
            ))
            :
            <div className="">
              <p>No Country Found</p>
            </div>
        }

      </div>
      
<Footer />

    </div>
  )
}

export default Countries;