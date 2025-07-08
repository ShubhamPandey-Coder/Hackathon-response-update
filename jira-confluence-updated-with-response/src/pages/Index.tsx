
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchForm } from "@/components/SearchForm";
import { SearchResults } from "@/components/SearchResults";
import { PreviewDialog } from "@/components/PreviewDialog";
import { LogoutButton } from "@/components/LogoutButton";
import { ApiTokenInput } from "@/components/ApiTokenInput";
import { Search, Database, FileText } from "lucide-react";
import { fetchCitations, Citation } from "@/services/nucleusApi";
import { useToast } from "@/hooks/use-toast";

export interface SearchResult {
  id: string;
  title: string;
  type: "jira" | "confluence" | "cs";
  url: string;
  summary?: string;
  status?: string;
  createdDate?: string;
  application: string;
  text?: string;
  documentName?: string;
}

const Index = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [apiToken, setApiToken] = useState(() => localStorage.getItem('nucleusApiToken') || '');
  const { toast } = useToast();

  const mapCitationToSearchResult = (citation: Citation, index: number): SearchResult => {
    return {
      id: citation.uid || `citation-${index}`,
      title: citation.document.documentName || `Document ${index + 1}`,
      type: "cs" as const,
      url: citation.referenceUrl || "#",
      summary: citation.text,
      application: "Nucleus API",
      text: citation.text,
      documentName: citation.document.documentName,
      createdDate: new Date().toISOString()
    };
  };

  const handleSearch = async (keyword: string, applications: string[], linkTypes: string[], jurisdictions: string[]) => {
    if (!apiToken.trim()) {
      toast({
        title: "API Token Required",
        description: "Please enter your Nucleus API token to search.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    console.log("Searching for:", keyword, "using Nucleus API");
    
    try {
      const citations = await fetchCitations(keyword, apiToken);
      console.log("API Response citations:", citations);
      
      const mappedResults = citations.map((citation, index) => 
        mapCitationToSearchResult(citation, index)
      );
      
      setSearchResults(mappedResults);
      
      toast({
        title: "Search Complete",
        description: `Found ${mappedResults.length} citations`,
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Failed",
        description: "Failed to fetch data from the API. Please check your token and try again.",
        variant: "destructive"
      });
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemClick = (item: SearchResult) => {
    setSelectedItem(item);
    setIsPreviewOpen(true);
  };

  const handleApiTokenChange = (token: string) => {
    setApiToken(token);
    localStorage.setItem('nucleusApiToken', token);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          {/* Logout Button */}
          <div className="flex justify-end mb-6">
            <LogoutButton />
          </div>
          
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
                <Search className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              RegTech Insight Search
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover and explore regulatory content across JIRA tickets, Confluence pages, and compliance links by jurisdiction
            </p>
            
            {/* Feature Icons */}
            <div className="flex justify-center items-center space-x-8 mt-8">
              <div className="flex items-center space-x-2 text-slate-600">
                <Database className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">JIRA Integration</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Confluence Pages</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Search className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">Smart Search</span>
              </div>
            </div>
          </div>

          <ApiTokenInput 
            value={apiToken}
            onChange={handleApiTokenChange}
          />
          
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <Tabs defaultValue="results" className="mt-8">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <TabsTrigger 
                value="results" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Search Results
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Search History
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="results" className="mt-6">
            <SearchResults 
              results={searchResults}
              isLoading={isLoading}
              onItemClick={handleItemClick}
            />
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center border border-white/20">
              <Search className="h-16 w-16 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Search History</h3>
              <p className="text-slate-500">Your search history will appear here once you start searching</p>
            </div>
          </TabsContent>
        </Tabs>

        <PreviewDialog
          item={selectedItem}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      </div>
    </div>
  );
};

export default Index;
