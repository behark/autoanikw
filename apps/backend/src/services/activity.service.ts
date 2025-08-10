import { ActivityLogModel, ActivityAction, ActivityResource, ActivityDetails } from '../models/ActivityLog';

export interface CreateActivityLogRequest {
  userId: string;
  action: ActivityAction;
  resource: ActivityResource;
  resourceId?: string;
  details: ActivityDetails;
  ipAddress?: string;
  userAgent?: string;
}

export const logActivity = async (data: CreateActivityLogRequest): Promise<void> => {
  try {
    // Get user email from userId (you might want to cache this)
    const User = require('../models/User'); // Dynamic import to avoid circular dependencies
    const user = await User.findById(data.userId).select('email');
    
    if (!user) {
      console.error(`User not found for activity log: ${data.userId}`);
      return;
    }

    const activityLog = new ActivityLogModel({
      userId: data.userId,
      userEmail: user.email,
      action: data.action,
      resource: data.resource,
      resourceId: data.resourceId,
      details: data.details,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      timestamp: new Date()
    });

    await activityLog.save();
    console.log(`Activity logged: ${data.action} ${data.resource} by ${user.email}`);
  } catch (error) {
    console.error('Failed to log activity:', error);
    // Don't throw error - activity logging should not break the main flow
  }
};

export const getActivityLogs = async (filters: {
  userId?: string;
  action?: ActivityAction;
  resource?: ActivityResource;
  resourceId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}) => {
  const {
    userId,
    action,
    resource,
    resourceId,
    dateFrom,
    dateTo,
    page = 1,
    limit = 50
  } = filters;

  const filter: any = {};
  if (userId) filter.userId = userId;
  if (action) filter.action = action;
  if (resource) filter.resource = resource;
  if (resourceId) filter.resourceId = resourceId;
  
  if (dateFrom || dateTo) {
    filter.timestamp = {};
    if (dateFrom) filter.timestamp.$gte = dateFrom;
    if (dateTo) filter.timestamp.$lte = dateTo;
  }

  const skip = (page - 1) * limit;
  const total = await ActivityLogModel.countDocuments(filter);
  const logs = await ActivityLogModel.find(filter)
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    logs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};
