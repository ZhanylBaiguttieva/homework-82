import {Router} from "express";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import {Types} from "mongoose";
import check from "../middleware/check";

const tracksRouter = Router();

tracksRouter.get(
    '/',
    check,
    async(req: RequestWithUser,res, next) => {
    try {
        let tracksArray: any[] = [];
        const album = req.query.album;
        if(album && req.user && req.user.role === 'user') {
            tracksArray = await Track.find(
                {album: req.query.album, isPublished: true})
                .sort({number:"asc"})
                .populate('album','name date');
        } else if (album && req.user && req.user.role === 'admin') {
            tracksArray = await Track.find(
                {album: req.query.album})
                .sort({number:"asc"})
                .populate('album','name date');
        } else if (!album && req.user && req.user.role === 'user') {
           tracksArray = await Track.find({isPublished: true}).populate('album','name date');
        } else if (!album && req.user && req.user.role === 'admin') {
            tracksArray = await Track.find().populate('album','name date');
        }
            return res.send(tracksArray);

    } catch(e) {
        return next(e);
    }
});

tracksRouter.post(
    '/',
    auth,
    permit('admin', 'user'),
    async(req: RequestWithUser, res, next) => {
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

tracksRouter.delete('/:id',
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
        const track = await Track.findById(_id);
        if(!track) {
            return res.status(404).send({error: 'Track Not found!'});
        }
        const deletedOne = await Track.findByIdAndDelete(_id);

        res.send(deletedOne);

    } catch(e) {
        next(e);
    }
});

tracksRouter.patch(
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
            const track = await Track.findById(_id);
            if (!track) {
                return res.status(404).send({error: 'Track Not found!'});
            }

            const newTrack = new Track({
                _id: _id,
                album: req.body.album,
                name: req.body.name,
                length: req.body.length,
                number: req.body.number,
                isPublished: !req.body.isPublished,
            });

            res.send(await Track.findByIdAndUpdate(_id, newTrack));
        } catch (e) {
            next(e);
        }
});

export default tracksRouter;