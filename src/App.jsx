import { RouterProvider } from 'react-router-dom';

import router from './routes';
import ThemeCustomization from './themes';

import Locales from './components/Locales';
import ScrollTop from './components/ScrollTop';
import Snackbar from './components/@extended/Snackbar';
import Notistack from './components/third-party/Notistack';
import Customization from './components/Customization';

// auth-provider
import { JWTProvider as AuthProvider } from './contexts/JWTContext';

export default function App() {
  return (
    <ThemeCustomization>
      <Locales>
        <ScrollTop>
          <AuthProvider>
            <>
              <Notistack>
                <RouterProvider
                  future={{
                    v7_startTransition: true,
                  }}
                  router={router}
                />
                <Customization />
                <Snackbar />
              </Notistack>
            </>
          </AuthProvider>
        </ScrollTop>
      </Locales>
    </ThemeCustomization>
  );
}
