import React from 'react';
import { HealthCheckEntry } from '../types';
import { Segment, Icon, Divider } from 'semantic-ui-react';

import DiagnosisList from './DiagnosisList';

const ratingIconColor = (rating: number):
'green' | 'red' | 'yellow' | 'orange' | 'blue' => {
  switch (rating) {
    case 0:
      return 'green';
    case 1:
      return 'yellow';
    case 2:
      return 'orange';
    case 3:
      return 'red';
    default:
      return 'blue';
  }
};

const HealthCheckEntryItem: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  
  return (
    <Segment>
      <div style={{ display: 'inline-flex' }} >
        <h3>{entry.date}</h3>
        <Icon name='doctor' size='big' />
      </div>
      <div style={{ padding: '10px' }}>
        <i>{entry.description}</i>
      </div>
      <DiagnosisList entry={entry} />
      <Divider hidden />
      <div>
        <Icon name='heart' color={ratingIconColor(entry.healthCheckRating)} />
      </div>
    </Segment>
  );
};

export default HealthCheckEntryItem;
