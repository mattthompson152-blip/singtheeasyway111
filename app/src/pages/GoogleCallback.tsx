import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { trpc } from "@/providers/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Loader2 } from "lucide-react";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const { data, isLoading } = trpc.google.callback.useQuery(
    { code: code! },
    {
      enabled: !!code && !error,
      retry: false,
    },
  );

  useEffect(() => {
    if (data?.success && data.tokens) {
      localStorage.setItem("google_tokens", JSON.stringify(data.tokens));
      const timer = setTimeout(() => {
        navigate("/admin?tab=settings");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigate("/admin?tab=settings");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Google Calendar</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {isLoading && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-slate-600">Connecting to Google Calendar...</p>
            </div>
          )}

          {data?.success && (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Connected Successfully!</p>
                <p className="text-sm text-slate-500 mt-1">
                  Your Google Calendar is now synced. Redirecting to settings...
                </p>
              </div>
            </div>
          )}

          {(error || data?.success === false) && (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Connection Failed</p>
                <p className="text-sm text-slate-500 mt-1">
                  {error || data?.error || "Could not connect to Google Calendar."}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Redirecting back to settings...
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
