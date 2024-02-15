import {Router} from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";


const trackHistoriesRouter = Router();

trackHistoriesRouter.post('/', async(req, res, next) => {
    try {
        const headerValue = req.get('Authorization');

        if(!headerValue) {
            return res.status(401).send({error: 'No authorization header present'});
        }

        const [_bearer, token] = headerValue.split(' ');

        if(!token) {
            return res.status(401).send({error: 'No token present'});
        }

        const user = await User.findOne({token});

        if(!user) {
            return res.status(401).send({error: 'Wrong token'});
        }

        const trackHistory = new TrackHistory({
            track: req.body.track,
            user: user._id,
            datetime: Date.now(),
        })

        await trackHistory.save();
        return res.send({trackHistory});

    } catch(e) {
        next(e);
    }
})


export default trackHistoriesRouter;