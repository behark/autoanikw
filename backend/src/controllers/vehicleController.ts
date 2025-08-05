import { Request, Response } from 'express';
import Vehicle, { IVehicle } from '../models/Vehicle';
import fs from 'fs';
import path from 'path';

// Get all vehicles with filters
export const getVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      brand, 
      model, 
      year, 
      minPrice, 
      maxPrice, 
      fuel, 
      status,
      page = 1, 
      limit = 12 
    } = req.query;

    // Build filter object
    const filter: any = {};
    
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (model) filter.model = { $regex: model, $options: 'i' };
    if (year) filter.year = year;
    if (fuel) filter.fuel = { $regex: fuel, $options: 'i' };
    if (status) filter.status = status;
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Text search if search query provided
    if (req.query.search) {
      filter.$text = { $search: req.query.search as string };
    }

    // Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const vehicles = await Vehicle.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Vehicle.countDocuments(filter);

    res.json({
      vehicles,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalVehicles: total
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get vehicle by ID
export const getVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      res.status(404).json({ message: 'Vehicle not found' });
      return;
    }
    
    res.json(vehicle);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create new vehicle
export const createVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicleData = req.body;
    
    // Handle file uploads if present
    if (req.files && Array.isArray(req.files)) {
      vehicleData.images = (req.files as Express.Multer.File[]).map((file, index) => ({
        url: `/uploads/vehicles/${file.filename}`,
        altText: vehicleData.title,
        isPrimary: index === 0 // First uploaded image is primary by default
      }));
    }
    
    // Create new vehicle
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    
    res.status(201).json(vehicle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update vehicle
export const updateVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Find vehicle first to get existing images
    const vehicle = await Vehicle.findById(id);
    
    if (!vehicle) {
      res.status(404).json({ message: 'Vehicle not found' });
      return;
    }
    
    // Handle file uploads if present
    if (req.files && Array.isArray(req.files) && (req.files as Express.Multer.File[]).length > 0) {
      // Keep existing images if not replacing them completely
      const existingImages = updateData.keepExistingImages ? vehicle.images : [];
      
      // Add new images
      const newImages = (req.files as Express.Multer.File[]).map((file) => ({
        url: `/uploads/vehicles/${file.filename}`,
        altText: updateData.title || vehicle.title,
        isPrimary: false
      }));
      
      updateData.images = [...existingImages, ...newImages];
    }
    
    // Handle image deletion
    if (updateData.imagesToDelete && Array.isArray(updateData.imagesToDelete)) {
      // Delete image files from server
      for (const imageUrl of updateData.imagesToDelete) {
        const imagePath = path.join(__dirname, '../../', imageUrl.replace('/', ''));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      
      // Filter out deleted images from database
      if (vehicle.images && updateData.images) {
        updateData.images = updateData.images.filter(
          (img: any) => !updateData.imagesToDelete.includes(img.url)
        );
      } else if (vehicle.images) {
        updateData.images = vehicle.images.filter(
          (img) => !updateData.imagesToDelete.includes(img.url)
        );
      }
      
      // Remove imagesToDelete from update data
      delete updateData.imagesToDelete;
      delete updateData.keepExistingImages;
    }
    
    // Update vehicle
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updateData, { 
      new: true,
      runValidators: true
    });
    
    res.json(updatedVehicle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete vehicle
export const deleteVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Find vehicle first to get images
    const vehicle = await Vehicle.findById(id);
    
    if (!vehicle) {
      res.status(404).json({ message: 'Vehicle not found' });
      return;
    }
    
    // Delete image files from server
    if (vehicle.images && vehicle.images.length > 0) {
      for (const image of vehicle.images) {
        const imagePath = path.join(__dirname, '../../', image.url.replace('/', ''));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }
    
    // Delete vehicle from database
    await Vehicle.findByIdAndDelete(id);
    
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get vehicle categories
export const getVehicleCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Aggregate to get distinct categories
    const categories = await Vehicle.aggregate([
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json(categories.map(cat => ({ name: cat._id, count: cat.count })));
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get vehicle brands
export const getVehicleBrands = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Aggregate to get distinct brands with counts
    const brands = await Vehicle.aggregate([
      { $group: { _id: '$brand', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json(brands.map(brand => ({ name: brand._id, count: brand.count })));
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
