
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, Eye, EyeOff } from "lucide-react";

interface ApiTokenInputProps {
  value: string;
  onChange: (token: string) => void;
}

export const ApiTokenInput = ({ value, onChange }: ApiTokenInputProps) => {
  const [showToken, setShowToken] = useState(false);

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden mb-6">
      <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 border-b border-white/20">
        <CardTitle className="flex items-center space-x-2 text-slate-700">
          <Key className="h-5 w-5" />
          <span>API Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          <Label htmlFor="apiToken" className="text-sm font-medium text-slate-700">
            Nucleus API Token
          </Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="apiToken"
                type={showToken ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter your Nucleus API token..."
                className="pl-10 pr-12 border-2 border-slate-200 focus:border-amber-500 transition-colors bg-white/50"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
              >
                {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Your API token will be stored locally in your browser for convenience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
