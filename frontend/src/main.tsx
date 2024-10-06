import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@emotion/react';
import ErrorPage from './components/ErrorPage.tsx';
import CircularProgress from '@mui/material/CircularProgress';

// Lazy load different views to improve bundle size
const Root = lazy(() => import('./routes/root.tsx'));
const FillForm = lazy(() => import('./routes/fill-form/fill-form.tsx'));
const ViewForms = lazy(() => import('./routes/view-forms/view-forms.tsx'));
const ViewForm = lazy(() => import('./routes/view-form/view-form.tsx'));


const theme = createTheme({
  palette: {
    primary: {
      main: '#f77643',
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: '0',
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<CircularProgress thickness={5} />}>
        <Root />
      </Suspense>
    ),
    errorElement: <ErrorPage text="Jokin meni pieleen" />
  },
  {
    path: "/fill-form/:formSlug",
    element: (
      <Suspense fallback={<CircularProgress thickness={5} />}>
        <FillForm />
      </Suspense>
    )
  },
  {
    path: "/view-forms",
    element: (
      <Suspense fallback={<CircularProgress thickness={5} />}>
        <ViewForms />
      </Suspense>
    )
  },

  {
    path: "/view-forms/:formId",
    element: (

      <Suspense fallback={<CircularProgress thickness={5} />}>
        <ViewForm />
      </Suspense>
    )
  }
]);

const client = new ApolloClient({
  uri: 'https://localhost:7500/graphql',
  cache: new InMemoryCache(),
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>,
)
