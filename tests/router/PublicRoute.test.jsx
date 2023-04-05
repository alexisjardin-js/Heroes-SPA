import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";

describe('Pruebas en <PublicRoute />', () => {

    test('debe mostrar el children si no esta autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        expect(screen.getByText('ruta publica')).toBeTruthy();

    });

    test('debe navegar si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'pepe'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>ruta publica</h1>
                            </PublicRoute>
                        } />
                        <Route path="marvel" element={<h1>Pagina marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Pagina marvel') ).toBeTruthy();


    });



});