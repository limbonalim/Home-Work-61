import React, {useState} from 'react';
import {ApiCounty} from '../../types';
import ListItem from '../List/ListItem.tsx';
import './Info.css';
import Loading from '../Loading/Loading.tsx';

interface Props {
  country: ApiCounty | null;
  borders: ApiCounty[];
  onClick: (country: ApiCounty, listOfBorders: ApiCounty[]) => void;
  getError: (error: string) => void;
}

const MemoInfo: React.FC<Props> = React.memo(function Info({country, borders, onClick, getError}) {
  const [loading, setLoading] = useState<boolean>(false);

  const getInfoLoading = (status: boolean) => {
    setLoading(status);
  };

  const listOfBorders = borders.map((border: ApiCounty, index: number) => (
    <ListItem
      key={index}
      country={border}
      onClick={onClick}
      getError={getError}
      getInfoLoading={getInfoLoading}
    />
  ));

  let capital: string = '-';
  if (country && country.capital) {
    capital = country.capital[0];
  }
  const scrollStyle: React.CSSProperties = {
    overflowY: 'visible'
  };

  if (listOfBorders.length >= 14) {
    scrollStyle.overflowY = 'scroll';
  }


  return country && (<>
      {loading ? <Loading/> :
        <div className="Info">

          <div className="text">
            <h2 className="name">{country.name.common}</h2>
            <h3 className="officialName">{country.name.official}</h3>
            <p>Capital: <span className="data">{capital}</span></p>
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
              alt={country.flags.alt ? country.flags.alt : country.name.common}
            />
          </div>
        </div>
      }</>
  );
}, (prevProps, nextProps) => {
  return (prevProps.country) && ((prevProps.country.name.common === prevProps.country.name.common) && (prevProps.country.name.official === nextProps.country.name.official));
});

export default MemoInfo;