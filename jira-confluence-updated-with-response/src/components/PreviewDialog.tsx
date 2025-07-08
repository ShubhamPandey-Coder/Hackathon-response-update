
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchResult } from "@/pages/Index";
import { ExternalLink, Calendar, Tag, FileText, X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PreviewDialogProps {
  item: SearchResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewDialog = ({ item, isOpen, onClose }: PreviewDialogProps) => {
  if (!item) return null;

  const getTypeGradient = (type: string) => {
    switch (type) {
      case "jira":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
      case "confluence":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white";
      case "cs":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader className="border-b border-slate-200 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-4 text-slate-800 leading-tight">
                {item.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className={`${getTypeGradient(item.type)} border-0 shadow-sm px-3 py-1`}>
                  {item.application}
                </Badge>
                <Badge variant="outline" className="border-slate-300 px-3 py-1">
                  {item.id}
                </Badge>
                {item.status && (
                  <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-3 py-1">
                    {item.status}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700"
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in {item.application}
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Item Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 p-6 bg-slate-50/50 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-700 mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-600">Type:</span>
                  <span className="capitalize text-slate-800">{item.type}</span>
                </div>
                
                {item.createdDate && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="font-medium text-slate-600">Created:</span>
                    <span className="text-slate-800">{new Date(item.createdDate).toLocaleDateString()}</span>
                  </div>
                )}
                
                {item.status && (
                  <div className="flex items-center space-x-3">
                    <Tag className="h-4 w-4 text-slate-500" />
                    <span className="font-medium text-slate-600">Status:</span>
                    <span className="text-slate-800">{item.status}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 p-6 bg-slate-50/50 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-700 mb-4">Link Information</h3>
              <div>
                <span className="font-medium text-slate-600 block mb-2">URL:</span>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm break-all hover:underline"
                  >
                    {item.url}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          {item.summary && (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                Summary
              </h3>
              <p className="text-slate-700 leading-relaxed">{item.summary}</p>
            </div>
          )}

          {/* Preview Frame */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 flex items-center">
              <ExternalLink className="h-5 w-5 mr-2 text-purple-500" />
              Preview
            </h3>
            <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-lg">
              <AspectRatio ratio={16 / 10} className="bg-slate-100">
                <iframe
                  src={item.url}
                  className="w-full h-full border-0"
                  title={`Preview of ${item.title}`}
                  sandbox="allow-same-origin allow-scripts allow-forms"
                />
              </AspectRatio>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Preview may not be available due to security restrictions. 
                Click "Open in {item.application}" above to view the full content.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
