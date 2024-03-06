import {Router} from "express";
import Track from "../models/Track";
import auth from "../middleware/auth";

const tracksRouter = Router();

tracksRouter.get('/', async(req,res, next) => {
    try {
        const album = req.query.album;
        if(album) {
            const tracks = await Track.find(
                {album: req.query.album})
                .sort({number:"asc"})
                .populate('album','name date');
            return res.send(tracks);
        } else {
            const tracks = await Track.find().populate('album','name date');
            return res.send(tracks);
        }

    } catch(e) {
        return next(e);
    }
});

tracksRouter.post(
    '/',
    auth,
    async(req, res, next) => {
   try {
       const trackData = {
           name: req.body.name,
           album: req.body.album,
           length: req.body.length,
           number: parseFloat(req.body.number),
       }
       const track = new Track(trackData);
       await track.save();
       res.send(track);

   } catch(e) {
       next(e);
   }
});

export default tracksRouter;