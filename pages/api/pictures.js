import Cors from 'cors';
import fs from 'fs';
import initMiddleware from '@/lib/init-middleware';
import path from 'path';
import { GALLERY_MAX_PICTURES_PER_PAGE, METHOD_GET, METHOD_POST, QUERY_ACTION_GET_LIST_PICTURES, QUERY_PAGE, QUERY_PER_PAGE, QUERY_SEARCH, QUERY_TYPE, } from '@/constants';

const rootDirectoryPath = path.resolve(process.cwd());

const DIR_MIDJOURNEY_DATAS = `${rootDirectoryPath}/public/images/midjourney/datas`;

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET and POST
        methods: [METHOD_POST, METHOD_GET],
    })
)

function getDataFile() {

    if (!fs.existsSync(DIR_MIDJOURNEY_DATAS)) {
        fs.mkdirSync(DIR_MIDJOURNEY_DATAS, { recursive: true });
        fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data.json", JSON.stringify([], null, 2));
    }
    //const array = require("../../public/images/midjourney/datas/data.json")
    return JSON.parse(fs.readFileSync(DIR_MIDJOURNEY_DATAS + "/data.json"));
    //return (array);
}

function getListPicturesBySearch(type, search, page, per_page) {
    const array = getDataFile();
    const types = array.filter((item) => {
        if (type === 'all') {
            return (item);
        } else if (item.types.includes(type)) {
            return (item);
        }
    });
    const searchs = types.filter((item) => {
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
        type:type,
        page: _page,
        per_page: _per_page,
        next_page: hasNext,
        total_page: totalPage,
        length: pictures.length,
        total_length: searchs.length,
        list: pictures,
    });
}

