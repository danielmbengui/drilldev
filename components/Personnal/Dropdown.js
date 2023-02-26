import React, {useState, useMemo, useEffect} from "react";
import { Dropdown } from "@nextui-org/react";
import { FR, GB, GR, PT } from "country-flag-icons/react/3x2";
import { Container, Card, Row, Text, Link, Grid, Avatar } from "@nextui-org/react";
import { EngIcon } from "./EngIcon";
import { FlagIcon } from "./FlagIcons";
import { DEFAULT_LANGAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, TAB_LANGAGES } from "@/constants";
import { getLangageStorage } from "@/lib/storage/UserStorageFunctions";
import { useTranslation } from "next-i18next";
import { getFirstLetterUpperCase } from "@/pages/api/constants";

/**
 <GB
        title={t('langEnglish')}
        style={{
            cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: sizeFlag - 5,
            height: sizeFlag - 5
        }}
        />
 */
function convertSelected(selected) {
  return(Array.from(selected).join("").replaceAll("_", " "));
}
export default function DropdownCustom(props) {
  const {t} = useTranslation();
  const {lang, setLang} = props;
  const [selected, setSelected] = useState(new Set([lang]));
  

  const selectedValue = useMemo(() => {
    const _lang = Array.from(selected).join("").replaceAll("_", " ");
    console.log("SELECVALUE INIT", _lang)
    //setLang(_lang);
    return(_lang);
  },[selected]);
  

  useEffect(() => {
    if(lang) {
      setSelected(new Set([lang]));
    console.log("TEST", new Set([lang]))
    }
    //console.log("SELECTE lang", selected, selectedValue, lang)
    //setSelected(selectedValue);
    //setLang('fr');
    //setSelected(lang);
    
  }, [lang])
  
  useEffect(() => {
    //console.log("SELECTE lang", selected, selectedValue, lang)
    //setSelected(selectedValue);
    //const _lang = convertSelected(selected);
      //setLang(selectedValue);
      //setSelected(lang);
      console.log("LAAAANG",selectedValue)
    //setSelected(lang);
    
  }, [selected])

  const onChangeLang = (e) => {
    const _lang = e.values().next().value;
    setSelected(e);
    setLang(_lang);
    console.log("Change lang",e.values().next().value)
  }

  return (
    <Dropdown>
      <Dropdown.Button bordered size={"md"} css={{ tt: "uppercase", verticalAlign:'middle' }}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        size="lg"
        disabledKeys={["title",]}
        color="primary"
        css={{
            backgroundColor:"$accents0"
        }}
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={onChangeLang}
      >
        <Dropdown.Section title={getFirstLetterUpperCase(t('languages', {ns:NAMESPACE_LANGAGE_COMMON}))}>
        <Dropdown.Item key={LANGAGE_FRENCH}  command="⌘F" icon={
              <FlagIcon size={30} lang={LANGAGE_FRENCH} />
            }>
        {t('langFrench', {ns:NAMESPACE_LANGAGE_COMMON})}
        </Dropdown.Item>   
        <Dropdown.Item key={LANGAGE_ENGLISH} command="⌘E" icon={
              <FlagIcon size={30} lang={LANGAGE_ENGLISH} />
            }>
        {t('langEnglish', {ns:NAMESPACE_LANGAGE_COMMON})}
        </Dropdown.Item>
        <Dropdown.Item key={LANGAGE_PORTUGUESE} command="⌘P" icon={
              <FlagIcon size={30} lang={LANGAGE_PORTUGUESE} />
            }>
        {t('langPortuguese', {ns:NAMESPACE_LANGAGE_COMMON})}
        </Dropdown.Item>
        {
            /**
             <Dropdown.Item key="number">Number</Dropdown.Item>
        <Dropdown.Item key="date">Date</Dropdown.Item>
        <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
        <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
             */
        }
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
}
