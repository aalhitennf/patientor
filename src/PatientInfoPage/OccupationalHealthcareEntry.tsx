import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Segment, Icon } from 'semantic-ui-react';
import { useStateValue } from "../state";

const OccupationalHealthcareEntryItem: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

  const [ { diagnoses } ] = useStateValue();

  return (
    <Segment>
      <div style={{ display: 'inline-flex' }} >
        <div><h3>{entry.date}</h3></div>
        <Icon name='stethoscope' size='big' />
        <div><h4>{entry.employerName}</h4></div>
      </div>
      <div style={{ padding: '10px' }}>
        <i>{entry.description}</i>
      </div>
      <div>
        {(entry.diagnosisCodes)
          ? <div>Diagnoses</div>
          : <div></div>
        }
        <ul>
          {entry.diagnosisCodes?.map(c =>
            <li>
              <b>{c}</b> <i>{diagnoses[c] ? diagnoses[c].name : <p>no description found</p>}</i>
            </li>
          )}
        </ul>
      </div>
      <div>
        {entry.sickLeave
          ? <div>
              Sick leave:
              from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </div>
          : null
        }
      </div>
    </Segment>
  );
};

export default OccupationalHealthcareEntryItem;
