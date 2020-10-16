import React from 'react';
import { useStateValue } from '../state';
import { Entry } from '../types';

const DiagnosisList: React.FC<{ entry: Entry }> = ({ entry }) => {

  const [{ diagnoses }] = useStateValue();

  return (
    <div>
    {(entry.diagnosisCodes)
      ? <div>Diagnoses</div>
      : <div></div>
    }
    <ul>
      {entry.diagnosisCodes?.map(c =>
        <li key={c}>
          <b>{c}</b> <i>{diagnoses[c] ? diagnoses[c].name : <p>no description found</p>}</i>
        </li>
      )}
    </ul>
  </div>
  );
};

export default DiagnosisList;