import { DIR_MIDJOURNEY_DRAFTS, EXT_JPG, EXT_PNG, TEXT_PUBLIC } from '@/constants';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export function getFirstLetterUpperCase(word) {
    if (word)
        return (word.charAt(0).toUpperCase() + word.slice(1));
    return (word);
}

export function getRelativePath(path) {
    if (path.includes(TEXT_PUBLIC)) {
        const length_public = TEXT_PUBLIC.length;
        const index_public = path.indexOf(TEXT_PUBLIC);
        return (path.slice(index_public + length_public));
    }
    return (path);
}

export function getListPictures(array = [], directory = DIR_MIDJOURNEY_DRAFTS) {
    const _array = array;
    const _dir = fs.readdirSync(directory);
    _dir.forEach((item,) => {
        const url = `${directory}/${item}`;
        const isDir = fs.lstatSync(url).isDirectory();
        const isFile = fs.lstatSync(url).isFile();
        if (isDir) {
            getListPictures(_array, url);
        } else if (isFile) {
            if (path.extname(url) === EXT_PNG || path.extname(EXT_JPG)) {
                _array.push(url);
            }
        }
    });
    const _array_relative = [];
    //console.log("OOOOK", _array)
    _array.forEach((item, index) => {
        _array_relative.push(getRelativePath(item));
    })
    //console.log("AAAAIE", _array_relative)
    return ({
        array: _array,
        array_relative: _array_relative,
    });
}

export function getOnePictureFromList(name_image, list) {
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (path.basename(element, path.extname(element)) === name_image) {
            return (element);
        }
    }
    return (null);
}

export function getOnePictureFromListById(id_image, list) {
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (parseInt(element.id) === parseInt(id_image)) {
            return (element);
        }
    }
    return (null);
}

export function getIndexOnePictureFromListById(id_image, list) {
    for (let i = 0; i < list.length; i++) {
        if (parseInt(list[i].id) === parseInt(id_image)) {
            return (i);
        }
    }
    return (-1);
}