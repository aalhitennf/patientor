import React from "react";
import axios from "axios";
import { Entry, Diagnose } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setDiagnoseList } from "../state";

import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcare from "./OccupationalHealthcareEntry";

const EntryList: React.FC<{ entries: Entry[] }> = ({ entries }) => {

  const [ { diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {

    const fetchDiagnoses = async () => {

      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoseList(diagnosesFromApi));
      } catch (e) {
        console.log(e.message);
      }
    };

    if (Object.keys(diagnoses).length === 0) {
      fetchDiagnoses();
    }

  }, [dispatch, diagnoses]);

  if (!entries || entries.length === 0) {
    return (
      <div>
        <h3>No entries</h3>
      </div>
    );
  }

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare entry={entry} />;
      default:
        return (<div>unknown entry</div>);
    }
  };

  return (
    <div>
    <h3>Entries</h3>
    {entries.reverse().map(e => (
      <EntryDetails key={e.id} entry={e} />
    ))}
    </div>
  );
};

export default EntryList;