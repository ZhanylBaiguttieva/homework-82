import {Router} from "express";
import TrackHistory from "../models/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";
import {Types} from "mongoose";
import Track from "../models/Track";
import Artist from "../models/Artist";
import Album from "../models/Album";

const trackHistoriesRouter = Router();
 interface TrackListened {
    _id: string;
    track: {
        _id: string;
        name: string;
    };
    artist: {
        _id: string;
        name: string;
    };
    user: string;
    datetime: string;
}
trackHistoriesRouter.get('/', auth, async (req: RequestWithUser,res,next) => {
    try {
        const tracksListened = await TrackHistory.find<TrackListened>(
            {user: req.user?._id})
                .sort({datetime: 'asc'}).populate('track artist', 'name name');


        const convertedTracks: TrackListened[] = tracksListened.map((trackListened) => ({
            _id: trackListened._id,
            track: trackListened.track,
            artist: trackListened.artist,
            user: trackListened.user,
            datetime: trackListened.datetime,
        }));

        res.send(convertedTracks);

    } catch(e) {
        next(e);
    }
});
trackHistoriesRouter.post('/',  auth, async(req:RequestWithUser, res, next) => {
    try {
        let _id: Types.ObjectId;
        try {
            _id = new Types.ObjectId(req.body._id);
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId!'});
        }

        const track = await Track.findById(_id).populate('album', '_id name');
        const album = await Album.findById(track?.album).populate('artist', '_id name');
        const artist = await Artist.findById(album?.artist._id);
        const trackHistory = new TrackHistory({
            user: req.user?._id,
            track: _id,
            artist: artist?._id,
            datetime: Date.now(),
        })

        await trackHistory.save();
        return res.send({trackHistory});

    } catch(e) {
        next(e);
    }
})




export default trackHistoriesRouter;