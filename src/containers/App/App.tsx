import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import List from '../../components/List/List.tsx';
import {ApiCounty} from '../../../types';
import './App.css';

const url = 'https://restcountries.com/v3.1/all';
const App = () => {
  const [countries, setCountries] = useState<ApiCounty[]>([])

  const getData = useCallback(async () => {
    const response = await axios.get<ApiCounty[]>(url);
    setCountries(response.data)
  }, []);

  useEffect(() => {
    void getData()
  }, [getData]);

  return (
    <>
      <List countries={countries}/>
    </>
  );
};

export default App;
