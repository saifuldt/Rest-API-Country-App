import { useState } from "react";

const Country = ({ country, handleCountryDetails }) => {
  const [toggles, setToggles] = useState(false);

  const handleButtonClick = () => {
    setToggles(!toggles);
    handleCountryDetails(country);
  };

  return (
    <div className="shadow-md shadow-slate-400 h-[380px] p-2 rounded-lg gap-2 bg-gray-300 w-[400px] flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold">{country.name.common}</h1>
      <img
        className="w-[300px] h-[250px] "
        src={country.flags.svg}
        alt={country.flags.alt}
      />
<button
  onClick={handleButtonClick}
  className={`text-lg w-[95%] rounded-lg px-10 py-2 font-semibold hover:text-blue-950 hover:bg-gray-400 ${
    toggles ? "cursor-not-allowed bg-red-500" : "bg-white"
  }`}
  disabled={toggles} // Disable button when toggled
>
  {toggles ? "Visited" : "Details"}
</button>
    </div>
  );
};

export default Country;
