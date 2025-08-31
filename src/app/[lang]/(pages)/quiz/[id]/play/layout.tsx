import React from 'react';

// Global RouteChangesProvider is already applied in `(pages)/layout.tsx`.
// Avoid nesting another provider here to prevent duplicate route events.
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
