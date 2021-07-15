import React from 'react';
import SelectCompany from './pages/SelectCompany';
import ShowUsers from './pages/ShowUsers';
import { BrowserRouter, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

export default function Routes() {
    return (
        <CookiesProvider>
            <BrowserRouter>
            <Route path="/" exact component={SelectCompany} />
            <Route path="/showUsers" exact component={ShowUsers} />
            </BrowserRouter>
        </CookiesProvider>

    );
}