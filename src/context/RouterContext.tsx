import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useState, useCallback } from 'react';

export type RouteName = 'home' | 'academy' | 'community' | 'resources' | 'contact' | 'team';

interface RouterContextValue {
  route: RouteName;
  params: Record<string, string>;
  navigate: (to: RouteName, params?: Record<string, string>) => void;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

function parseHash(): { route: RouteName; params: Record<string, string> } {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [path, query] = hash.split('?');
  const segments = path.split('/').filter(Boolean);
  const route = (segments[0] as RouteName) || 'home';
  const params: Record<string, string> = {};
  if (query) {
    new URLSearchParams(query).forEach((v, k) => {
      params[k] = v;
    });
  }
  return { route, params };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(parseHash());

  useEffect(() => {
    const onHashChange = () => {
      setState(parseHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) window.location.hash = '#/';
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to: RouteName, params?: Record<string, string>) => {
    let hash = `#/${to === 'home' ? '' : to}`;
    if (params && Object.keys(params).length) {
      const sp = new URLSearchParams(params);
      hash += `?${sp.toString()}`;
    }
    window.location.hash = hash;
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
