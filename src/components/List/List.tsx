import React from 'react';
import MemoListItem from './ListItem.tsx';
import {ApiCounty} from '../../types';
import './List.css';

interface Props {
  countries: ApiCounty[];
  onClick: (country: ApiCounty, borders: string[]) => void;
}

const MemoList: React.FC<Props> = React.memo(function List({countries, onClick}) {
  const listOfCountries = countries.map((country: ApiCounty, index: number) => {
    return (
      <MemoListItem
        key={index}
        country={country}
        onClick={onClick}
      />);
  });

  return (
    <div className="List">
      {listOfCountries}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.countries.length === nextProps.countries.length;
});

export default MemoList;