"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAuth = useAuthStore((state) => state.clearIsAuthenticated);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        setIsLoading(true);
        const sessionValid = await checkSession();
        
        if (sessionValid) {
          const user = await getMe();
          if (user) {
            setUser(user);
          } else {
            clearAuth();
            if (isPrivateRoute(pathname)) {
              router.push("/login");
            }
          }
        } else {
          clearAuth();
          if (isPrivateRoute(pathname)) {
            router.push("/login");
          }
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        clearAuth();
        if (isPrivateRoute(pathname)) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearAuth, pathname, router]);

  const isPrivateRoute = (path: string) => {
    const privateRoutes = ['/profile', 'notes'];
    return privateRoutes.some(route => path.startsWith(route));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (isPrivateRoute(pathname) && !isAuthenticated) {
    return null; 
  }

    return <>
        {children}
    </>;
};

export default AuthProvider;