import { Update } from '../models/update.model.js';
import { sanitizeObject } from '../utils/sanitizer.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { NotFoundError } from '../utils/errors.js';

export const getUpdates = async (req, res) => {
  try {
    const { region, category } = req.query;
    const { page, limit, skip } = req.pagination;
    const query = {};
    
    if (region) query.region = region;
    if (category) query.category = category;

    const updates = await Update.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name');

    const total = await Update.countDocuments(query);

    return successResponse(res, {
      updates,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getUpdate = async (req, res) => {
  try {
    const update = await Update.findById(req.params.id)
      .populate('author', 'name');
      
    if (!update) {
      throw new NotFoundError('Update');
    }
    
    return successResponse(res, update);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const createUpdate = async (req, res) => {
  try {
    const sanitizedData = sanitizeObject(req.body);
    const update = new Update({
      ...sanitizedData,
      author: req.user._id
    });
    await update.save();
    return successResponse(res, update, 'Update created successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateUpdate = async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);
    
    if (!update) {
      return res.status(404).json({ error: 'Update not found' });
    }

    Object.assign(update, req.body);
    await update.save();
    
    res.json(update);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUpdate = async (req, res) => {
  try {
    const update = await Update.findByIdAndDelete(req.params.id);
    
    if (!update) {
      return res.status(404).json({ error: 'Update not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};