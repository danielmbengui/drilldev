import React from 'react';
import { FR, GB, PT } from "country-flag-icons/react/3x2";
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE } from '@/constants';

export const FlagIcon = ({ fill, size, height, width, lang, ...props }) => {
    function getFlag(_lang) {
        switch (_lang) {
            case LANGAGE_ENGLISH:
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
                case LANGAGE_FRENCH:
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
        
                    case LANGAGE_PORTUGUESE:
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
  