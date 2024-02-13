import React from 'react';
import { RouteChangesProvider } from 'nextjs-router-events';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <RouteChangesProvider>{children}</RouteChangesProvider>;
};

export default Layout;
