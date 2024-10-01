import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
    path: "/fill-form",
    element: <FillForm />
  },
  {
    path: "/view-forms",
    element: <ViewForms />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
