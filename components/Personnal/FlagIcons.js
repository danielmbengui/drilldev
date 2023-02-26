import React from 'react';
import { FR, GB, PT } from "country-flag-icons/react/3x2";

export const FlagIcon = ({ fill, size, height, width, lang, ...props }) => {
    function getFlag(_lang) {
        switch (_lang) {
            case "eng":
                return (
                    <GB
        //title={t('langEnglish')}
        style={{
            //cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: 30,
            height: 30
        }}
        />
                )
                case "fr":
                    return (
                        <FR
            //title={t('langEnglish')}
            style={{
                //cursor: 'pointer',
                //border: langage === 'fr' ? '3px solid var(--primary)' : '',
                borderRadius: '50%',
                width: 30,
                height: 30
            }}
            />
                    )
        
                    case "pt":
                return (
                    <PT
        //title={t('langEnglish')}
        style={{
            //cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: 30,
            height: 30
        }}
        />
                )
            default:
                return (
                    <GB
        //title={t('langEnglish')}
        style={{
            //cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: size,
            height: size
        }}
        />
                )
        }
    }
    return (
        <>
        {
            getFlag(lang)
        }
        </>
    );
  };
  