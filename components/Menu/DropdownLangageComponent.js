import React from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'next-i18next';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON } from '@/constants';
import { FlagIcon } from '../Personnal/FlagIcons';
import { InputBase, Stack } from '@mui/material';
import { updateLangageStorage } from '@/lib/storage/UserStorageFunctions';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: '0px',
    },
    '& .MuiInputBase-input': {
        borderRadius: 15,
        position: 'relative',
        backgroundColor: 'transparent',
        border: '1px solid var(--primary)',
        fontSize: 14,
        //padding: '5px 26px 5px 12px',
        //py:'5px',
        //px:'5px',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '1px',
        paddingBottom: '1px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 15,
            //borderColor: 'var(--primary)',
            border: '2px solid var(--primary)'
            //boxShadow: '0 0 0 0.2rem var(--primary)',
        },
    },
}));


const styleSelect = {
    ".MuiSelect-icon": {
        color: 'var(--primary)'
    },
    ".MuiSelect-select": {
        //borderColor:'var(--primary)',
        color: 'var(--primary)',
        fontWeight: 'bold',
        fontSize: 14,
        height: 20,
        background: 'transparent',
        //borderWidth:'1px',
        //borderRadius:5,
        border: '2px solid var(--primary)'
        //boxShadow:'none'
    },
};

const styleMenu = {
    '.MuiList-root': {
        //backgroundColor: 'red', // ou la couleur de fond que vous souhaitez utiliser
        backgroundColor: 'var(--accents5)', // ou la couleur de fond que vous souhaitez utiliser
    },
    '.MuiMenuItem-root': {
        //backgroundColor:'yellow',
        "&:hover, &:focus": {
            background: 'var(--primary)',
            color: 'black'
        },
    }
};

const langs = [
    { value: LANGAGE_FRENCH, text: 'langFrench' },
    { value: LANGAGE_ENGLISH, text: 'langEnglish' },
    { value: LANGAGE_PORTUGUESE, text: 'langPortuguese' },
]

export default function DropdownLangageComponent({ lang, setLang }) {
    const { t, i18n } = useTranslation();

    const onChangeLanguage = (_lang) => {
        setLang(_lang);
        i18n.changeLanguage(_lang);
        updateLangageStorage(_lang);
        document.documentElement.setAttribute('lang', _lang);
      };

    return (
        <FormControl sx={{ m: 1, }} variant="standard" size='small'>
        <Select
            aria-label='Select langage'
            id="select-langage"
            value={lang}
            autoWidth
            onChange={(e) => {
                onChangeLanguage(e.target.value)
            }}
            input={<BootstrapInput />}
            sx={styleSelect}
            MenuProps={{
                sx: styleMenu,
            }}
        >
            {
                langs.map((lang, index) => {
                    return (
                        <MenuItem key={`${lang}-${index}`} value={lang.value}>
                            <Stack direction={'row'} alignItems={'center'} spacing={1} sx={{
                            }}>
                                <FlagIcon size={30} lang={lang.value} />
                                <div style={{
                                    textTransform:'uppercase'
                                }}>{lang.value}</div>
                            </Stack>
                        </MenuItem>
                    )
                })
            }
        </Select>
    </FormControl>
    );
}