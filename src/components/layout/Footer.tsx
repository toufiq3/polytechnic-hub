import { Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="px-4 md:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span>© {currentYear} Student Management System. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <span>Developed with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <a
              href="https://errorburner.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Errorburner
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
