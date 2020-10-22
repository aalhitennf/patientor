import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';
import { Diagnose } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  diagnoses: { [code: string]: Diagnose };
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnoses }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
          diagnoses={diagnoses}
        />
      </Modal.Content>
  </Modal>
);

export default AddEntryModal;