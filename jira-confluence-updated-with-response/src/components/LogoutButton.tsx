
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="flex items-center space-x-2 bg-white/80 hover:bg-white/90 border-slate-200 text-slate-700"
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  );
};
