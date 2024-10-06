import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css'
import Root from './routes/root.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FillForm from './routes/fill-form/fill-form.tsx';
import ViewForms from './routes/view-forms/view-forms.tsx';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@emotion/react';
import ViewForm from './routes/view-form/view-form.tsx';
import ErrorPage from './components/ErrorPage.tsx';

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
    element: <Root />,
    errorElement: <ErrorPage text="Jokin meni pieleen" />
  },
  {
    path: "/fill-form/:formSlug",
    element: <FillForm />
  },
  {
    path: "/view-forms",
    element: <ViewForms />,
  },

  {
    path: "/view-forms/:formId",
    element: <ViewForm />
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
