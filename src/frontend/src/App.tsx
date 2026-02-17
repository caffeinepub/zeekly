import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import PostsListPage from './pages/PostsListPage';
import PostDetailPage from './pages/PostDetailPage';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts',
  component: PostsListPage,
});

const postDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/$slug',
  component: PostDetailPage,
});

const routeTree = rootRoute.addChildren([indexRoute, postsRoute, postDetailRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
