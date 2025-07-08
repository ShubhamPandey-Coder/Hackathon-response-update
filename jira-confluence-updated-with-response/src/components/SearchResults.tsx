
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchResult } from "@/pages/Index";
import { ExternalLink, FileText, Bug, BookOpen, Calendar, Eye } from "lucide-react";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  onItemClick: (item: SearchResult) => void;
}

export const SearchResults = ({ results, isLoading, onItemClick }: SearchResultsProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "jira":
        return <Bug className="h-5 w-5" />;
      case "confluence":
        return <BookOpen className="h-5 w-5" />;
      case "cs":
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

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

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "in progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "open":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Searching...</h3>
            <p className="text-slate-500">Please wait while we search the Nucleus API</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-12">
          <div className="text-center">
            <div className="bg-slate-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <FileText className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Citations Found</h3>
            <p className="text-slate-500">Try searching with different keywords or check your API token</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-700">Citation Results</h2>
        <Badge 
          variant="outline" 
          className="text-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0"
        >
          {results.length} citations found
        </Badge>
      </div>

      <div className="grid gap-6">
        {results.map((result, index) => (
          <Card key={result.id} className="group hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 overflow-hidden transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-3 rounded-lg ${getTypeGradient(result.type)} shadow-lg`}>
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
                      {result.documentName || result.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge className={`${getTypeGradient(result.type)} border-0 shadow-sm`}>
                        {result.application}
                      </Badge>
                      <Badge variant="outline" className="border-slate-300">
                        ID: {result.id}
                      </Badge>
                      {result.status && (
                        <Badge className={`${getStatusColor(result.status)} border`}>
                          {result.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hover:bg-blue-50 hover:text-blue-600"
                >
                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {result.text && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-600 mb-2">Citation Text:</h4>
                  <p className="text-slate-700 mb-2 leading-relaxed bg-slate-50 p-3 rounded-lg border">
                    {result.text}
                  </p>
                </div>
              )}
              <div className="flex justify-between items-center">
                {result.createdDate && (
                  <div className="flex items-center space-x-2 text-slate-500">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {new Date(result.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onItemClick(result)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 shadow-md"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
