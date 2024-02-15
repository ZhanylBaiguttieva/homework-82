import mongoose, {Schema} from "mongoose";

const TrackHistorySchema = new  mongoose.Schema({
    user: {
        type:Schema.Types.ObjectId,
        required: true,
    },
    track: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    }
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;