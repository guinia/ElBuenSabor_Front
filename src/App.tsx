import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './App.css'

const Layout = React.lazy(() => import('./components/layout/layout'));
const Router = React.lazy(() => import('./components/router'));
const Footer = React.lazy(() => import('./components/footer/footer'))

function App() {
  return(
    <React.Suspense fallback={<Spinner animation="border" />}>
      <BrowserRouter>
        <Layout />
        <Router />
        <Footer />
      </BrowserRouter>
    </React.Suspense>
  )
}

export default App;