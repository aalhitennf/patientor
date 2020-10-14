import React from "react";
import { Entry } from "../types";

const EntryList: React.FC<{ entries: Entry[] }> = ({ entries }) => {
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
            {e.diagnosisCodes?.map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
    ))}
    </div>
  );
};

export default EntryList;