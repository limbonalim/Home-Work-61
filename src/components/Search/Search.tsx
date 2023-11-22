import React, {FormEvent, useState} from 'react';
import './Search.css';

interface Props {
  onSubmit: (name: string) => void;
}

const Search: React.FC<Props> = ({onSubmit}) => {
  const [name, setName] = useState<string>('');
  const getData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(name);
  };

  return (

    <div className="Search">
      <form onSubmit={onFormSubmit}>
        <input
          onChange={getData}
          value={name}
        />
        <button
          type="submit"
        >Search
        </button>
      </form>
    </div>

  );
};

export default Search;