import { Router } from 'express';
import upload from '../libs/multer';
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto, searchPhotos } from '../controllers/photo.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { login, register } from '../controllers/auth.controller';


const router = Router();

router.post('/login', login);
router.post('/register', register);

router.use(upload.single('image'));

router.route('/photos')
    .get(getPhotos)  
    .post(verifyToken, createPhoto);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(verifyToken, deletePhoto)
    .put(verifyToken, updatePhoto);

router.get('/photos/search/:query', searchPhotos);


export default router;