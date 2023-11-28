import {useEffect} from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel'; // Add this import
import FormControl from '@mui/material/FormControl'; // Add this import
import { useState } from 'react';

export function LectureListOption({ data, toggleRoleId, optionValue }:any) {
  const [id, setId] = useState('');

  // name email yearIn lectureId employeeId 

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
      <InputLabel>Choose Lecture</InputLabel>
      <Select
        value={id}
        onChange={handleChange}
        label="Choose Lectur"
        required>
        <MenuItem value={''}>None</MenuItem>
        {data.map((item: any) => (
          <MenuItem key={item.lecture_id} value={item.lecture_id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
