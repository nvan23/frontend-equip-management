import React, { useState } from 'react';

import {
  AutoComplete,
} from 'antd';

const AutoCompleteInput = ({ placeholder, arrData, onSelectValue }) => {
  const onSelect = (value, option) => {
    onSelectValue(option.id)
  };

  return (
    <AutoComplete
      allowClear
      options={arrData}
      dropdownMatchSelectWidth={300}
      placeholder={placeholder}
      onSelect={onSelect}
      notFoundContent='No equipment.'
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  );
};

export default AutoCompleteInput