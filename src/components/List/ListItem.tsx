import React, {useCallback} from 'react';
import axios, {AxiosResponse} from 'axios';
import {ApiCounty} from '../../types';
import './List.css';

const urlAlpha = (code): string => `https://restcountries.com/v3.1/alpha/${code}`;

interface Props {
  country: ApiCounty;
  onClick: (country: ApiCounty, listOfBorders: ApiCounty[]) => void;
  getError: (error: string) => void;
  getInfoLoading?: (status: boolean) => void;
}

const MemoListItem: React.FC<Props> = React.memo(function ListItem({country, onClick, getError, getInfoLoading}) {
  const onItemClick = useCallback(async (country: ApiCounty, borders: string[] | undefined) => {
    try {
      getInfoLoading ? getInfoLoading(true) : null;
      const listOfBorders: ApiCounty[] = [];
      if (borders) {
        const response: Promise<AxiosResponse>[] = borders.map((code: string) => axios.get<ApiCounty[]>(urlAlpha(code)));
        const answer: AxiosResponse<ApiCounty>[] = await Promise.all(response);
        for (let item of answer) {
          listOfBorders.push(item.data[0]);
        }
      }
      onClick(country, listOfBorders);
      getInfoLoading ? getInfoLoading(false) : null;
    } catch (e: Error) {
      getError(e.message);
    }
  }, [country.name.common]);

  return (
    <div
      onClick={() => onItemClick(country, country.borders)}
      className="List-item"
    >{country.name.common}</div>
  );
}, (prevProps, nextProps) => {
  return (prevProps.country.name.common === nextProps.country.name.common);
});

export default MemoListItem;