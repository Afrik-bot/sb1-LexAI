import { Analysis } from '../models/analysis.model.js';

export const getAnalyses = async (req, res) => {
  try {
    const { topic, status, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (topic) query.topics = topic;
    if (status) query.status = status;

    const analyses = await Analysis.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name expertise organization');

    const total = await Analysis.countDocuments(query);

    res.json({
      analyses,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id)
      .populate('author', 'name expertise organization')
      .populate('relatedUpdates');
      
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    
    res.json(analysis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createAnalysis = async (req, res) => {
  try {
    const analysis = new Analysis({
      ...req.body,
      author: req.user._id
    });
    await analysis.save();
    res.status(201).json(analysis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    if (analysis.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this analysis' });
    }

    Object.assign(analysis, req.body);
    await analysis.save();
    
    res.json(analysis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findByIdAndDelete(req.params.id);
    
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};