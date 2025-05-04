
import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { HomeIcon } from 'lucide-react';

interface BreadcrumbItem {
  title: string;
  href: string;
  isCurrentPage?: boolean;
}

const BreadcrumbNav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Get breadcrumb items based on current path
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { title: 'Home', href: '/' }
    ];
    
    let currentPath = '';
    
    // Generate breadcrumbs based on the URL path
    pathnames.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // Format the breadcrumb title (capitalize, replace hyphens with spaces)
      const formattedTitle = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        title: formattedTitle,
        href: currentPath,
        isCurrentPage: index === pathnames.length - 1
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = getBreadcrumbs();
  
  // If we're on the homepage, don't show breadcrumbs
  if (location.pathname === '/') {
    return null;
  }
  
  return (
    <Breadcrumb className="px-4 py-2">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            <BreadcrumbItem>
              {breadcrumb.isCurrentPage ? (
                <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={breadcrumb.href}>
                  {index === 0 ? <HomeIcon className="h-3.5 w-3.5" /> : breadcrumb.title}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
