

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Settings, Filter } from "lucide-react";

interface SearchFormProps {
  onSearch: (keyword: string, applications: string[], linkTypes: string[], jurisdictions: string[]) => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [keyword, setKeyword] = useState("");
  const [selectedApplications, setSelectedApplications] = useState<string[]>(["jira", "confluence"]);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(["sierra", "cree"]);

  const applications = [
    { id: "jira", label: "JIRA", color: "text-blue-600" },
    { id: "confluence", label: "Confluence", color: "text-green-600" },
    { id: "bitbucket", label: "Bitbucket", color: "text-purple-600" },
    { id: "trello", label: "Trello", color: "text-orange-600" }
  ];

  const jurisdictions = [
    { id: "sierra", label: "Sierra", color: "text-red-600" },
    { id: "cree", label: "CREE", color: "text-blue-600" },
    { id: "apac", label: "APAC", color: "text-green-600" },
    { id: "emea", label: "EMEA", color: "text-purple-600" },
    { id: "americas", label: "Americas", color: "text-orange-600" }
  ];

  const handleApplicationChange = (applicationId: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, applicationId]);
    } else {
      setSelectedApplications(selectedApplications.filter(id => id !== applicationId));
    }
  };

  const handleJurisdictionChange = (jurisdictionId: string, checked: boolean) => {
    if (checked) {
      setSelectedJurisdictions([...selectedJurisdictions, jurisdictionId]);
    } else {
      setSelectedJurisdictions(selectedJurisdictions.filter(id => id !== jurisdictionId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim(), selectedApplications, [], selectedJurisdictions);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-b border-white/20">
        <CardTitle className="flex items-center space-x-2 text-slate-700">
          <Settings className="h-5 w-5" />
          <span>Search Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Search Input */}
          <div className="space-y-3">
            <Label htmlFor="keyword" className="text-lg font-semibold text-slate-700">
              Search Keyword
            </Label>
            <div className="flex space-x-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter keyword to search..."
                  className="pl-12 h-12 text-lg border-2 border-slate-200 focus:border-blue-500 transition-colors bg-white/50"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || !keyword.trim()}
                className="h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Filter Options - Applications and Jurisdictions side-by-side */}
          <div className="flex gap-6 space-x-4">
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-blue-500" />
                <Label className="text-lg font-semibold text-slate-700">Applications</Label>
              </div>
              <div className="space-y-3 p-4 bg-slate-50/50 rounded-lg border border-slate-200">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center space-x-3 p-2 hover:bg-white/60 rounded-md transition-colors">
                    <Checkbox
                      id={`app-${app.id}`}
                      checked={selectedApplications.includes(app.id)}
                      onCheckedChange={(checked) => 
                        handleApplicationChange(app.id, checked as boolean)
                      }
                      className="border-2"
                    />
                    <Label htmlFor={`app-${app.id}`} className={`font-medium cursor-pointer ${app.color}`}>
                      {app.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-purple-500" />
                <Label className="text-lg font-semibold text-slate-700">Jurisdictions</Label>
              </div>
              <div className="space-y-3 p-4 bg-slate-50/50 rounded-lg border border-slate-200">
                {jurisdictions.map((jurisdiction) => (
                  <div key={jurisdiction.id} className="flex items-center space-x-3 p-2 hover:bg-white/60 rounded-md transition-colors">
                    <Checkbox
                      id={`jurisdiction-${jurisdiction.id}`}
                      checked={selectedJurisdictions.includes(jurisdiction.id)}
                      onCheckedChange={(checked) => 
                        handleJurisdictionChange(jurisdiction.id, checked as boolean)
                      }
                      className="border-2"
                    />
                    <Label htmlFor={`jurisdiction-${jurisdiction.id}`} className={`font-medium cursor-pointer ${jurisdiction.color}`}>
                      {jurisdiction.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

