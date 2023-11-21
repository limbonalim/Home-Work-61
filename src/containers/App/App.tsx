import {useCallback, useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import List from '../../components/List/List.tsx';
import Info from '../../components/Info/Info.tsx';
import {ApiCounty} from '../../types';
import './App.css';

const url = 'https://restcountries.com/v3.1/all';
const urlAlpha = (code): string => `https://restcountries.com/v3.1/alpha/${code}`;


const App = () => {
  const [countries, setCountries] = useState<ApiCounty[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<ApiCounty | null>(null);
  const [borders, setBorders] = useState<ApiCounty[]>([]);

  const getData = useCallback(async () => {
    const response = await axios.get<ApiCounty[]>(url);
    setCountries(response.data);
  }, []);

  useEffect(() => {
    void getData();
  }, [getData]);


  const onClick = async (country: ApiCounty, borders: string[]) => {
    const listOfBorders: ApiCounty[] = [];
    if (borders) {
      const response: Promise<AxiosResponse>[] = borders.map((code: string) => axios.get<ApiCounty[]>(urlAlpha(code)));
      const answer: AxiosResponse<ApiCounty>[] = await Promise.all(response);
      for (let item of answer) {
        listOfBorders.push(item.data[0]);
      }
    }
    setSelectedCountry(country);
    setBorders(listOfBorders);
  };

  return (
    <>
      <div className="container">
        <List countries={countries} onClick={onClick}/>
        <Info country={selectedCountry} borders={borders} onClick={onClick}/>
      </div>
    </>
  );
};

export default App;
