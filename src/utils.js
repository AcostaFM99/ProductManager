import {fileURLToPath} from 'url';
import { dirname } from 'path';
import multer from 'multer';
import path from 'path';
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rutaLoads= path.join(__dirname + '/uploads');

export const creaHash = (password)=>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const esClaveValida=(password,usuario)=>{
  return bcrypt.compareSync(password, usuario.contraseña);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, rutaLoads)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9 + '-' + file.originalname )
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })


export {__dirname};
export default upload;


