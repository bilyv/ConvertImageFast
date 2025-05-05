
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

interface FormatMismatchAlertProps {
  formatMismatchError: boolean;
  hasMultipleFormats: boolean;
}

const FormatMismatchAlert: React.FC<FormatMismatchAlertProps> = ({ 
  formatMismatchError, 
  hasMultipleFormats 
}) => {
  if (!formatMismatchError && !hasMultipleFormats) return null;
  
  if (formatMismatchError) {
    return (
      <Alert className="mt-4 bg-red-50 border-red-200">
        <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
        <AlertDescription className="text-red-800">
          <strong>Error:</strong> Images have different formats. Please upload images with the same format for batch conversion.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert className="mt-4 bg-amber-50 border-amber-200">
      <AlertDescription className="text-amber-800">
        <strong>Notice:</strong> You've uploaded images with different formats. All selected images will be converted to the same output format.
      </AlertDescription>
    </Alert>
  );
};

export default FormatMismatchAlert;
