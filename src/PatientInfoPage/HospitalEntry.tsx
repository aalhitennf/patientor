import React from "react";
import { HospitalEntry } from "../types";
import { Segment, Icon, Divider } from 'semantic-ui-react';

const HospitalEntryItem: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      <div style={{ display: 'inline-flex' }} >
        <h3>{entry.date}</h3> <Icon name='hospital' size='big' />
      </div>
      <div style={{ padding: '10px' }}>
        <i>{entry.description}</i>
      </div>
      <Divider hidden />
      <div>
        <div>
          Discharge date: {entry.discharge.date}
        </div>
        <div>
          Criteria: {entry.discharge.criteria}
        </div>
      </div>
    </Segment>
  );
};

export default HospitalEntryItem;
