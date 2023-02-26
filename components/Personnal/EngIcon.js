import React from 'react';
import { FR, GB, GR, PT } from "country-flag-icons/react/3x2";

export const EngIcon = ({ fill, size, height, width, ...props }) => {
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
    );
  };
  