import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Segment, Icon } from 'semantic-ui-react';

import DiagnosisList from './DiagnosisList';

const OccupationalHealthcareEntryItem: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

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
      <DiagnosisList entry={entry} />
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
