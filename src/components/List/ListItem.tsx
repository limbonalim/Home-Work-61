import React from 'react';
import {ApiCounty} from '../../types';
import './List.css';

interface Props {
  country: ApiCounty;
  onClick: (country: ApiCounty, borders: string[]) => void;
}

const MemoListItem: React.FC<Props> = React.memo(function ListItem({country, onClick}) {

  return (
    <div
      onClick={() => onClick(country, country.borders)}
      className="List-item"
    >{country.name.common}</div>
  );
}, (prevProps, nextProps) => {
  return (prevProps.country.name.common === nextProps.country.name.common);
});

export default MemoListItem;