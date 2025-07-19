import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PhotoUploadStep = ({ data, onChange, errors }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const mockPhotos = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
  ];

  const photos = data.photos || mockPhotos;

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Simulate file upload and add to photos array
    const newPhotos = imageFiles.map((file, index) => 
      `https://images.unsplash.com/photo-${Date.now() + index}?w=800&h=600&fit=crop`
    );
    
    onChange({ ...data, photos: [...photos, ...newPhotos] });
  };

  const removePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    onChange({ ...data, photos: updatedPhotos });
  };

  const movePhoto = (fromIndex, toIndex) => {
    const updatedPhotos = [...photos];
    const [movedPhoto] = updatedPhotos.splice(fromIndex, 1);
    updatedPhotos.splice(toIndex, 0, movedPhoto);
    onChange({ ...data, photos: updatedPhotos });
  };

  const setMainPhoto = (index) => {
    const updatedPhotos = [...photos];
    const [mainPhoto] = updatedPhotos.splice(index, 1);
    updatedPhotos.unshift(mainPhoto);
    onChange({ ...data, photos: updatedPhotos });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Camera" size={20} className="mr-2 text-primary" />
          Property Photos
        </h3>
        
        <div className="mb-6">
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-smooth cursor-pointer
              ${dragOver 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-lg font-medium text-foreground mb-2">
              Upload Property Photos
            </h4>
            <p className="text-muted-foreground mb-4">
              Drag and drop photos here, or click to browse
            </p>
            <Button variant="outline" iconName="Plus" iconPosition="left">
              Add Photos
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Icon name="Check" size={16} className="mr-2 text-success" />
              High-quality images (min 1200px)
            </div>
            <div className="flex items-center">
              <Icon name="Check" size={16} className="mr-2 text-success" />
              Good lighting and clear views
            </div>
            <div className="flex items-center">
              <Icon name="Check" size={16} className="mr-2 text-success" />
              Multiple angles of each room
            </div>
          </div>
        </div>

        {photos.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">
              Uploaded Photos ({photos.length})
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video rounded-lg overflow-hidden border border-border">
                    <Image
                      src={photo}
                      alt={`Property photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      Main Photo
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth flex space-x-1">
                    {index !== 0 && (
                      <button
                        onClick={() => setMainPhoto(index)}
                        className="bg-background/80 hover:bg-background text-foreground p-1 rounded"
                        title="Set as main photo"
                      >
                        <Icon name="Star" size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => removePhoto(index)}
                      className="bg-destructive/80 hover:bg-destructive text-destructive-foreground p-1 rounded"
                      title="Remove photo"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth flex justify-between">
                    {index > 0 && (
                      <button
                        onClick={() => movePhoto(index, index - 1)}
                        className="bg-background/80 hover:bg-background text-foreground p-1 rounded"
                        title="Move left"
                      >
                        <Icon name="ChevronLeft" size={14} />
                      </button>
                    )}
                    {index < photos.length - 1 && (
                      <button
                        onClick={() => movePhoto(index, index + 1)}
                        className="bg-background/80 hover:bg-background text-foreground p-1 rounded ml-auto"
                        title="Move right"
                      >
                        <Icon name="ChevronRight" size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {errors.photos && (
          <p className="text-error text-sm mt-2">{errors.photos}</p>
        )}
      </div>
    </div>
  );
};

export default PhotoUploadStep;