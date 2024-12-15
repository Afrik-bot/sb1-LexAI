import mongoose from 'mongoose';

const updateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['legislation', 'court', 'policy', 'ethics', 'compliance']
  },
  region: {
    type: String,
    required: true,
    enum: ['us', 'eu', 'cn']
  },
  source: {
    type: String,
    required: true
  },
  sourceUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: 'Source URL must be a valid URL'
    }
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});