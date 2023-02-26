import Cors from 'cors';
import fs from 'fs';
import initMiddleware from '@/lib/init-middleware';
import { cwd } from 'process';
import path from 'path';
import { getFirstLetterUpperCase, getOnePictureFromList, getRelativePath, getListPictures } from './constants';
import {  DIR_MIDJOURNEY_DATAS, DIR_WEBP, GALLERY_MAX_PICTURES_PER_PAGE, METHOD_GET, METHOD_POST, QUERY_ACTION_GET_LIST_PICTURES, QUERY_PAGE, QUERY_PER_PAGE, QUERY_SEARCH, } from '@/constants';
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const DIR_MIDJOURNEY_DRAFTS = `${serverRuntimeConfig.publicPath}/images/midjourney/drafts`;

const PATH_PICTURES = `${process.cwd()}/public/datas/images/`;
const sharp = require('sharp');

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET and POST
        methods: [METHOD_POST, METHOD_GET],
    })
)


function writeFile(data) {
    if (!fs.existsSync(DIR_MIDJOURNEY_DATAS)) {
        fs.mkdirSync(DIR_MIDJOURNEY_DATAS, { recursive: true });
    }
    fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data3.json", JSON.stringify(data, null, 2));
}


function updateFile() {
    const array = getDataFile();
    const _array = array.map((item,) => {
        const _item = item;
        _item.description = item.title.toLowerCase();
        _item.width = 1024;
        _item.height = 1024;
        return (_item);
    })
    fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data.json", JSON.stringify(getRandomSortPictures(_array), null, 2));
}

function getDataFile() {
    /*
    if (!fs.existsSync(DIR_MIDJOURNEY_DATAS)) {
        fs.mkdirSync(DIR_MIDJOURNEY_DATAS, { recursive: true });
        fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data.json", JSON.stringify([], null, 2));
    }
    */
    const array = require("../../public/pictures/datas/data.json")
    //return JSON.parse(fs.readFileSync(DIR_MIDJOURNEY_DATAS + "/data.json"));
    return (array);
}

function formatTitle(link) {
    var last = -1;
    var word = path.basename(link);
    for (let i = 0; i < 4; i++) {
        last = word.lastIndexOf("-");
        word = word.slice(0, last);
    }
    last = word.lastIndexOf("_");
    word = word.slice(0, last);
    const result = word
        .replaceAll("dambengu_", "")
        .replaceAll("/", " ")
        .replaceAll("_", " ")
        .replaceAll("-", " ")
        .trim()
    //console.log(str.slice(-4)); commence depuis le quatrieme depuis la fin, jusqua la fin
    // Expected output: "dog."

    //console.log(str.slice(-9, -5)); commence depuis le quatrieme depuis la fin, jusquau 5eme depuis la fin
    // Expected output: "lazy"
    return (
        getFirstLetterUpperCase(result)
    )
}


function getAllPictures() {
    const pictures_absolute = getListPictures([], DIR_MIDJOURNEY_DRAFTS).array;
    const pictures = getListPictures([], DIR_MIDJOURNEY_DRAFTS).array_relative;
    //console.log("PIIICTU", pictures)
    if (pictures.length) {
        const array = pictures.map((item, index) => {
            //fs.renameSync(pictures_absolute[index], pictures_absolute[index].replaceAll("dambengu_", ""));
            return (
                {
                    title: formatTitle(item),
                    src: item,
                    src: `https://pictures.drilldev.com/images/midjourney/${path.basename(item).replaceAll("dambengu_", "")}`,
                    //src:`https://ipfs.io/ipfs/Qmc8Pvj2hU7syTZVZWNHFT8dNhZypboTon2ioL6b7V6TXf/mid-journey/${path.basename(item).replaceAll("dambengu_", "")}`,
                    types: ["illustration"],
                    description: formatTitle(item).toLowerCase(),
                    width: 1024,
                    height: 1024,
                }
            )
        })
        //writeFile(array);
        //updateFile();
        return (array);
    }
    return ([]);
}



function getOnePicture(name) {
    return (getOnePictureFromList(name, getAllPictures()))
}

function getRandomSortPictures(_pictures = []) {
    const randomOrder = [];
    const randomPictures = [];
    const min = 0;
    const max = _pictures.length;
    for (let i = 0; i < max; i++) {
      let random = Math.floor(Math.random() * (max - min) + min);
      while (randomOrder.includes(random)) {
        random = Math.floor(Math.random() * (max - min) + min);
      }
      const element = _pictures[random];
      randomOrder.push(random);
      randomPictures.push(element);
    }
  
    return randomPictures; // The maximum is exclusive and the minimum is inclusive
  }

