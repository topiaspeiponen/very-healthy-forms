import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css'
/* existing imports */
import Root from './routes/root.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FillForm from './routes/fill-form/fill-form.tsx';
import ViewForms from './routes/view-forms/view-forms.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/fill-form/:formSlug",
    element: <FillForm />
  },
  {
    path: "/view-forms",
    element: <ViewForms />
  }
]);

const client = new ApolloClient({
  uri: 'http://localhost:5198/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
)
