import React from "react";
import axios from "axios";
import { Entry, Diagnose } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setDiagnoseList } from "../state";

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

  }, [dispatch]);

  if (!entries || entries.length === 0) {
    return (
      <div>
        <h3>no entries</h3>
      </div>
    );
  }

  return (
    <div>
    <h3>entries</h3>
    {entries.map(e => (
        <div key={e.id}>
          {e.date} <i>{e.description}</i>
          <ul>
            {e.diagnosisCodes?.map(c =>
              <li key={c}>
                <b>{c}</b> {(diagnoses[c]) ? diagnoses[c].name : <p>fetching data</p>}
              </li>
            )}
          </ul>
        </div>
    ))}
    </div>
  );
};

export default EntryList;