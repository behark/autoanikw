// User interface definition
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to format user's full name
export const formatUserName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

// Helper to get readable role name
export const getUserRoleName = (role: User['role'], t: any): string => {
  return t(`admin.userManager.roles.${role}`);
};

// Helper to get status badge type
export const getUserStatusBadgeType = (status: User['status']): 'success' | 'warning' | 'danger' | 'neutral' => {
  switch (status) {
    case 'active':
      return 'success';
    case 'pending':
      return 'warning';
    case 'inactive':
      return 'danger';
    default:
      return 'neutral';
  }
};
