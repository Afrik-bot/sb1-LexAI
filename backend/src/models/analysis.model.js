import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topics: [{
    type: String,
    required: true
  }],
  relatedUpdates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Update'
  }],
  status: {
    type: String,
    enum: ['draft', 'review', 'published'],
    default: 'draft'
  }
}, {
  timestamps: true
});