import {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import Alert from 'react-bootstrap/Alert';
import MemoList from '../../components/List/List.tsx';
import MemoInfo from '../../components/Info/Info.tsx';
import Loading from '../../components/Loading/Loading.tsx';
import {ApiCounty} from '../../types';
import './App.css';


const url: string = 'https://restcountries.com/v3.1/all';
const urlAlpha = (code): string => `https://restcountries.com/v3.1/alpha/${code}`;

const App = () => {
  const [countries, setCountries] = useState<ApiCounty[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<ApiCounty | null>(null);
  const [borders, setBorders] = useState<ApiCounty[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [infoLoading, setInfoLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setShowSpinner(true);
      const response = await axios.get<ApiCounty[]>(url);
      setCountries(response.data);
    } catch (e: Error) {
      getError(e.message);
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    void getData();
  }, []);

  const onClick = async (country: ApiCounty, borders: string[] | undefined) => {
    try {
      setInfoLoading(true);
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
      setInfoLoading(false);
    } catch (e: Error) {
      getError(e.message);
    }
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
        {
          showSpinner ?
            <Loading/> :
            <MemoList
              countries={countries}
              onClick={onClick}
            />
        }
        <MemoInfo
          country={selectedCountry}
          borders={borders}
          onClick={onClick}
          loading={infoLoading}
        />
      </div>
    </>
  );
};

export default App;
