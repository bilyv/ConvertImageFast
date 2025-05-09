
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

export interface UseImageResizeReturn {
  resizeDimensions: {width?: number; height?: number};
  maintainResizeAspectRatio: boolean;
  isCircularMode: boolean;
  circleDiameter: number;
  setResizeDimensions: React.Dispatch<React.SetStateAction<{width?: number; height?: number}>>;
  setMaintainResizeAspectRatio: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCircularMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCircleDiameter: (diameter: number) => void;
}

export interface UseImageConversionReturn {
  selectedFormat: FormatOption;
  quality: number;
  isConverting: boolean;
  setSelectedFormat: React.Dispatch<React.SetStateAction<FormatOption>>;
  setQuality: React.Dispatch<React.SetStateAction<number>>;
  handleConvert: () => Promise<void>;
  handleDownload: () => void;
}

export interface UseImageConverterReturn extends
  UseImageUploaderReturn,
  UseImageCropReturn,
  UseImageResizeReturn,
  UseImageConversionReturn {}
