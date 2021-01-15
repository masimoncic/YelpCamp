
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/yelp-camp', { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) +10;
    const camp = new Campground ({
      author: '6000653b8b988362b828ff58',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sequi similique repudiandae est dolor. Iure est maxime similique quam ipsa totam perferendis tempora! Eveniet soluta libero vitae, culpa omnis eligendi.',
      price: price,
      images: [
        {
          url: 'https://res.cloudinary.com/dklkew1yh/image/upload/v1610744263/YelpCamp/fqkekitsm6c8suuenav9.jpg',
          filename: 'YelpCamp/fqkekitsm6c8suuenav9'
        },
        {
          url: 'https://res.cloudinary.com/dklkew1yh/image/upload/v1610744264/YelpCamp/rxzmg2uh3zejgnoidsmn.jpg',
          filename: 'YelpCamp/rxzmg2uh3zejgnoidsmn'
        },
        {
          url: 'https://res.cloudinary.com/dklkew1yh/image/upload/v1610744268/YelpCamp/tqjgtthbupuuguqqytxz.jpg',
          filename: 'YelpCamp/tqjgtthbupuuguqqytxz'
        },
        {
          url: 'https://res.cloudinary.com/dklkew1yh/image/upload/v1610744272/YelpCamp/rii7cxehmed15nw1rfq3.jpg',
          filename: 'YelpCamp/rii7cxehmed15nw1rfq3'
        }
      ],
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})