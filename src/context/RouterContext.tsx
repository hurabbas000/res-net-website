import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useState, useCallback } from 'react';

export type RouteName =
  | 'home'
  | 'academy'
  | 'community'
  | 'resources'
  | 'contact'
  | 'team'
  | 'admin'
  | 'admin-login'
  | 'events'
  | 'citation';

interface RouterContextValue {
  route: RouteName;
  params: Record<string, string>;
  navigate: (to: RouteName, params?: Record<string, string>) => void;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

const routeNames = new Set<RouteName>([
  'home',
  'academy',
  'community',
  'resources',
  'contact',
  'team',
  'admin',
  'admin-login',
  'events',
  'citation',
]);

function parseLocation(): { route: RouteName; params: Record<string, string> } {
  const legacyHash = window.location.hash.startsWith('#/')
    ? window.location.hash.slice(2)
    : '';
  const routePath = legacyHash || window.location.pathname.replace(/^\/+|\/+$/g, '');
  const pathSegments = routePath.split('?')[0].split('/').filter(Boolean);
  const routeSegment = pathSegments[0] === 'index.html' ? '' : pathSegments[0];
  const route = routeNames.has(routeSegment as RouteName)
    ? (routeSegment as RouteName)
    : 'home';
  const params: Record<string, string> = {};
  const query = legacyHash
    ? legacyHash.split('?')[1]
    : window.location.search.slice(1);
  if (query) new URLSearchParams(query).forEach((value, key) => {
    params[key] = value;
  });
  return { route, params };
}

function getRoutePath(to: RouteName, params?: Record<string, string>) {
  const path = to === 'home' ? '/' : `/${to}`;
  if (!params || !Object.keys(params).length) return path;
  return `${path}?${new URLSearchParams(params).toString()}`;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(parseLocation);

  useEffect(() => {
    const onPopState = () => {
      setState(parseLocation());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (window.location.hash.startsWith('#/')) {
      const initialState = parseLocation();
      window.history.replaceState(
        null,
        '',
        getRoutePath(initialState.route, initialState.params),
      );
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: RouteName, params?: Record<string, string>) => {
    window.history.pushState(null, '', getRoutePath(to, params));
    setState({ route: to, params: params ?? {} });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <RouterContext.Provider value={{ route: state.route, params: state.params, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
