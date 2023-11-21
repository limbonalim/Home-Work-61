import React from 'react';
import ListItem from './ListItem.tsx';
import {ApiCounty} from '../../../types';
import './List.css';

interface Props {
  countries: ApiCounty[];
}

const List: React.FC<Props> = ({countries}) => {
  console.log(countries);
  const listOfCountries = countries.map((country: ApiCounty, index: number) => {
    return (<ListItem key={index} name={country.name.official}/>);
  });

  return (
    <div className="List">
      {listOfCountries}
    </div>
  );
};

export default List;