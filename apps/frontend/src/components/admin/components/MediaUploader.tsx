import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'next-i18next';
import adminAPI from '../../../services/adminAPI';

interface MediaUploaderProps {
  onUploadComplete: (media: any[]) => void;
}

const MediaUploader = ({ onUploadComplete }: MediaUploaderProps) => {
  const { t } = useTranslation('common');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      setError(t('admin.mediaLibrary.noFilesSelected'));
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        return newProgress >= 95 ? 95 : newProgress;
      });
    }, 300);

    try {
      const result = await adminAPI.uploadMedia(acceptedFiles as unknown as FileList);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        if (result.success && result.media) {
          onUploadComplete(result.media);
        }
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      setIsUploading(false);
      setError(t('admin.mediaLibrary.uploadError'));
      console.error('Upload error:', err);
    }
  }, [t, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div className="mb-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragActive ? 'bg-blue-50 border-blue-500' : 'border-gray-300'
        } cursor-pointer transition-colors duration-200`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="space-y-3">
            <div className="text-blue-600 font-medium">{t('admin.mediaLibrary.uploading')}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">
              {t('admin.mediaLibrary.uploadingProgress', { progress: uploadProgress })}
            </div>
          </div>
        ) : (
          <>
            <div className="text-4xl mb-2">📂</div>
            <p className="font-medium">
              {isDragActive
                ? t('admin.mediaLibrary.dropFilesHere')
                : t('admin.mediaLibrary.dragAndDrop')}
              {!isDragActive && (
                <span className="text-blue-600 ml-1 hover:underline">
                  {t('admin.mediaLibrary.browseFiles')}
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {t('admin.mediaLibrary.dropzone.acceptedFileTypes')}
            </p>
            <p className="text-sm text-gray-500">
              {t('admin.mediaLibrary.dropzone.maxFileSize')}
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="mt-2 text-red-600 text-sm">{error}</div>
      )}
    </div>
  );
};

export default MediaUploader;
