import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { apiBaseUrl } from '../constants';
import { Patient, Entry } from '../types';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { updatePatient, useStateValue } from '../state';

import { Divider, Icon, Button } from 'semantic-ui-react';

import EntryList from './EntryList';
import AddEntryModal from '../AddEntryModal';

const genderString = (gender: string): 'mars' | 'venus' | 'venus mars' | 'genderless' => {
  switch (gender) {
    case 'male':
      return 'mars';
    case 'female':
      return 'venus';
    case 'other':
      return 'venus mars';
    default:
      return 'genderless';
  }
};

const PatientInfoPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const [ modalOpen, setModalOpen ] = useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {

    const fetchPatient = async () => {

      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        if (!patientFromApi) {
          return (<div>no patient with this id</div>);
        }
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        const err = e as Error;
        return (<div>error: ${err.message}</div>);
      }
    };

    if (!patients[id] || !patients[id].ssn) {
      fetchPatient();
    }
  }, [dispatch, id, patients]);

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const addEntry = async (values: EntryFormValues) => {
    try {
      const { data: response } = await axios.post<EntryFormValues>(
        `${apiBaseUrl}/patients/${patients[id].id}/entries`,
        { entry: values }
      );
      const newEntry = response as Entry;
      const updatedPatient = {
        ...patients[id],
        entries: patients[id].entries.concat(newEntry)
      };
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (!patients[id] || !patients[id].entries) {
    return (
      <div>fetching data</div>
    );
  }

  return (
    <div>
      <h3>{patients[id].name}, <Icon name={genderString(patients[id].gender)} /></h3>
      <div>ssn: {patients[id].ssn}</div>
      <div>occupation: {patients[id].occupation}</div>
      <Divider hidden />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={addEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
      <Button
        onClick={() => openModal()}
        color='green'
      >
        Add entry
      </Button>
      <Divider hidden />
      <EntryList entries={patients[id].entries} />
    </div>
  );
};

export default PatientInfoPage;