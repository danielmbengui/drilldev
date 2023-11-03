export default async function handler(req, res) {

}
/*
import Cors from 'cors';
import fs from 'fs';
import initMiddleware from '@/lib/init-middleware';
import path from 'path';
import { DIR_MIDJOURNEY_DATAS, DIR_MIDJOURNEY_DRAFTS } from '@/constants';
import { getListPictures } from './constants';
//import { DIR_MIDJOURNEY_DRAFTS, getOnePictureFromList, getListPictures, DIR_MIDJOURNEY_PICTURES, DIR_MIDJOURNEY_DATAS, getRelativePath, getFirstLetterUpperCase } from './constants';


const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET and POST
        methods: ["POST", "GET"],
    })
)

/*
function getPicturesFile() {
    if (!fs.existsSync(PATH_PICTURES)) {
        fs.mkdirSync(PATH_PICTURES, { recursive: true });
        fs.writeFileSync(PATH_FILE_CRYPTO_CURRENCIES, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(PATH_FILE_CRYPTO_CURRENCIES));
}
*/
/*
export default async function handler(req, res) {
    // Run cors
    await cors(req, res);

    try {
        console.log("API", "access to the API \n",);
        const path_file = req.query.image;
        const array = getListPictures([], DIR_MIDJOURNEY_DRAFTS);
        //const array_relative = getListDraftPictures().array_relative;
        //const one = getOneDraftPictures(path_file, array);
        //const one_relative = getOneDraftPictures(path_file, array_relative);
        if (!fs.existsSync(DIR_MIDJOURNEY_DATAS)) {
            fs.mkdirSync(DIR_MIDJOURNEY_DATAS, { recursive: true });
        }
        /*
        const name_file = path.basename(one, ".png");
        const name_file_formated = name_file.replace("-", " ");
        const data = {
            title: req.query.title,
            types: JSON.parse(req.query.types),
            src: `${getRelativePath(`${DIR_MIDJOURNEY_PICTURES}/${path.basename(one)}`)}`,
            srcBase: `${getRelativePath(`${DIR_MIDJOURNEY_PICTURES}/${path.basename(one)}`)}`,
            prompt: req.query.prompt,
            tags: JSON.parse(req.query.tags),
        }
        //const destinationImage = 
        fs.writeFileSync(`${DIR_MIDJOURNEY_DATAS}/${name_file}.json`, JSON.stringify(data, null, 2));
        fs.copyFileSync(one, `${DIR_MIDJOURNEY_PICTURES}/${name_file}${path.extname(one)}`);
        
        //console.log("COOOPY", `${cwd()}/public/pictures/images/${path.basename(one)}`)
        res.status(200).json({ msg: "Success", files: array, length: array.length, });
        //console.log("tab", tabCryptoCurrencies);
        //console.log("result", response);
    } catch (error) {
        console.log("ERROR", error);
        return res.status(405).json({ msg: "Error", cryptocurrencies: [] });
    }
}
*/