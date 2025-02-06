import React from 'react';

const LocationSearchPanel = ({suggestions,vehiclePanel,setVehiclePanel ,setPanelOpen, setPickup , setDestination , activeField }) => {
  
  const handleSuggestionClick =(suggestion)=>{
    if( activeField === 'pickup'){
      setPickup(suggestion)
    }else{
      setDestination(suggestion)
    }
  }
  return (
    <div>
      {suggestions.map((elem, index) => (
        <div
         onClick={()=>{
          handleSuggestionClick(elem)
         }}
          key={index} // Add a unique `key` for each item (using `index` here as a fallback)
          className="flex gap-4 active:border-2 p-3 rounded-xl items-center my-2 justify-start overflow-y-auto overflow-scroll "
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem}</h4>

        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
