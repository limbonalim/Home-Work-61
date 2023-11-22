import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import ListItem from '../List/ListItem.tsx';
import Loading from '../Loading/Loading.tsx';
import {ApiCounty, Money} from '../../types';
import './Info.css';

interface Props {
  country: ApiCounty | null;
  borders: ApiCounty[];
  onClick: (country: ApiCounty, borders: string[]) => void;
  loading: boolean;
}

const MemoInfo: React.FC<Props> = React.memo(function Info({country, borders, onClick, loading}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const listOfBorders = borders.map((border: ApiCounty, index: number) => (
    <ListItem
      key={index}
      country={border}
      onClick={onClick}
    />
  ));

  let capital: string = '-';
  let timezone: React.JSX.Element[] = [];
  let currencies: React.JSX.Element[] = [];
  if (country) {
    if (country.capital) {
      capital = country.capital[0];
    }
    if (country.timezones) {
      for (let item of country.timezones) {
        timezone.push(<li key={timezone.length}>{item}</li>);
      }
    }
    if (country.currencies) {
      for (let currency in country.currencies) {
        let money: Money = country.currencies[currency];
        currencies.push(<li key={currencies.length}>{money.name} - {money.symbol}</li>);
      }
    }
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
            <button
              onClick={() => setShowModal(true)}
            >See more
            </button>
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
      }
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Details about {country.name.common}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-around">
            <div>
              <p>Time zone:</p>
              <ul>
                {timezone}
              </ul>
            </div>
            <div>
              <p>Currencies:</p>
              <ul>
                {currencies}
              </ul>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}, (prevProps, nextProps) => {
  return (prevProps.country) && ((prevProps.country.name.common === prevProps.country.name.common) && (prevProps.country.name.official === nextProps.country.name.official));
});

export default MemoInfo;