import React from 'react';
import { Field } from 'formik';

import { NumberField } from '../AddPatientModal/FormField';

export const HealthCheckFields: React.FC = () => {
  return (
    <Field
      label="Health Check Rating"
      name="healthCheckRating"
      component={NumberField}
      min={0}
      max={3}
    />
  );
};