import mongo, {Schema} from 'mongoose';

const event = {
    title: {
        type: String,
        required: [true, 'Party should have title']
    },
    lat: {
        type: Number,
        min: [-90, 'Latitude can not be less -90 degree'],
        max: [90, 'Latitude can not be more than 90 degree'],
        default: 180
    },
    lng: {
        type: Number,
        min: [-180, 'Longitude can not be less -180 degree'],
        max: [180, 'Longitude can not be more than 180 degree'],
        default: 360
    }
};

export default mongo.model('Event', new Schema(event));