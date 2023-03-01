import * as React from 'react';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@nextui-org/react';
import FormControlLabel from '@mui/material/FormControlLabel';

const BpIcon = styled('span')(({ theme, isdark }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    isdark === "true"
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: isdark === "true" ? '#394b59' : '#f5f8fa',
  backgroundImage:
    isdark === "true"
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: isdark === "true" ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      isdark === "true" ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
  'label:disabled ~ &': {
    color: 'red',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'var(--primary)',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: 'var(--primary)',
  },
});

// Inspired by blueprintjs
function BpCheckbox(props) {
  const {isDark} = useTheme();

  const {value} = props;

  return (
    <FormControlLabel
          value={value}
          
          control={<Checkbox
            //value="checkedA"
            //defaultChecked={defaultChecked}
            
            //checked={checked}
            inputProps={{
              'aria-label': value,
            }}
            sx={{
              '&:hover': { bgcolor: 'transparent' },
            }}
            disableRipple
            label="ok"
            color="default"
            checkedIcon={<BpCheckedIcon isdark={isDark ? "true" : "false"} />}
            icon={<BpIcon isdark={isDark ? "true" : "false"} />}
            {...props}
          />}
          
          label={value}
          labelPlacement="end"
          sx={{
            color:'var(--text-color)',
            "& .MuiFormControlLabel-root": {
              color:'yellow',
              "&:disabled":{
                color:'red'
              }
            },
            "& .Mui-disabled": {
              color:'red'
            }

            
          }}
          
        />
    
  );
}

export default function CustomCheckBox(props) {
  const {value, defaultChecked} = props;
  return (
    <div>
      <BpCheckbox 
      value={value} 
      //checked={checked}
      defaultChecked={defaultChecked}
      />
    </div>
  );
}