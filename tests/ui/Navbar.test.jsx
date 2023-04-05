import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { Navbar } from "../../src/ui/components/Navbar";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom',() =>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}));

describe('Pruebas en <Navbar />', () => {

   const contextValue = {
        logged: true,
        user: {
            id:'123',
            name:'pepe'
        },
        logout: jest.fn()
    }
    beforeEach(()=> jest.clearAllMocks () );

    test('debe aparecer el nombre del usuario', () => {

     render(
        <AuthContext.Provider value = { contextValue }>
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        </AuthContext.Provider>
     );
     expect(screen.getByText('pepe')).toBeTruthy();
      
    });

    test('debe llamar al logout y navigate cuando se hace click en el boton', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toBeCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith("/login", { "replace": true });

      
    });
    
    
    
});