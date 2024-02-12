import {Router} from "express";
import Track from "../models/Track";

const tracksRouter = Router();

tracksRouter.get('/', async(req,res, next) => {
    try {
        const album = req.query.album;
        if(album) {
            const tracks = await Track.find({album: req.query.album});
            return res.send(tracks);
        } else {
            const tracks = await Track.find();
            return res.send(tracks);
        }

    } catch(e) {
        return next(e);
    }
});

tracksRouter.post('/', async(req, res, next) => {
   try {
       const trackData = {
           name: req.body.name,
           album: req.body.album,
           length: req.body.length,
       }
       const track = new Track(trackData);
       await track.save();
       res.send(track);

   } catch(e) {
       next(e);
   }
});

export default tracksRouter;