export default async function handler(req, res) {
    // Run cors
    await cors(req, res);

    try {
        //console.log("API", "access to the API \n");
        if (req.method === METHOD_GET) { 
            if (req.query.action === QUERY_ACTION_GET_LIST_PICTURES) {
                const type = req.query[QUERY_TYPE] ? req.query[QUERY_TYPE] : '';
                const search = req.query[QUERY_SEARCH] ? req.query[QUERY_SEARCH] : '';
                const page = req.query[QUERY_PAGE] ? req.query[QUERY_PAGE] : 1;
                const per_page = req.query[QUERY_PER_PAGE] ? req.query[QUERY_PER_PAGE] : GALLERY_MAX_PICTURES_PER_PAGE;
                const array = getListPicturesBySearch(type, search, page, per_page);
                return res.status(200).json({
                    msg: array ? "Success" : "Error",
                    result: array,
                });
            }
        }
    return res.status(400).json({ msg: "Error 400", });
} catch (error) {
    return res.status(405).json({ msg: "Error 405", error: error });
}
}
/*
import { getFirstLetterUpperCase, getOnePictureFromList, getRelativePath, getListPictures, getOnePictureFromListById, getIndexOnePictureFromListById } from './constants';
import { EXTENSION_JPG, EXTENSION_PNG, EXTENSION_WEBP, GALLERY_MAX_PICTURES_PER_PAGE, HIGH_RESOLUTION, LOW_RESOLUTION, METHOD_GET, METHOD_POST, QUERY_ACTION_GET_LIST_PICTURES, QUERY_PAGE, QUERY_PER_PAGE, QUERY_SEARCH, QUERY_TYPE, WEBSITE_NAME, WEBSITE_PICTURES_ADDRESS, } from '@/constants';
const publicDirectoryPath = path.join(__dirname, 'public');
const rootDirectoryPath = path.resolve(process.cwd());
const DIR_MIDJOURNEY_DRAFTS = path.join(rootDirectoryPath, 'public', 'images', 'midjourney', 'drafts');
const DIR_MIDJOURNEY_DATAS = `${rootDirectoryPath}/public/images/midjourney/datas`;
const DIR_PNG_HIGH_RESOLUTION = `${rootDirectoryPath}/public/images/midjourney/png/high_resolution`;
const DIR_PNG_LOW_RESOLUTION = `${rootDirectoryPath}/public/images/midjourney/png/low_resolution`;
const DIR_JPG_HIGH_RESOLUTION = `${rootDirectoryPath}/public/images/midjourney/jpg/high_resolution`;
const DIR_JPG_LOW_RESOLUTION = `${rootDirectoryPath}/public/images/midjourney/jpg/low_resolution`;
const DIR_WEBP_HIGH_RESOLUTION = `${rootDirectoryPath}/public/images/midjourney/webp/high_resolution`;
const DIR_WEBP_LOW_RESOLUTION = `${rootDirectoryPath}/public/images/midjourney/webp/low_resolution`;
const DIR_WEBP = `${rootDirectoryPath}/public/images/midjourney/webp`;


const PATH_PICTURES = `${process.cwd()}/public/datas/images/`;
const sharp = require('sharp');
function writeFile(data) {
    if (!fs.existsSync(DIR_MIDJOURNEY_DATAS)) {
        fs.mkdirSync(DIR_MIDJOURNEY_DATAS, { recursive: true });
    }
    fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data.json", JSON.stringify(data, null, 2));
}


function updateFile() {
    const array = getDataFile();
    const _array = array.map((item,) => {
        const _item = item;
        //_item.src = item.title.toLowerCase();
        _item.src = `${WEBSITE_PICTURES_ADDRESS}/images/midjourney/WEBP/low_resolution/${path.basename(item.src, '.png').replaceAll("dambengu_", "").replaceAll("Drill_Dev_", "")}.webp`;

        //_item.width = 1024;
        //_item.height = 1024;
        return (_item);
    })
    //fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data.json", JSON.stringify(getRandomSortPictures(_array), null, 2));
    writeFile(_array);
}

function getDataFileOrigin() {

    if (!fs.existsSync(DIR_MIDJOURNEY_DATAS)) {
        fs.mkdirSync(DIR_MIDJOURNEY_DATAS, { recursive: true });
        fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data_origin.json", JSON.stringify([], null, 2));
    }
    //const array = require("../../public/images/midjourney/datas/data.json")
    return JSON.parse(fs.readFileSync(DIR_MIDJOURNEY_DATAS + "/data_origin.json"));
    //return (array);
}




function getDataPaths() {
    
    if (!fs.existsSync(DIR_MIDJOURNEY_DATAS)) {
        fs.mkdirSync(DIR_MIDJOURNEY_DATAS, { recursive: true });
        fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data.json", JSON.stringify([], null, 2));
    }
    

    //const array = require("../../public/images/midjourney/datas/data.json");
    const array = getDataFile();
    const filtered = [];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        filtered.push(parseInt(element.id));
    }
    //return JSON.parse(fs.readFileSync(DIR_MIDJOURNEY_DATAS + "/data.json"));
    return (filtered);
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
        .replaceAll("dambengu__", "")
        .replaceAll("dambengu_", "")
        .replaceAll("Drill_Dev__", "")
        .replaceAll("Drill_Dev_", "")
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

function formatExtensionImage(imagePath, toExtension = 'webp', resolution = 'high_resolution') {
    const actualExtension = path.extname(imagePath);
    const srcImage = `${WEBSITE_PICTURES_ADDRESS}/images/midjourney/${toExtension.toString().toUpperCase()}/${resolution.toString().toLowerCase()}`;
    return `${srcImage}/gallery/${path.basename(imagePath, `${actualExtension}`)
        .replaceAll("dambengu__", "")
        .replaceAll("dambengu_", "")
        .replaceAll("Drill_Dev__", "")
        .replaceAll("Drill_Dev_", "")}.${toExtension}`;
}


function addPicturesFromDrafts() {
    const pictures_absolute = getListPictures([], DIR_MIDJOURNEY_DRAFTS).array;
    const pictures = getListPictures([], DIR_MIDJOURNEY_DRAFTS).array_relative;
    //console.log("PIIICTU", pictures)
    
    if (pictures.length) {
        const array = pictures.map((item, index) => {
            fs.renameSync(pictures_absolute[index], pictures_absolute[index].replaceAll("dambengu_", ""));
            return (
                {
                    id: -1,
                    title: formatTitle(item),
                    //src: item,
                    src: formatExtensionImage(item, "webp", "high_resolution"),
                    src_png_high_resolution: formatExtensionImage(item, "png", "high_resolution"),
                    src_png_low_resolution: formatExtensionImage(item, "png", "low_resolution"),
                    src_jpg_high_resolution: formatExtensionImage(item, "jpg", "high_resolution"),
                    src_jpg_low_resolution: formatExtensionImage(item, "jpg", "low_resolution"),
                    src_webp_high_resolution: formatExtensionImage(item, "webp", "high_resolution"),
                    src_webp_low_resolution: formatExtensionImage(item, "webp", "low_resolution"),
                    //src:`https://ipfs.io/ipfs/Qmc8Pvj2hU7syTZVZWNHFT8dNhZypboTon2ioL6b7V6TXf/mid-journey/${path.basename(item).replaceAll("dambengu_", "")}`,
                    types: [],
                    description: formatTitle(item).toLowerCase(),
                    prompt: '',
                    style: 'illustration',
                    width: 1024,
                    height: 1024,
                }
            )
        })
        const actualData = getDataFile().sort((item1, item2) => item1.id - item2.id);
        const lastId = parseInt(actualData[actualData.length - 1].id) + 1;
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            element.id = lastId + i;
            actualData.push(element);
        }
        writeFile(actualData);
        return (array); // new datas added
    }
    return (null);
}

function updateAllPictures() {

    const array = getDataFile();
    array.map((item, index) => {
        //fs.renameSync(pictures_absolute[index], pictures_absolute[index].replaceAll("dambengu_", ""));
        item.src = formatExtensionImage(item.src, 'webp', 'high_resolution');
        item.src_png_high_resolution = formatExtensionImage(item.src, 'png', 'high_resolution');
        item.src_png_low_resolution = formatExtensionImage(item.src, 'png', 'low_resolution');
        item.src_jpg_high_resolution = formatExtensionImage(item.src, 'jpg', 'high_resolution');
        item.src_jpg_low_resolution = formatExtensionImage(item.src, 'jpg', 'low_resolution');
        item.src_webp_high_resolution = formatExtensionImage(item.src, 'webp', 'high_resolution');
        item.src_webp_low_resolution = formatExtensionImage(item.src, 'webp', 'low_resolution');
        item.prompt = '';
        item.style = 'illustration';
        item.types = [];
    })
    writeFile(array);
    //updateFile();
    return (array);
}

function getOnePictureById(id) {
    return (getOnePictureFromListById(id, getDataFile()))
}

function editOnePictureById(id, title, description, types) {
    const array = getDataFile();
    var picture = getOnePictureFromListById(id, array);
    
    if (picture) {
        picture.title = title ? title : picture.title;
        picture.description = description ? description : picture.description;
        picture.types = types ? types : picture.types;
        const indexPicture = getIndexOnePictureFromListById(id, array);
        array[indexPicture] = picture;
        writeFile(array);
        return (getOnePictureFromListById(id, getDataFile()))
    }
    return (null)
}

function editMultipleTypePictureByIds(ids, types) {
    const array = getDataFile();
    const arrayEdited = [];
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        var picture = getOnePictureFromListById(id, array);
        if (picture) {
            for (let i = 0; i < types.length; i++) {
                const type = types[i];
                if (!picture.types.includes(type)) {
                    picture.types.push(type);
                }
            }
            const indexPicture = getIndexOnePictureFromListById(id, array);
            array[indexPicture] = picture;
            arrayEdited.push(picture);
        }
    }
    writeFile(array);
    return (arrayEdited);
}

function randomizeFilePicture() {
    const array = getDataFile();
    const randomOrder = [];
    const randomPictures = [];
    const min = 0;
    const max = array.length;
    for (let i = 0; i < max; i++) {
      let random = Math.floor(Math.random() * (max - min) + min);
      while (randomOrder.includes(random)) {
        random = Math.floor(Math.random() * (max - min) + min);
      }
      const element = array[random];
      randomOrder.push(random);
      randomPictures.push(element);
    }
    
    if (!fs.existsSync(DIR_MIDJOURNEY_DATAS)) {
        fs.mkdirSync(DIR_MIDJOURNEY_DATAS, { recursive: true });
    }
    fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data.json", JSON.stringify(randomPictures, null, 2));
    //updateFileToOrigin();    
    return randomPictures; // The maximum is exclusive and the minimum is inclusive
}

function updateFileToOrigin() {
    const array = getDataFile();
    const arrayOrigin = array.sort((item1, item2) => item1.id - item2.id)
    .map((item) => {
        return(item);
    })
    fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data.json", JSON.stringify(arrayOrigin, null, 2));
}

function createFileOrigin() {
    const array = getDataFile();
    const arrayOrigin = array.sort((item1, item2) => item1.id - item2.id)
    .map((item) => {
        return(item);
    })
    fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data_origin.json", JSON.stringify(arrayOrigin, null, 2));
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

function getPicturesFile() {
    if (!fs.existsSync(PATH_PICTURES)) {
        fs.mkdirSync(PATH_PICTURES, { recursive: true });
        fs.writeFileSync(PATH_FILE_CRYPTO_CURRENCIES, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(PATH_FILE_CRYPTO_CURRENCIES));
}

function formatExtensionImageLocal(imagePath) {
    const actualExtension = path.extname(imagePath);
    const output = path.basename(imagePath, actualExtension)
        .replaceAll("dambengu__", "")
        .replaceAll("dambengu_", "")
        .replaceAll("Drill_Dev__", "")
        .replaceAll("Drill_Dev_", "");
    //const outputFinal = path.join(DIR_PNG_LOW_RESOLUTION, `${output}.${toExtension}`);

    return (output);
}

async function convertDraftsPictures(toExtension = 'png', resolution = 'high_resolution') {
    const pictures_absolute = getListPictures([], DIR_MIDJOURNEY_DRAFTS).array;
    const lowResolutionPng = {
        palette: true,
        quality: 50,
    }
    const highResolution = {
        quality: 100,
    }
    const lowResolution = {
        quality: 50,
    }
    const copyright = {
        exif: {
            IFD0: {
                Copyright: WEBSITE_NAME,
            }
        }
    };
    for (let i = 0; i < pictures_absolute.length; i++) {
        const element = pictures_absolute[i];
        const output = formatExtensionImageLocal(element, toExtension, resolution);

        if (toExtension === EXTENSION_PNG) {
            if (resolution === HIGH_RESOLUTION) {
                if (!fs.existsSync(DIR_PNG_HIGH_RESOLUTION)) {
                    fs.mkdirSync(DIR_PNG_HIGH_RESOLUTION, { recursive: true });
                }

                fs.copyFile(element, path.join(DIR_PNG_HIGH_RESOLUTION, `${output}.png`), async (err) => { });
            } else if (resolution === LOW_RESOLUTION) {
                if (!fs.existsSync(DIR_PNG_LOW_RESOLUTION)) {
                    fs.mkdirSync(DIR_PNG_LOW_RESOLUTION, { recursive: true });
                }

                await sharp(element)
                    .withMetadata(copyright)
                    //.resize(320, 240)
                    .png(lowResolutionPng)
                    .toFile(output);
            }
        } else if (toExtension === EXTENSION_JPG) {
            const _resolution = resolution === HIGH_RESOLUTION ? highResolution : lowResolution;
            const _dir = resolution === HIGH_RESOLUTION ? DIR_JPG_HIGH_RESOLUTION : DIR_JPG_LOW_RESOLUTION;
            if (!fs.existsSync(_dir)) {
                fs.mkdirSync(_dir, { recursive: true });
            }
            await sharp(element)
                .withMetadata(copyright)
                //.resize(320, 240)
                .jpeg(_resolution)
                .toFile(output);
        } else if (toExtension === EXTENSION_WEBP) {
            const _resolution = resolution === HIGH_RESOLUTION ? highResolution : lowResolution;
            const _dir = resolution === HIGH_RESOLUTION ? DIR_WEBP_HIGH_RESOLUTION : DIR_WEBP_LOW_RESOLUTION;
            if (!fs.existsSync(_dir)) {
                fs.mkdirSync(_dir, { recursive: true });
            }
            await sharp(element)
                .withMetadata(copyright)
                //.resize(320, 240)
                .webp(_resolution)
                .toFile(output);
        }
    }
}

async function convertToWebp() {
    const pictures_absolute = getListPictures([], DIR_MIDJOURNEY_DRAFTS).array;
    console.log("size tab", pictures_absolute.length)
    const copyright = {
        exif: {
            IFD0: {
                Copyright: WEBSITE_NAME,
            }
        }
    };

    if (!fs.existsSync(DIR_PNG_HIGH_RESOLUTION)) {
        fs.mkdirSync(DIR_PNG_HIGH_RESOLUTION, { recursive: true });
    }

    //for (let i = 0; i < pictures_absolute.length; i++) {
    pictures_absolute.map(async (element, i) => {
        //const element = pictures_absolute[i];
            const output = formatExtensionImageLocal(element);

        await sharp(element)
        .withMetadata(copyright)
        .resize(2048, 2048)
        .png({
            palette: true,
            //quality: 100, //high_resolution / default 80
            quality: 100, //low_resolution / default 80
            //alphaQuality:100, //high_resolution && low_resolution / default 100
            //lossless: true 
        })
        .toFile(path.join(DIR_PNG_HIGH_RESOLUTION, `${output}.png`));
        console.log(`${i} - ${path.join(DIR_PNG_HIGH_RESOLUTION, `${output}.png`)} :`, `converted with success !`)

        if (!fs.existsSync(DIR_PNG_LOW_RESOLUTION)) {
            fs.mkdirSync(DIR_PNG_LOW_RESOLUTION, { recursive: true });
        }

        fs.copyFile(element, path.join(DIR_PNG_HIGH_RESOLUTION, `${output}.png`), async (err) => {
            if (!err) {
                await sharp(element)
                    .withMetadata(copyright)
                    .resize(2048, 2048)
                    .png({
                        palette: true,
                        //quality: 100, //high_resolution / default 80
                        quality: 100, //low_resolution / default 80
                        //alphaQuality:100, //high_resolution && low_resolution / default 100
                        //lossless: true 
                    })
                    .toFile(path.join(DIR_PNG_HIGH_RESOLUTION, `${output}.png`));
            }
        });


        if (!fs.existsSync(DIR_JPG_HIGH_RESOLUTION)) {
            fs.mkdirSync(DIR_JPG_HIGH_RESOLUTION, { recursive: true });
        }


        if (!fs.existsSync(DIR_JPG_LOW_RESOLUTION)) {
            fs.mkdirSync(DIR_JPG_LOW_RESOLUTION, { recursive: true });
        }

        await sharp(element)
            .withMetadata(copyright)
            //.resize(320, 240)
            .jpeg({
                quality: 100, //high_resolution / default 80
                //quality: 50, //low_resolution / default 80
                //alphaQuality:100, //high_resolution && low_resolution / default 100
                //lossless: true 
            })
            .toFile(path.join(DIR_JPG_HIGH_RESOLUTION, `${output}.jpg`));

        await sharp(element)
            .withMetadata(copyright)
            //.resize(320, 240)
            .jpeg({
                //quality: 100, //high_resolution / default 80
                quality: 50, //low_resolution / default 80
                //alphaQuality:100, //high_resolution && low_resolution / default 100
                //lossless: true 
            })
            .toFile(path.join(DIR_JPG_LOW_RESOLUTION, `${output}.jpg`));

        if (!fs.existsSync(DIR_WEBP_HIGH_RESOLUTION)) {
            fs.mkdirSync(DIR_WEBP_HIGH_RESOLUTION, { recursive: true });
        }

        if (!fs.existsSync(DIR_WEBP_LOW_RESOLUTION)) {
            fs.mkdirSync(DIR_WEBP_LOW_RESOLUTION, { recursive: true });
        }

        await sharp(element)
            .withMetadata(copyright)
            //.resize(320, 240)
            .webp({
                quality: 100, //high_resolution / default 80
                //quality: 50, //low_resolution / default 80
                //alphaQuality:100, //high_resolution && low_resolution / default 100
                //lossless: true 
            })
            .toFile(path.join(DIR_WEBP_HIGH_RESOLUTION, `${output}.webp`));

        await sharp(element)
            .withMetadata(copyright)
            //.resize(320, 240)
            .webp({
                //quality: 100, //high_resolution / default 80
                quality: 50, //low_resolution / default 80
                //alphaQuality:100, //high_resolution && low_resolution / default 100
                //lossless: true 
            })
            .toFile(path.join(DIR_WEBP_LOW_RESOLUTION, `${output}.webp`));
            
    });
}
*/
/*
export default async function handler(req, res) {
    // Run cors
    await cors(req, res);

    try {
        //console.log("API", "access to the API \n");
        if (req.method === METHOD_GET) { 
            if (req.query.action === QUERY_ACTION_GET_LIST_PICTURES) {
                const type = req.query[QUERY_TYPE] ? req.query[QUERY_TYPE] : '';
                const search = req.query[QUERY_SEARCH] ? req.query[QUERY_SEARCH] : '';
                const page = req.query[QUERY_PAGE] ? req.query[QUERY_PAGE] : 1;
                const per_page = req.query[QUERY_PER_PAGE] ? req.query[QUERY_PER_PAGE] : GALLERY_MAX_PICTURES_PER_PAGE;
                const array = getListPicturesBySearch(type, search, page, per_page);
                return res.status(200).json({
                    msg: array ? "Success" : "Error",
                    result: array,
                });
            }

 if (req.query.action === "get_ids") {
                //console.log("GET_ALL", `${req.query.action}\n`);
                const array = getDataPaths();
                //console.log("ARRAY", `${array.length}\n`);
                return res.status(200).json(array);
                //return res.status(200).json({ msg: "Success", files: [], length: 0, });
            }else if (req.query.action === "add_pic_from_drafts") {
                //const one = getOnePicture(req.query.name);
                addPicturesFromDrafts();
                //convertToWebp();
                return res.status(200).json({ msg: "Success" });
            }
            
            if (req.query.action === "get_all") {
                //console.log("GET_ALL", `${req.query.action}\n`);
                const array = getDataFile();
                //console.log("ARRAY", `${array.length}\n`);
                return res.status(200).json({ msg: array.length ? "Success" : "Error", files: array, length: array.length, });
                //return res.status(200).json({ msg: "Success", files: [], length: 0, });
            } else if (req.query.action === "update_all") {
                //console.log("GET_ALL", `${req.query.action}\n`);
                const array = updateAllPictures();
                //console.log("ARRAY", `${array.length}\n`);
                return res.status(200).json({ msg: array.length ? "Success" : "Error", files: array, length: array.length, });
                //return res.status(200).json({ msg: "Success", files: [], length: 0, });
            } else if (req.query.action === "edit_one" && req.query.id) {
                //console.log("GET_ALL", `${req.query.action}\n`);
                const id = req.query.id;
                const title = req.query.title ? req.query.title : '';
                const description = req.query.description ? req.query.description : '';
                const types = req.query.types ? JSON.parse(req.query.types) : [];
                const picture = editOnePictureById(id, title, description, types);
                //console.log("ARRAY", `${array.length}\n`);
                return res.status(200).json({ msg: picture ? "Success" : "Error", picture: picture,});
                //return res.status(200).json({ msg: "Success", files: [], length: 0, });
            }else if (req.query.action === "edit_multiple_types") {
                const ids = req.query.ids ? JSON.parse(req.query.ids) : [];
                const types = req.query.types ? JSON.parse(req.query.types) : [];
                const datas = editMultipleTypePictureByIds(ids, types);
                //console.log("ARRAY", `${array.length}\n`);
                return res.status(200).json({ msg: datas ? "Success" : "Error", datas: datas,});
                //return res.status(200).json({ msg: "Success", files: [], length: 0, });
            }
            else if (req.query.action === "update_file") {
                updateFile();
                return res.status(200).json({ msg: "Success" });
            }
            else if (req.query.action === "get_one" && req.query.id) {
                const one = getOnePictureById(parseInt(req.query.id));
                return res.status(200).json(one);
            } else if (req.query.action === "convert") {
                //const one = getOnePicture(req.query.name);
                await convertToWebp();
                return res.status(200).json({ msg: "Success" });
            }
            else if (req.query.action === "get_origin_file") {
                //const one = getOnePicture(req.query.name);
                
                updateFileToOrigin();
                return res.status(200).json({ msg: "Success" });
            }else if (req.query.action === "randomize_file") {
                //const one = getOnePicture(req.query.name);
                randomizeFilePicture();
                return res.status(200).json({ msg: "Success" });
            }
            
        }
        return res.status(400).json({ msg: "Error 400", });
    } catch (error) {
        console.log("ERROR", error);
        return res.status(405).json({ msg: "Error 405", error: error });
    }
}
*/