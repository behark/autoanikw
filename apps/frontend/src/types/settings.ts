export interface SiteSetting {
  _id: string;
  key: string;
  value: string | number | boolean | object;
  group: SettingGroup;
  label: string;
  description?: string;
  type: SettingType;
  options?: SettingOption[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SettingGroup = 
  | 'general'
  | 'contact'
  | 'social'
  | 'seo'
  | 'appearance'
  | 'localization'
  | 'advanced';

export type SettingType = 
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'select'
  | 'multiselect'
  | 'image'
  | 'color';

export interface SettingOption {
  label: string;
  value: string;
}

export interface SettingsFormData {
  [key: string]: string | number | boolean | string[];
}

export interface SettingsResponse {
  success: boolean;
  settings: SiteSetting[];
  message?: string;
}

export interface SettingUpdateResponse {
  success: boolean;
  setting?: SiteSetting;
  message?: string;
}

// Default settings organized by group
export const defaultSettings: Record<SettingGroup, Partial<SiteSetting>[]> = {
  general: [
    {
      key: 'site_name',
      value: 'Auto Ani',
      group: 'general',
      label: 'Site Name',
      description: 'The name of your website',
      type: 'text',
      isPublic: true
    },
    {
      key: 'site_description',
      value: 'Premium vehicle marketplace in Albania',
      group: 'general',
      label: 'Site Description',
      description: 'A brief description of your website',
      type: 'textarea',
      isPublic: true
    },
    {
      key: 'maintenance_mode',
      value: false,
      group: 'general',
      label: 'Maintenance Mode',
      description: 'Enable maintenance mode to display a maintenance message to visitors',
      type: 'boolean',
      isPublic: true
    }
  ],
  contact: [
    {
      key: 'contact_email',
      value: 'info@autoani.al',
      group: 'contact',
      label: 'Contact Email',
      description: 'Primary contact email address',
      type: 'text',
      isPublic: true
    },
    {
      key: 'contact_phone',
      value: '+355 68 123 4567',
      group: 'contact',
      label: 'Contact Phone',
      description: 'Primary contact phone number',
      type: 'text',
      isPublic: true
    },
    {
      key: 'contact_address',
      value: 'Rruga e Durrësit, Tiranë, Albania',
      group: 'contact',
      label: 'Contact Address',
      description: 'Physical address of your business',
      type: 'textarea',
      isPublic: true
    }
  ],
  social: [
    {
      key: 'facebook_url',
      value: 'https://facebook.com/autoani',
      group: 'social',
      label: 'Facebook URL',
      description: 'Your Facebook page URL',
      type: 'text',
      isPublic: true
    },
    {
      key: 'instagram_url',
      value: 'https://instagram.com/autoani',
      group: 'social',
      label: 'Instagram URL',
      description: 'Your Instagram profile URL',
      type: 'text',
      isPublic: true
    },
    {
      key: 'youtube_url',
      value: '',
      group: 'social',
      label: 'YouTube URL',
      description: 'Your YouTube channel URL',
      type: 'text',
      isPublic: true
    }
  ],
  seo: [
    {
      key: 'meta_title',
      value: 'Auto Ani - Premium Vehicle Marketplace',
      group: 'seo',
      label: 'Default Meta Title',
      description: 'Default page title for SEO',
      type: 'text',
      isPublic: true
    },
    {
      key: 'meta_description',
      value: 'Find your dream car at Auto Ani, Albania\'s premium vehicle marketplace with quality new and used cars.',
      group: 'seo',
      label: 'Default Meta Description',
      description: 'Default meta description for SEO',
      type: 'textarea',
      isPublic: true
    },
    {
      key: 'google_analytics_id',
      value: '',
      group: 'seo',
      label: 'Google Analytics ID',
      description: 'Your Google Analytics tracking ID',
      type: 'text',
      isPublic: false
    }
  ],
  appearance: [
    {
      key: 'primary_color',
      value: '#0052cc',
      group: 'appearance',
      label: 'Primary Color',
      description: 'Main brand color for buttons and highlights',
      type: 'color',
      isPublic: true
    },
    {
      key: 'logo_url',
      value: '/images/logo.png',
      group: 'appearance',
      label: 'Logo URL',
      description: 'URL to your site logo image',
      type: 'image',
      isPublic: true
    },
    {
      key: 'favicon_url',
      value: '/favicon.ico',
      group: 'appearance',
      label: 'Favicon URL',
      description: 'URL to your site favicon',
      type: 'image',
      isPublic: true
    }
  ],
  localization: [
    {
      key: 'default_language',
      value: 'sq-AL',
      group: 'localization',
      label: 'Default Language',
      description: 'Default language for the website',
      type: 'select',
      options: [
        { label: 'Albanian', value: 'sq-AL' },
        { label: 'English', value: 'en' }
      ],
      isPublic: true
    },
    {
      key: 'date_format',
      value: 'DD/MM/YYYY',
      group: 'localization',
      label: 'Date Format',
      description: 'Default date format for display',
      type: 'select',
      options: [
        { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
        { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
        { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }
      ],
      isPublic: true
    },
    {
      key: 'currency',
      value: 'EUR',
      group: 'localization',
      label: 'Currency',
      description: 'Default currency for prices',
      type: 'select',
      options: [
        { label: 'Euro (€)', value: 'EUR' },
        { label: 'Albanian Lek (ALL)', value: 'ALL' },
        { label: 'US Dollar ($)', value: 'USD' }
      ],
      isPublic: true
    }
  ],
  advanced: [
    {
      key: 'items_per_page',
      value: 12,
      group: 'advanced',
      label: 'Items Per Page',
      description: 'Number of items to display per page in listings',
      type: 'number',
      isPublic: true
    },
    {
      key: 'enable_user_registration',
      value: true,
      group: 'advanced',
      label: 'Enable User Registration',
      description: 'Allow new users to register on the website',
      type: 'boolean',
      isPublic: false
    },
    {
      key: 'api_key',
      value: '',
      group: 'advanced',
      label: 'API Key',
      description: 'API key for external service integrations',
      type: 'text',
      isPublic: false
    }
  ]
};
