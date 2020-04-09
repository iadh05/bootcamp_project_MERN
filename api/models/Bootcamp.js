import mongoose from 'mongoose';
import slugify from 'slugify';

import geocode from '../utils/geocoder.js';

const Bootcamp = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    unique: true,
  },
  slug: String,
  description: {
    type: String,
    required: true,
    maxlength: [500, 'Description can not be more thn 500 characters '],
  },
  website: {
    type: String,
    match: [
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      'Please enter an Url',
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'phone can not be more than 20 characters'],
  },
  phone: {
    type: String,
    maxlength: [20, 'phone can not be more than 20 characters'],
  },
  email: {
    type: String,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      'please enter a vali email',
    ],
  },
  address: {
    type: String,
    required: [true, 'Please add an adress'],
  },
  location: {
    //GeoJson
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAdress: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  careers: {
    //array of String
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other',
    ],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating can not be more than 10'],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGarentee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// slugify the name
Bootcamp.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// Geocode and create location field
Bootcamp.pre('save', async function (next) {
  const loc = await geocode.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAdress: loc[0].formattedAdress,
    address: loc[0].address,
    city: loc[0].city,
    state: loc[0].state,
    zipCode: loc[0].zipCode,
    country: loc[0].countrys,
  };
  this.address = undefined;
  next();
});

export default mongoose.model('Bootcamp', Bootcamp);
