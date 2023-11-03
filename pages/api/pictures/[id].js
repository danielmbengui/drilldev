export default async function handler(req, res) {

}
/*
import Cors from 'cors';
import fs from 'fs';
import initMiddleware from '@/lib/init-middleware';
import path from 'path';
import { getOnePictureFromListById, getIndexOnePictureFromListById } from '@/pages/api/constants';
import { METHOD_GET, METHOD_POST,} from '@/constants';

const rootDirectoryPath = path.resolve(process.cwd());
const DIR_MIDJOURNEY_DATAS = `${rootDirectoryPath}/public/images/midjourney/datas`;

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
    fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data.json", JSON.stringify(data, null, 2));
}

function getDataFile() {

    if (!fs.existsSync(DIR_MIDJOURNEY_DATAS)) {
        fs.mkdirSync(DIR_MIDJOURNEY_DATAS, { recursive: true });
        fs.writeFileSync(DIR_MIDJOURNEY_DATAS + "/data.json", JSON.stringify([], null, 2));
    }
    

    //const array = require("../../public/images/midjourney/datas/data.json")
    return JSON.parse(fs.readFileSync(DIR_MIDJOURNEY_DATAS + "/data.json"));
    //return (array);
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

export default async function handler(req, res) {
    // Run cors
    await cors(req, res);

    try {
        //console.log("API", "access to the API \n");
        if (req.method === METHOD_GET) {
            const { id } = req.query

            if (req.query.action === "edit_one" && id) {
                //console.log("GET_ALL", `${req.query.action}\n`);
                //const id = req.query.id;
                const title = req.query.title ? req.query.title : '';
                const description = req.query.description ? req.query.description : '';
                const types = req.query.types ? JSON.parse(req.query.types) : [];
                const picture = editOnePictureById(id, title, description, types);
                //console.log("ARRAY", `${array.length}\n`);
                return res.status(200).json({ msg: picture ? "Success" : "Error", picture: picture,});
                //return res.status(200).json({ msg: "Success", files: [], length: 0, });
            }
            
            if (req.query.action === "get_one" && id) {
                const one = getOnePictureById(parseInt(id));
                return res.status(200).json(one);
            }
        }
        return res.status(400).json({ msg: "Error 400", });
    } catch (error) {
        console.log("ERROR", error);
        return res.status(405).json({ msg: "Error 405", error: error });
    }
}
*/