import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-8xl md:text-9xl font-bold text-gradient-primary mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Страница не найдена
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="gradient-primary text-primary-foreground">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                На главную
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contacts">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Связаться с нами
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
