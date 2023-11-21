import React from 'react';
import {ApiCounty} from '../../types';
import './Info.css';
import ListItem from '../List/ListItem.tsx';

interface Props {
  country: ApiCounty | null;
  borders: ApiCounty[];
  onClick: (country: ApiCounty, borders: string[]) => void;
}

const Info: React.FC<Props> = ({country, borders, onClick}) => {
  const listOfBorders = borders.map((border, index) => (
    <ListItem
      key={index}
      country={border}
      onClick={onClick}/>
  ));

  const scrollStyle: React.CSSProperties = {
    overflowY: 'visible'
  };

  if (listOfBorders.length >= 14) {
    scrollStyle.overflowY = 'scroll';
  }

  return country && (
    <div className="Info">
      <div className="text">
        <h2 className="name">{country.name.common}</h2>
        <h3 className="officialName">{country.name.official}</h3>
        <p>Capital: <span className="data">{country.capital[0]}</span></p>
        <p>Population: <span className="data">{country.population}</span></p>
        <p>Region: <span className="data">{country.region}</span></p>
        <div>
          <h3>Borders with:</h3>
          <div className="borders" style={scrollStyle}>
            {listOfBorders}
          </div>
        </div>
      </div>
      <div className="image-container">
        <img
          className="image"
          src={country.flags.svg}
          alt={country.flags.alt}
        />
      </div>
    </div>
  );
};

export default Info;