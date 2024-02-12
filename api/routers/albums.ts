import {Router} from "express";
import Album from "../models/Album";
import {Types} from "mongoose";
import {imagesUpload} from "../multer";

const albumsRouter = Router();

albumsRouter.get('/', async(req, res, next) =>{
    try {
        const artist = req.query.artist;
        if(artist) {
            const albums = await Album.find({artist: req.query.artist}).populate('artist','name information');
            return res.send(albums);
        } else {
            const albums = await Album.find().populate('artist','name information');
            return res.send(albums);
        }

    } catch(e) {
        return next(e);
    }
});

albumsRouter.get('/:id', async(req,res, next) => {
   try {
       let _id =  new Types.ObjectId(req.params.id);
       // try {
       //     _id = new Types.ObjectId(req.params.id);
       // } catch {
       //     return res.status(404).send({error: 'Wrong ObjectId!'});
       // }
       const album = await Album.findById(_id).populate('artist', 'name information');

       if (!album) {
           return res.status(404).send({error: 'Not found!'});
       }
       res.send(album);

   } catch (e) {
       next(e);
   }
});
albumsRouter.post('/', imagesUpload.single('image'), async(req,res, next) => {
   try {
       const albumData = {
           name: req.body.name,
           artist: req.body.artist,
           date: req.body.date,
           image: req.file ? req.file.filename : null,
       }

       const album = new Album(albumData);
       await album.save();
       return res.send(album);
   } catch(e) {
       next(e);
   }
});

export default albumsRouter;