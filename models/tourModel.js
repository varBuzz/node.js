const mongoose = require('mongoose');
const slugify = require('slugify')

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour must require a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A tour name must have less or equal than 40 characters'], 
    minlength: [10, 'A tour name must have more or equal than 10 characters']
  },
  slug: {
    type: String
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficutly'],
    trim: true,
    enum: {values: ['easy', 'medium', 'difficult'], msg: 'Difficulty is either: easy, medium, difficult'}
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must require a price'],
  },
  priceDiscount: {
    type: Number, 
    validate: {
      validator: function(val) {
        return val < this.price 
      }, 
      message: 'Discount price {VALUE} must be below regular price'
    }
  },
  summary: {
    type: String,
    required: [true, 'A tour must have a description'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});
//DOCUMENT MIDDLEWARES: runs before the .save() command and .create() command
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {lower: true})
  next()

})

tourSchema.pre('remove', { query: true, document: false }, function(next) {
  console.log('removing all docs...')
  next()
})
const tour = new mongoose.model('Tour', tourSchema);

module.exports = tour;
