import {useEffect, useState} from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import MemoList from '../../components/List/List.tsx';
import MemoInfo from '../../components/Info/Info.tsx';
import {ApiCounty} from '../../types';
import './App.css';

const url: string = 'https://restcountries.com/v3.1/all';

const App = () => {
  const [countries, setCountries] = useState<ApiCounty[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<ApiCounty | null>(null);
  const [borders, setBorders] = useState<ApiCounty[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getData = async () => {
    try {
      const response = await axios.get<ApiCounty[]>(url);
      setCountries(response.data);
    } catch (e: Error) {
      getError(e.message);
    }
  };

  useEffect(() => {
    void getData();
  }, []);

  const onClick = (country: ApiCounty, listOfBorders: ApiCounty[]) => {
    setSelectedCountry(country);
    setBorders(listOfBorders);
  };

  const getError = (error: string) => {
    setError(error);
    setShowError(true);
  };

  return (
    <>
      <Alert variant="danger" show={showError} onClose={() => setShowError(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {error}
        </p>
      </Alert>
      <div className="Myinner">
        <MemoList countries={countries} onClick={onClick} getError={getError}/>
        <MemoInfo country={selectedCountry} borders={borders} onClick={onClick} getError={getError}/>
      </div>
    </>
  );
};

export default App;
