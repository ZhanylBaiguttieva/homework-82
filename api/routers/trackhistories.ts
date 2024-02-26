import {Router} from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoriesRouter = Router();

trackHistoriesRouter.post('/',  auth, async(req:RequestWithUser, res, next) => {
    try {

        const trackHistory = new TrackHistory({
            user: req.user?._id,
            track: req.body.track,
            datetime: Date.now(),
        })

        await trackHistory.save();
        return res.send({trackHistory});

    } catch(e) {
        next(e);
    }
})


export default trackHistoriesRouter;