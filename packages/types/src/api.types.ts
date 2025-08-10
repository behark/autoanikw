// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: ValidationError[];
  pagination?: PaginationInfo;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  statusCode: number;
}

export interface PaginationRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchRequest extends PaginationRequest {
  search?: string;
  filters?: Record<string, any>;
}

// HTTP Status Codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500
}

// Common API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me'
  },
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string) => `/api/users/${id}`,
    PROFILE: '/api/users/profile'
  },
  VEHICLES: {
    BASE: '/api/vehicles',
    BY_ID: (id: string) => `/api/vehicles/${id}`,
    FEATURED: '/api/vehicles/featured',
    SEARCH: '/api/vehicles/search'
  },
  MEDIA: {
    BASE: '/api/media',
    BY_ID: (id: string) => `/api/media/${id}`,
    UPLOAD: '/api/media/upload',
    BULK_UPLOAD: '/api/media/bulk-upload',
    BY_VEHICLE: (vehicleId: string) => `/api/media/vehicle/${vehicleId}`
  },
  ADMIN: {
    DASHBOARD: '/api/admin/dashboard',
    STATS: '/api/admin/stats',
    ACTIVITY_LOGS: '/api/admin/activity-logs',
    NOTIFICATIONS: '/api/admin/notifications'
  }
} as const;
