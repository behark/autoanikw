import { Request, Response } from 'express';
import Vehicle from '../models/Vehicle';
import { Media } from '../models/Media';
import { ActivityLogModel } from '../models/ActivityLog';

// Dashboard Stats Interface (inline for now)
interface DashboardStats {
  vehicles: {
    total: number;
    available: number;
    sold: number;
    reserved: number;
    featured: number;
    recentlyAdded: number;
    byCondition: Record<string, number>;
    byBrand: Record<string, number>;
    averagePrice: number;
    totalValue: number;
  };
  users: {
    total: number;
    active: number;
    inactive: number;
    byRole: Record<string, number>;
    recentLogins: number;
    newThisMonth: number;
  };
  media: {
    totalFiles: number;
    totalSize: number;
    images: number;
    documents: number;
    byCategory: Record<string, number>;
    recentUploads: number;
  };
  activity: {
    totalActions: number;
    todayActions: number;
    weekActions: number;
    monthActions: number;
    byAction: Record<string, number>;
    byResource: Record<string, number>;
  };
}

// Get admin dashboard statistics
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Vehicle Statistics
    const vehicleStats = await getVehicleStats(monthAgo);
    
    // User Statistics
    const userStats = await getUserStats(monthAgo);
    
    // Media Statistics
    const mediaStats = await getMediaStats(monthAgo);
    
    // Activity Statistics
    const activityStats = await getActivityStats(today, weekAgo, monthAgo);

    const dashboardStats: DashboardStats = {
      vehicles: vehicleStats,
      users: userStats,
      media: mediaStats,
      activity: activityStats
    };

    res.json({
      success: true,
      data: dashboardStats,
      message: 'Dashboard statistics retrieved successfully'
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Vehicle statistics helper
async function getVehicleStats(monthAgo: Date) {
  const [
    totalVehicles,
    availableVehicles,
    soldVehicles,
    reservedVehicles,
    featuredVehicles,
    recentVehicles,
    conditionStats,
    brandStats,
    priceStats
  ] = await Promise.all([
    Vehicle.countDocuments(),
    Vehicle.countDocuments({ status: 'available' }),
    Vehicle.countDocuments({ status: 'sold' }),
    Vehicle.countDocuments({ status: 'reserved' }),
    Vehicle.countDocuments({ featured: true }),
    Vehicle.countDocuments({ createdAt: { $gte: monthAgo } }),
    Vehicle.aggregate([
      { $group: { _id: '$condition', count: { $sum: 1 } } }
    ]),
    Vehicle.aggregate([
      { $group: { _id: '$brand', count: { $sum: 1 } } }
    ]),
    Vehicle.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: '$price' },
          totalValue: { $sum: '$price' }
        }
      }
    ])
  ]);

  const byCondition: Record<string, number> = {};
  conditionStats.forEach((stat: any) => {
    byCondition[stat._id] = stat.count;
  });

  const byBrand: Record<string, number> = {};
  brandStats.forEach((stat: any) => {
    byBrand[stat._id] = stat.count;
  });

  return {
    total: totalVehicles,
    available: availableVehicles,
    sold: soldVehicles,
    reserved: reservedVehicles,
    featured: featuredVehicles,
    recentlyAdded: recentVehicles,
    byCondition,
    byBrand,
    averagePrice: priceStats[0]?.averagePrice || 0,
    totalValue: priceStats[0]?.totalValue || 0
  };
}

// User statistics helper
async function getUserStats(monthAgo: Date) {
  // Placeholder - you'll need to implement based on your User model
  const User = require('../models/User');
  
  const [
    totalUsers,
    activeUsers,
    roleStats,
    newUsers
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ isActive: true }),
    User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]),
    User.countDocuments({ createdAt: { $gte: monthAgo } })
  ]);

  const byRole: Record<string, number> = {};
  roleStats.forEach((stat: any) => {
    byRole[stat._id] = stat.count;
  });

  return {
    total: totalUsers,
    active: activeUsers,
    inactive: totalUsers - activeUsers,
    byRole,
    recentLogins: 0, // Implement based on login tracking
    newThisMonth: newUsers
  };
}

// Media statistics helper
async function getMediaStats(monthAgo: Date) {
  const [
    totalFiles,
    totalSizeResult,
    imageCount,
    documentCount,
    categoryStats,
    recentUploads
  ] = await Promise.all([
    Media.countDocuments(),
    Media.aggregate([
      { $group: { _id: null, totalSize: { $sum: '$size' } } }
    ]),
    Media.countDocuments({ mimetype: { $regex: '^image/' } }),
    Media.countDocuments({ mimetype: { $regex: '^application/' } }),
    Media.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]),
    Media.countDocuments({ createdAt: { $gte: monthAgo } })
  ]);

  const byCategory: Record<string, number> = {};
  categoryStats.forEach((stat: any) => {
    byCategory[stat._id] = stat.count;
  });

  return {
    totalFiles,
    totalSize: totalSizeResult[0]?.totalSize || 0,
    images: imageCount,
    documents: documentCount,
    byCategory,
    recentUploads
  };
}

// Activity statistics helper
async function getActivityStats(today: Date, weekAgo: Date, monthAgo: Date) {
  const [
    totalActions,
    todayActions,
    weekActions,
    monthActions,
    actionStats,
    resourceStats
  ] = await Promise.all([
    ActivityLogModel.countDocuments(),
    ActivityLogModel.countDocuments({ timestamp: { $gte: today } }),
    ActivityLogModel.countDocuments({ timestamp: { $gte: weekAgo } }),
    ActivityLogModel.countDocuments({ timestamp: { $gte: monthAgo } }),
    ActivityLogModel.aggregate([
      { $group: { _id: '$action', count: { $sum: 1 } } }
    ]),
    ActivityLogModel.aggregate([
      { $group: { _id: '$resource', count: { $sum: 1 } } }
    ])
  ]);

  const byAction: Record<string, number> = {};
  actionStats.forEach((stat: any) => {
    byAction[stat._id] = stat.count;
  });

  const byResource: Record<string, number> = {};
  resourceStats.forEach((stat: any) => {
    byResource[stat._id] = stat.count;
  });

  return {
    totalActions,
    todayActions,
    weekActions,
    monthActions,
    byAction,
    byResource
  };
}

// Get activity logs for admin
export const getActivityLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 50,
      userId,
      action,
      resource,
      resourceId,
      dateFrom,
      dateTo
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = {};
    if (userId) filter.userId = userId;
    if (action) filter.action = action;
    if (resource) filter.resource = resource;
    if (resourceId) filter.resourceId = resourceId;
    
    if (dateFrom || dateTo) {
      filter.timestamp = {};
      if (dateFrom) filter.timestamp.$gte = new Date(dateFrom as string);
      if (dateTo) filter.timestamp.$lte = new Date(dateTo as string);
    }

    const total = await ActivityLogModel.countDocuments(filter);
    const logs = await ActivityLogModel.find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        logs,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages
      },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });

  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity logs',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get system health status
export const getSystemHealth = async (req: Request, res: Response): Promise<void> => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        media: 'available',
        api: 'operational'
      },
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development'
    };

    res.json({
      success: true,
      data: health,
      message: 'System health retrieved successfully'
    });

  } catch (error) {
    console.error('System health error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check system health',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
