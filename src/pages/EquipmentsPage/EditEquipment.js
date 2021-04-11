import React from 'react'

import EditEquipmentForm from './EditEquipmentForm'

import { editEquipment } from '../../resolvers/equipment.resolver'

const EditEquipment = ({ visible, onCancelEditVisible, equipment }) => {

  const onEdit = ({ name, type, description }) => {
    editEquipment(equipment._id, name, type, description);
    window.location.reload();
  };

  return (
    <>
      {equipment && <EditEquipmentForm
        visible={visible}
        equipment={equipment}
        onCreate={onEdit}
        onCancel={() => onCancelEditVisible()}
      />}
    </>
  )
}

export default EditEquipment