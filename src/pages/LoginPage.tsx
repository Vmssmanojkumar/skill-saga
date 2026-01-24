import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Babai from "@/components/Babai";
import GameButton from "@/components/GameButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/courses";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login - in real app, integrate with backend
    setTimeout(() => {
      setIsLoading(false);
      navigate(redirectTo);
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, hsl(0 0% 10%) 0%, hsl(0 0% 4%) 70%)",
      }}
    >
      {/* Background glow */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(25 95% 53%) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Babai */}
        <div className="flex justify-center mb-6">
          <Babai 
            expression="happy"
            message="Nee progress save cheyyali ante login avvali ra! 🔐"
            size="md"
          />
        </div>

        {/* Login Card */}
        <div className="game-card p-8">
          <h1 className="text-3xl font-display font-bold text-center text-foreground mb-2">
            Welcome Back!
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Continue your learning journey
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="yourname@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-secondary border-border focus:border-primary h-12"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-secondary border-border focus:border-primary h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <GameButton 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "🎮 Start Playing"}
            </GameButton>
          </form>

          {/* Sign up link */}
          <p className="text-center mt-6 text-muted-foreground">
            New here?{" "}
            <Link 
              to={`/signup${redirectTo !== "/courses" ? `?redirect=${redirectTo}` : ""}`}
              className="text-primary hover:underline font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link 
            to="/home" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
