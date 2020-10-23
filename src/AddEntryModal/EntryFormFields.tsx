import React from 'react';
import { Field, FormikProps } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';

import { NumberField, TextField } from '../AddPatientModal/FormField';

export type EntryOption = {
  value: string;
  label: string;
};

export const HealthCheckFields: React.FC = () => {
  return (
    <Field
      label='Health Check Rating'
      name='healthCheckRating'
      component={NumberField}
      min={0}
      max={3}
    />
  );
};

export const HospitalFields: React.FC = () => {
  return (
    <div>
      <label>Discharge</label>
      <Field
        label='Date'
        placeholder='1970-01-01'
        name='discharge.date'
        component={TextField}
      />
      <Field
        label='Criteria'
        placeholder='Why patient was released'
        name='discharge.criteria'
        component={TextField}
      />
    </div>
  );
};

export const OccupationalFields: React.FC = () => {
  return (
    <div>
      <Field
        label='Employer name'
        placeholder='not FBI'
        name='employerName'
        component={TextField}
      />
      <Field
        label='Sick leave start date'
        placeholder='1970-01-01'
        name='sickLeave.startDate'
        component={TextField}
      />
      <Field
        label='Sick leavel end date'
        placeholder='1970-01-01'
        name='sickLeave.endDate'
        component={TextField}
      />
    </div>

  );
};

export const EntryTypeSelection = ({
  options,
  placeholder,
  setFieldValue,
  handleChange,
}: {
  options: EntryOption[];
  placeholder: string;
  setFieldValue: FormikProps<{ type: string }>['setFieldValue'];
  handleChange: (value: string) => void;
}) => {
  const field = 'type';
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldValue(field, data.value);
    handleChange(data.value as string);
  };

  const stateOptions = options.map(o => ({
    key: o.value,
    text: o.label,
    value: o.value
  }));

  return (
    <Form.Field>
      <label>Entry type</label>
      <Dropdown
        options={stateOptions}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Form.Field>
  );
};