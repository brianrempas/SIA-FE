import {useEffect} from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel'; // Add this import
import FormControl from '@mui/material/FormControl'; // Add this import
import { useState } from 'react';

export function SubjectListOption({ data, toggleRoleId, optionValue }:any) {
  const [id, setId] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setId(event.target.value);
    toggleRoleId(event.target.value);
  };


  useEffect(() => {
    if(optionValue) {
      setId(optionValue)
    }
  }, []);

  return (
    <FormControl sx={{ minWidth: 320 }}>
      <InputLabel>Choose Subject</InputLabel>
      <Select
        value={id}
        onChange={handleChange}
        label="Choose Subjec"
        required>
        <MenuItem value={''}>None</MenuItem>
        {data.map((item: any) => (
          <MenuItem key={item.subject_id} value={item.subject_id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function SubjectListOptionSelected({ data, toggleRoleId, optionValue, selectedProdiId }: any) {
  const [id, setId] = useState('');
  
  const handleChange = (event: SelectChangeEvent) => {
    setId(event.target.value);
    toggleRoleId(event.target.value);
  };

  useEffect(() => {
    if (optionValue) {
      setId(optionValue);
    }
  }, [optionValue]);

  // Filter the data based on selectedProdiId
  const filteredData = selectedProdiId
    ? data.filter((item: any) => item.idProdi === selectedProdiId)
    : data;

    
    console.log(filteredData)
  return (
    <FormControl sx={{ minWidth: 320 }}>
      <InputLabel>Choose Subject</InputLabel>
      <Select value={id} onChange={handleChange} label="Choose Subject" required>
        <MenuItem value={''}>None</MenuItem>
        {filteredData.map((item: any) => (
          <MenuItem key={item.subject_id} value={item.subject_id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

//how do i make that menu only be added depends on a parameters match with the data's idProdi
