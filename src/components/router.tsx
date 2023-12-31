import { Routes, Route } from 'react-router-dom';
import * as React from 'react';

const AdminRubroProducto = React.lazy(() => import('../pages/admin/adminRubroProducto'));
const AdminPersona = React.lazy(() => import('../pages/admin/adminPersona'));
const AdminArticuloInsumo = React.lazy(() => import('../pages/admin/adminArticuloInsumo'));
const AdminUnidadMedida = React.lazy(() => import('../pages/admin/adminUnidadMedida'));
const AdminRubroArticuloInsumo = React.lazy(() => import('../pages/admin/adminRubroArticuloInsumo'));
const AdminArticuloManufacturado = React.lazy(()=> import('../pages/admin/adminArticuloManufacturado'));
const Home = React.lazy(() => import('../pages/home/home'));
const Login = React.lazy(() => import('../pages/login/login'));
const PrivateRoute = React.lazy(() => import('./privateRoute'));
const Register = React.lazy(() => import('../pages/register/register'));

const Router: React.FC = () => (
    <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<PrivateRoute element={<AdminPersona />} />} path="/admin/adminPersona" />
        <Route element={<PrivateRoute element={<AdminArticuloManufacturado/>} /> } path="/admin/adminArticuloManufacturado"/>
        <Route element={<PrivateRoute element={<AdminArticuloInsumo />} />} path="/admin/adminArticuloInsumo" />
        <Route element={<PrivateRoute element={<AdminUnidadMedida />} />} path="/admin/adminUnidadMedida" />
        <Route element={<PrivateRoute element={<AdminRubroArticuloInsumo />} />} path="/admin/adminRubroArticuloInsumo" />
        <Route element={<PrivateRoute element={<AdminRubroProducto/>} />} path="/admin/adminRubroProducto" />
    </Routes>
);

export default Router;