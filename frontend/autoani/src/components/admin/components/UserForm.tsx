import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { User } from '../../../types/user';
import adminAPI from '../../../services/adminAPI';

interface UserFormProps {
  userId?: string;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userId, onCancel }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'editor',
    status: 'active',
    sendInvite: true
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      
      setIsLoading(true);
      try {
        const user = await adminAPI.getUserById(userId);
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          password: '',
          confirmPassword: '',
          role: user.role || 'editor',
          status: user.status || 'active',
          sendInvite: false
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(t('admin.userManager.messages.error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = t('admin.userManager.form.requiredField');
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = t('admin.userManager.form.requiredField');
    }
    
    if (!formData.email.trim()) {
      errors.email = t('admin.userManager.form.requiredField');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('admin.userManager.form.invalidEmail');
    }
    
    // Validate password only for new users or if password field is not empty
    if (!userId || formData.password) {
      if (!userId && !formData.password) {
        errors.password = t('admin.userManager.form.requiredField');
      } else if (formData.password && formData.password.length < 8) {
        errors.password = t('admin.userManager.form.passwordRequirements');
      }
      
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = t('admin.userManager.form.passwordMismatch');
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    setError('');
    
    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role as User['role'],
        status: formData.status as User['status']
      };
      
      // Add password if provided
      if (formData.password) {
        (userData as any).password = formData.password;
      }
      
      if (userId) {
        // Update existing user
        await adminAPI.updateUser(userId, userData);
        router.push('/admin/users');
      } else {
        // Create new user
        await adminAPI.createUser(userData as any);
        router.push('/admin/users');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      setError(t('admin.userManager.messages.error'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
      <h2 className="text-xl font-semibold mb-6">
        {userId ? t('admin.userManager.form.editUser') : t('admin.userManager.form.addUser')}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                {t('admin.userManager.form.firstName')}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  validationErrors.firstName ? 'border-red-500' : 'border-neutral-300'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {validationErrors.firstName && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                {t('admin.userManager.form.lastName')}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  validationErrors.lastName ? 'border-red-500' : 'border-neutral-300'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {validationErrors.lastName && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                {t('admin.userManager.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  validationErrors.email ? 'border-red-500' : 'border-neutral-300'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-neutral-700 mb-1">
                {t('admin.userManager.form.role')}
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="admin">{t('admin.userManager.roles.admin')}</option>
                <option value="manager">{t('admin.userManager.roles.manager')}</option>
                <option value="editor">{t('admin.userManager.roles.editor')}</option>
                <option value="viewer">{t('admin.userManager.roles.viewer')}</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                {t('admin.userManager.form.password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  validationErrors.password ? 'border-red-500' : 'border-neutral-300'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {userId && (
                <p className="mt-1 text-xs text-neutral-500">
                  {t('admin.userManager.form.passwordHelp')}
                </p>
              )}
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                {t('admin.userManager.form.confirmPassword')}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  validationErrors.confirmPassword ? 'border-red-500' : 'border-neutral-300'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">
                {t('admin.userManager.form.status')}
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="active">{t('admin.userManager.status.active')}</option>
                <option value="inactive">{t('admin.userManager.status.inactive')}</option>
                <option value="pending">{t('admin.userManager.status.pending')}</option>
              </select>
            </div>
            
            {!userId && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sendInvite"
                  name="sendInvite"
                  checked={formData.sendInvite}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="sendInvite" className="ml-2 block text-sm text-neutral-700">
                  {t('admin.userManager.form.sendInvite')}
                </label>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 border-t border-neutral-200 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
            >
              {t('admin.userManager.form.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSaving && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{t('admin.userManager.form.save')}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserForm;
