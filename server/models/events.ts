import mongoose from 'mongoose';
import moment from 'moment-timezone';

const { Schema } = mongoose;

const events = new Schema({
  place_id: { type: String, required: true },
  park_name: { type: String, required: true },
  address: { type: String, required: true },
  date: {
    type: Date,
    required: true,
    set: (date: Date) => moment.tz(date, 'Europe/Madrid').toDate(),
    get: (date: Date) => moment(date).tz('Europe/Madrid').format()
  },
  user: { type: String, required: true },
  dog_avatar: { type: String, required: true }
});

events.set('toJSON', { getters: true });

const Events = mongoose.model('Events', events);

export default Events;
