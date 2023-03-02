import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Text, useTheme } from '@nextui-org/react';

const BpIcon = styled('span')(({ theme, isdark }) => ({
  borderRadius: '50%',
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
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'var(--primary)',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: 'var(--primary)',
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
    const {isDark} = useTheme();
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon isdark={isDark ? 'true' : 'false'} />}
      icon={<BpIcon isdark={isDark ? 'true' : 'false'} />}
      {...props}
    />
  );
}

export default function CustomRadioGroup(props) {
    const {array, type, handleChangeState} = props;

  return (
    <FormControl sx={{
        textAlign:'center'
        //background:'red'
    }}>
      <FormLabel id="demo-customized-radios" color='primary' sx={{
        //color:'var(--text-color)'
      }}><Text color='$text' b css={{tt:'uppercase'}}>{`Types`}</Text></FormLabel>
      <RadioGroup
      row
        defaultValue={type}
        value={type}
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
        sx={{
            color:'var(--text-color)',
            textAlign:'center',
            mx:'auto',
        }}
        onChange={(e) => {
            console.log("CHANGE radio", e.target.value)
            handleChangeState("type", e.target.value)
        }}
      >
        <FormControlLabel value="all" control={<BpRadio />} label="ALL" />
        {
            array && array.sort((type1, type2) => type1.label.localeCompare(type2.label))
            .map((type, index) => {
                return(
                    <div key={`${type.value}-${index}`}>
                        <FormControlLabel 
                        label={type.label}
                        value={type.value} 
                        control={<BpRadio />}
                         />
                    </div>
                )
            })
        }
      </RadioGroup>
    </FormControl>
  );
}
