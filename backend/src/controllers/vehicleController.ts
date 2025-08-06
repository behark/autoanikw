import { Request, Response } from 'express';
import Vehicle, { IVehicle, IVehicleImage } from '../models/Vehicle';
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
    if (model) filter.vehicleModel = { $regex: model, $options: 'i' };
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
    
    // Parse arrays that come as stringified JSON
    if (vehicleData.features && typeof vehicleData.features === 'string') {
      try {
        vehicleData.features = JSON.parse(vehicleData.features);
      } catch (e) {
        vehicleData.features = [];
      }
    }
    
    if (vehicleData.categories && typeof vehicleData.categories === 'string') {
      try {
        vehicleData.categories = JSON.parse(vehicleData.categories);
      } catch (e) {
        vehicleData.categories = [];
      }
    }
    
    // Handle file uploads if present
    if (req.files && Array.isArray(req.files)) {
      const primaryIndex = parseInt(vehicleData.primaryImageIndex) || 0;
      vehicleData.images = (req.files as Express.Multer.File[]).map((file, index) => ({
        url: `/uploads/vehicles/${file.filename}`,
        altText: vehicleData.title || `Vehicle image ${index + 1}`,
        isPrimary: index === primaryIndex
      }));
    }
    
    // Create new vehicle
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    
    res.status(201).json(vehicle);
  } catch (error: any) {
    console.error('Error creating vehicle:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update vehicle
export const updateVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Parse arrays that come as stringified JSON
    if (updateData.features && typeof updateData.features === 'string') {
      try {
        updateData.features = JSON.parse(updateData.features);
      } catch (e) {
        delete updateData.features;
      }
    }
    
    if (updateData.categories && typeof updateData.categories === 'string') {
      try {
        updateData.categories = JSON.parse(updateData.categories);
      } catch (e) {
        delete updateData.categories;
      }
    }
    
    // Parse existing images if they came as a string
    if (updateData.existingImages && typeof updateData.existingImages === 'string') {
      try {
        updateData.existingImages = JSON.parse(updateData.existingImages);
      } catch (e) {
        updateData.existingImages = [];
      }
    }
    
    // Find vehicle first to get existing images
    const vehicle = await Vehicle.findById(id);
    
    if (!vehicle) {
      res.status(404).json({ message: 'Vehicle not found' });
      return;
    }
    
    // Prepare final images array
    let finalImages: IVehicleImage[] = [];
    
    // Handle existing images if specified
    if (updateData.existingImages && Array.isArray(updateData.existingImages)) {
      finalImages = [...updateData.existingImages];
      
      // Remove existingImages from update data as we'll set the final images at the end
      delete updateData.existingImages;
    } else {
      // If no existingImages specified, keep all current ones
      finalImages = vehicle.images || [];
    }
    
    // Handle images to delete
    if (updateData.imagesToDelete && typeof updateData.imagesToDelete === 'string') {
      try {
        updateData.imagesToDelete = JSON.parse(updateData.imagesToDelete);
      } catch (e) {
        updateData.imagesToDelete = [];
      }
    }
    
    if (updateData.imagesToDelete && Array.isArray(updateData.imagesToDelete)) {
      // Delete image files from server
      for (const imageUrl of updateData.imagesToDelete) {
        try {
          const imagePath = path.join(__dirname, '../../', imageUrl.replace(/^\//, ''));
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Deleted image: ${imagePath}`);
          }
        } catch (error) {
          console.error(`Failed to delete image: ${error}`);
        }
      }
      
      // Filter out deleted images from final images array
      finalImages = finalImages.filter(
        (img: any) => !updateData.imagesToDelete.includes(img.url)
      );
      
      // Remove imagesToDelete from update data
      delete updateData.imagesToDelete;
    }
    
    // Handle file uploads if present
    if (req.files && Array.isArray(req.files) && (req.files as Express.Multer.File[]).length > 0) {
      const primaryIndex = parseInt(updateData.primaryImageIndex) || 0;
      
      // Add new images
      const newImages = (req.files as Express.Multer.File[]).map((file, index) => ({
        url: `/uploads/vehicles/${file.filename}`,
        altText: updateData.title || vehicle.title,
        isPrimary: index === primaryIndex && finalImages.every((img: any) => !img.isPrimary)
      }));
      
      // Append new images to final images array
      finalImages = [...finalImages, ...newImages];
    }
    
    // Ensure we have one primary image
    let hasPrimaryImage = finalImages.some((img: any) => img.isPrimary);
    if (!hasPrimaryImage && finalImages.length > 0) {
      finalImages[0].isPrimary = true;
    }
    
    // Set the final images to the update data
    updateData.images = finalImages;
    
    // Remove unnecessary fields
    delete updateData.primaryImageIndex;
    
    // Update vehicle
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updateData, { 
      new: true,
      runValidators: true
    });
    
    res.json(updatedVehicle);
  } catch (error: any) {
    console.error('Error updating vehicle:', error);
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
