import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/atoms/sidebar';
import { Separator } from '@/components/atoms/separator';
import { AppSidebar } from '@/components/app-sidebar';
import { Outlet, useLocation } from 'react-router';
import { Fragment } from 'react';

import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  Breadcrumb,
} from '@/components/atoms/breadcrumb';

export function App() {
  const { pathname } = useLocation();

  const pathGroup = pathname.split('/').filter(Boolean);
  const lastItem = pathGroup.pop();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {pathGroup.map((item) => (
                <Fragment key={item}>
                  <BreadcrumbItem className="hidden md:block capitalize">
                    <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </Fragment>
              ))}
              <BreadcrumbItem key={lastItem} className="capitalize">
                <BreadcrumbPage>{lastItem}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
