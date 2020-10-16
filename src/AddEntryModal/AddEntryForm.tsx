import React from 'react';
import { Button, Grid, Divider } from 'semantic-ui-react';
import { Field, Formik, Form } from "formik";

import { Diagnose, HealthCheckEntry } from '../types';

import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { HealthCheckFields } from './EntryFormFields';

export type EntryFormHealthCheckValues = Omit<HealthCheckEntry, 'id'>;

export type EntryFormValues = 
  | EntryFormHealthCheckValues;

interface Props {
  onSubmit: (values: EntryFormHealthCheckValues) => void;
  onCancel: () => void;
  diagnoses: { [code: string]: Diagnose };
}

const AddEntryModal: React.FC<Props> = ({ onSubmit, onCancel, diagnoses }) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formType, setFormType] = React.useState<string>('HealthCheck');

  const initialValues = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
  };
  
  const healthCheckValues = {
    type: 'HealthCheck',
    healthCheckRating: 0
  };

  const selectedInitialValues = (): EntryFormValues => {
    switch(formType) {
      case 'HealthCheck':
        return {
          ...initialValues,
          ...healthCheckValues,
        } as EntryFormHealthCheckValues;
      default:
        return {
          ...initialValues,
          ...healthCheckValues
        } as EntryFormHealthCheckValues;
    }
  };

  const selectedTypeFormFields = () => {
    if (formType === 'HealthCheck') {
      return (
        <HealthCheckFields />
      );
    }
  };

  return (
    <Formik
      initialValues={selectedInitialValues()}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
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