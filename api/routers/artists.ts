import {Router} from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";

const artistsRouter = Router();

artistsRouter.get('/', async (_req, res, next) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (e) {
         return next(e);
    }
});

artistsRouter.post('/', imagesUpload.single('image'), async(req, res, next) => {
   try {
       const artistData = {
           name: req.body.name,
           information: req.body.information,
           image: req.file ? req.file.filename : null,
       }
       const artist = new Artist(artistData);
       await artist.save();
       return res.send(artist);
   } catch (e) {
       return next(e);
   }
});