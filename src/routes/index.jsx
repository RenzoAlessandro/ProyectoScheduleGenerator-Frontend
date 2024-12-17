import { createBrowserRouter } from 'react-router-dom';

// project-imports
import MainRoutes from './MainRoutes';

// ==============================|| ROUTES RENDER ||============================== //

const router = createBrowserRouter([MainRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME,
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
    v7_startTransition: true,
  }
});

export default router;
