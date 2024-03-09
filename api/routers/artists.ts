import {Router} from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose, {mongo, Types} from "mongoose";
import Album from "../models/Album";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Track from "../models/Track";
import tracksRouter from "./tracks";

const artistsRouter = Router();

artistsRouter.get('/', async (_req, res, next) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (e) {
         return next(e);
    }
});

artistsRouter.get('/:id', async(req,res, next) => {
   try {
       let _id: Types.ObjectId;
       try {
           _id = new Types.ObjectId(req.params.id);
       } catch {
           return res.status(404).send({error: 'Wrong ObjectId!'});
       }
       const artist = await Artist.findById(_id);

       res.send(artist);
   } catch(e) {
       next(e);
   }
});
artistsRouter.post(
    '/',
    auth,
    permit('user','admin'),
    imagesUpload.single('image'),
    async(req, res, next) => {
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
       if (e instanceof mongoose.Error.ValidationError) {
           return res.status(422).send(e);
       }

       if (e instanceof mongo.MongoServerError && e.code === 11000) {
           return res.status(422).send({message: 'Name of artist should be unique'});
       }
       next(e);
   }
});

artistsRouter.delete(
    '/:id',
    auth,
    permit('admin'),
    async(req: RequestWithUser, res,next) => {
        try {
            let _id: Types.ObjectId;
            try {
                _id = new Types.ObjectId(req.params.id);
            } catch {
                return res.status(404).send({error: 'Wrong ObjectId!'});
            }
            const artist = await Artist.findById(_id);
            if(!artist) {
                return res.status(404).send({error: 'Artist Not found!'});
            }
            const deletedOne = await Artist.findByIdAndDelete(_id);

            res.send(deletedOne);

        } catch(e) {
            next(e);
        }
});

artistsRouter.patch(
    '/:id/togglePublished',
    auth,
    permit('admin'),
    async (req,res,next) => {
        try{
            let _id: Types.ObjectId;
            try {
                _id = new Types.ObjectId(req.params.id);
            } catch {
                return res.status(404).send({error: 'Wrong ObjectId!'});
            }
            const artist = await Artist.findById(_id);
            if (!artist) {
                return res.status(404).send({error: 'Artist Not found!'});
            }

            const newArtist  = new Artist({
                _id: _id,
                name: req.body.name,
                image: req.file ? req.file.filename : null,
                information: req.body.information,
                isPublished: !req.body.isPublished,
            });

            res.send(await Artist.findByIdAndUpdate(_id, newArtist));
        } catch (e) {
            next(e);
        }
});

export default artistsRouter;