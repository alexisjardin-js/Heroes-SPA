import { types } from "../../../src/auth/types/types";


describe('Pruebas en los types', () => {

    test('debe regresar estos types', () => {

        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        });
      
    });
    
    
});