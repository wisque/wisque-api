import mongo, {Schema} from 'mongoose';

const account = {
    id: { type: String },
    social_network_id: { type: String },
};

export default mongo.model('Account', new Schema(account));