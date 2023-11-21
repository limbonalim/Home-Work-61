import React from 'react';
import './List.css';

interface Props {
  name: string;
}

const MemoListItem: React.FC<Props> = React.memo(function ListItem({name}) {
  return (
    <div className="List-item">
      {name}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.name === nextProps.name;
});

export default MemoListItem;