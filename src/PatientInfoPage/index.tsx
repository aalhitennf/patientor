import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";

import { Patient } from '../types';

import { updatePatient, useStateValue } from "../state";

const PatientInfoPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {

    const fetchPatient = async () => {

      if (!patients[id] || !patients[id].ssn) {
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
      }
    };
    fetchPatient();
  }, [dispatch, id, patients]);

  if (!patients[id]) {
    return (
      <div>error</div>
    );
  }

  return (
    <div>
      <h3>{patients[id].name}, {patients[id].gender}</h3>
      <div>ssn: {patients[id].ssn}</div>
      <div>occupation: {patients[id].occupation}</div>
    </div>
  );
};

export default PatientInfoPage;