/*
function getPicturesFile() {
    if (!fs.existsSync(PATH_PICTURES)) {
        fs.mkdirSync(PATH_PICTURES, { recursive: true });
        fs.writeFileSync(PATH_FILE_CRYPTO_CURRENCIES, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(PATH_FILE_CRYPTO_CURRENCIES));
}
*/
function getListPicturesBySearch(search, page, per_page) {
    const array = getDataFile();
    const searchs = array.filter((item) => {
        if (item.title.toLowerCase().includes(search.toLowerCase())) {
            return (item);
        }
    });
    const totalPage = Math.ceil(searchs.length / per_page);
    const _page = parseInt(page) > totalPage ? 1 : parseInt(page);
    const _per_page = parseInt(per_page);
    const min = (_page - 1) * _per_page;
    const max = (_page) * _per_page;
    const hasNext = searchs[max] ? _page + 1 : null;
    const pictures = searchs.filter((item, index) => {
        if (index >= min && index < max) {
            return (item);
        }
    });
    //console.log("ARRAY", array, array.length);
    return ({
        search: search,
        page: _page,
        per_page: _per_page,
        next_page: hasNext,
        total_page: totalPage,
        length: pictures.length,
        total_length: searchs.length,
        list: pictures,
    });
}

function convertToWebp() {
    const pictures_absolute = getListPictures([], DIR_MIDJOURNEY_DRAFTS).array;
console.log("size tab", pictures_absolute.length)
    for (let i = 0; i < pictures_absolute.length; i++) {
        const element = pictures_absolute[i];
        
        const output = path.basename(element, ".png")
        .replaceAll("dambengu__", "")
        .replaceAll("dambengu_", "")
        .replaceAll("Drill_Dev__", "")
        .replaceAll("Drill_Dev_", "")
        .trim()
        sharp(element)
  //.resize(320, 240)
  .webp({ 
    quality:40,
    //lossless: true 
})
  .toFile(`${DIR_WEBP}/${output}.webp`);
    }
    
  
}

export default async function handler(req, res) {
    // Run cors
    await cors(req, res);

    try {
        //console.log("API", "access to the API \n");
        if (req.method === METHOD_GET) {
            if (req.query.action === "get_all") {
                //console.log("GET_ALL", `${req.query.action}\n`);
                const array = getAllPictures();
                //console.log("ARRAY", `${array.length}\n`);
                return res.status(200).json({ msg: array.length ? "Success" : "Error", files: array, length: array.length, });
                //return res.status(200).json({ msg: "Success", files: [], length: 0, });
            } else if (req.query.action === QUERY_ACTION_GET_LIST_PICTURES) {
                const search = req.query[QUERY_SEARCH] ? req.query[QUERY_SEARCH] : '';
                const page = req.query[QUERY_PAGE] ? req.query[QUERY_PAGE] : 1;
                const per_page = req.query[QUERY_PER_PAGE] ? req.query[QUERY_PER_PAGE] : GALLERY_MAX_PICTURES_PER_PAGE;
                const array = getListPicturesBySearch(search, page, per_page);
                return res.status(200).json({
                    msg: array.length ? "Success" : "Error",
                    result:array,
                });
            } else if (req.query.action === "update_file") {
                updateFile();
                return res.status(200).json({ msg: "Success"});
            }
            else if (req.query.action === "get_one" && req.query.name) {
                const one = getOnePicture(req.query.name);
                return res.status(200).json({ msg: one ? "Success" : "Error", file: one, });
            }else if (req.query.action === "convert" ) {
                //const one = getOnePicture(req.query.name);
                convertToWebp();
                return res.status(200).json({ msg: "Success"});
            }

            
        }

        //const array_relative = getListDraftPictures().array_relative;
        //const one = getOneDraftPictures(path_file, array);
        //const one_relative = getOneDraftPictures(path_file, array_relative);

        //console.log("COOOPY", `${cwd()}/public/pictures/images/${path.basename(one)}`)
        return res.status(400).json({ msg: "Error 400", });
        //console.log("tab", tabCryptoCurrencies);
        //console.log("result", response);
    } catch (error) {
        console.log("ERROR", error);
        return res.status(405).json({ msg: "Error 405", error: error });
    }

}