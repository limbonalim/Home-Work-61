import React, {useEffect} from 'react';
import ListItem from './ListItem.tsx';
import {ApiCounty} from '../../types';
import './List.css';

interface Props {
  countries: ApiCounty[];
  onClick: (country: ApiCounty, borders: string[]) => void;
}

const List: React.FC<Props> = ({countries, onClick}) => {
  console.log('[List] render')
  useEffect(() => {
    console.log('[List] update')
  }, []);

  const listOfCountries = countries.map((country: ApiCounty, index: number) => {
    return (<ListItem key={index} country={country} onClick={onClick}/>);
  });

  return (
    <div className="List">
      {listOfCountries}
    </div>
  );
};

export default List;