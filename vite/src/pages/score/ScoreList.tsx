import {useEffect} from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel'; // Add this import
import FormControl from '@mui/material/FormControl'; // Add this import
import { useState } from 'react';

export function ScoreListOption({ data, toggleRoleId, optionValue }:any) {
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
      <InputLabel>Choose Score</InputLabel>
      <Select
        value={id}
        onChange={handleChange}
        label="Choose Studen"
        required>
        <MenuItem value={''}>None</MenuItem>
        {data.map((item: any) => (
          <MenuItem key={item.score_id} value={item.score_id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const totalScore = () => {
   
}

