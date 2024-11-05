import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Assuming Shadcn select component path

interface CountryStateCitySelectProps {
  onLocationChange: (location: string) => void; // Callback to pass selected location to parent
}

const CountryStateCitySelect = ({
  onLocationChange,
}: CountryStateCitySelectProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // This will store the full location as a single string
  const [fullLocation, setFullLocation] = useState<string>("");

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedState(null); // Reset state and city when country changes
    setSelectedCity(null);
    setFullLocation("");
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity(null); // Reset city when state changes
    setFullLocation("");
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };

  // Update full location string whenever country, state, or city changes
  useEffect(() => {
    if (selectedCountry && selectedState && selectedCity) {
      const location = `${Country.getCountryByCode(selectedCountry)?.name}, ${
        State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name
      }, ${selectedCity}`;
      setFullLocation(location);
      onLocationChange(location); // Pass full location back to parent
    }
    if (selectedCountry === "remote") {
      onLocationChange("Remote");
    }
    if (selectedCountry && !selectedState) {
      const location = `${Country.getCountryByCode(selectedCountry)?.name}`;
      onLocationChange(location);
    }
    if (selectedCountry && selectedState && !selectedCity) {
      const location = `${Country.getCountryByCode(selectedCountry)?.name}, ${
        State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name
      }`;
      onLocationChange(location);
    }
  }, [selectedCountry, selectedState, selectedCity, onLocationChange]);

  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry!, selectedState)
    : [];

  return (
    <div className="flex items-center gap-x-4">
      {/* Country Select */}
      <Select onValueChange={handleCountryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Country or Remote" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="remote">Remote</SelectItem>
          {countries.map((country) => (
            <SelectItem key={country.isoCode} value={country.isoCode}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Conditionally render State Select */}
      {selectedCountry && selectedCountry !== "remote" && (
        <Select onValueChange={handleStateChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state.isoCode} value={state.isoCode}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Conditionally render City Select */}
      {selectedState && (
        <Select onValueChange={handleCityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default CountryStateCitySelect;
