import React from 'react';
import { Button, Grid, Divider } from 'semantic-ui-react';
import { Field, Formik, Form } from "formik";

import { Diagnose, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, BaseEntry } from '../types';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import {
  HealthCheckFields, HospitalFields, OccupationalFields,
  EntryTypeSelection, EntryOption
} from './EntryFormFields';

type EntryFormBaseValues = Omit<BaseEntry, 'id'>;
type EntryFormHealthCheckValues = Omit<HealthCheckEntry, 'id'>;
type EntryFormHospitalValues = Omit<HospitalEntry, 'id'>;
type EntryFormOccupationalValues = Omit<OccupationalHealthcareEntry, 'id'>;

export type EntryFormValues =
  | EntryFormBaseValues
  | EntryFormHealthCheckValues
  | EntryFormHospitalValues
  | EntryFormOccupationalValues;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  diagnoses: { [code: string]: Diagnose };
}

const entryOptions: EntryOption[]  = [
  {
    label: 'Health check',
    value: 'HealthCheck'
  },
  {
    label: 'Hospital',
    value: 'Hospital'
  },
  // {
  //   label: 'Occupational healthcare',
  //   value: 'OccupationalHealthcare'
  // }
];

const AddEntryModal: React.FC<Props> = ({ onSubmit, onCancel, diagnoses }) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formType, setFormType] = React.useState<string>();

  const initialValues = {
    type: '',
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
  };
  
  const healthCheckValues = {
    type: 'HealthCheck',
    healthCheckRating: 0
  };

  const hospitalValues = {
    type: 'Hospital',
    discharge: {
      date: '',
      criteria: ''
    }
  };

  const selectedInitialValues = (): EntryFormValues => {
    switch(formType) {
      case 'HealthCheck':
        return {
          ...initialValues,
          ...healthCheckValues,
        } as EntryFormHealthCheckValues;
      case 'Hospital':
        return {
          ...initialValues,
          ...hospitalValues,
        } as EntryFormHospitalValues;
      default:
        return initialValues as EntryFormBaseValues;
    }
  };

  const selectedTypeFormFields = () => {
    switch (formType) {
      case 'HealthCheck':
        return (<HealthCheckFields />);
      case 'Hospital':
        return (<HospitalFields />);
      case 'OccupationalHealthcare':
        return (<OccupationalFields />);
      default:
        return '';
    }
  };

  return (
    <Formik
      initialValues={selectedInitialValues()}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <EntryTypeSelection
              options={entryOptions}
              placeholder='Select entry type'
              setFieldValue={setFieldValue}
              handleChange={(value: string) => setFormType(value)}
            />
            <Field 
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Date'
              placeholder='1970-01-01'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Divider hidden />

            {selectedTypeFormFields()}

            <Divider hidden />

            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryModal;