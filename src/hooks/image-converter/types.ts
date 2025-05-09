
import { FormatOption } from '@/components/ConversionOptions';
import { CropArea } from '@/utils/cropUtils';
import { ImageFile } from '@/utils/imageUtils';

export interface UseImageUploaderReturn {
  imageFile: ImageFile | null;
  handleFileUpload: (uploadedFiles: File[]) => void;
  handleRemoveImage: () => void;
}

export interface UseImageCropReturn {
  isCropping: boolean;
  cropResult: string | null;
  cropData: CropArea | null;
  handleStartCropping: () => void;
  handleCropComplete: (croppedImageUrl: string, cropArea: CropArea) => void;
  handleCancelCrop: () => void;
}



export interface UseImageConversionReturn {
  selectedFormat: FormatOption | null;
  quality: number;
  isConverting: boolean;
  setSelectedFormat: React.Dispatch<React.SetStateAction<FormatOption | null>>;
  setQuality: React.Dispatch<React.SetStateAction<number>>;
  handleConvert: () => Promise<void>;
  handleDownload: () => void;
  cleanupObjectUrls: () => void;
}

export interface UseImageConverterReturn extends
  UseImageUploaderReturn,
  UseImageCropReturn,
  UseImageConversionReturn {}
