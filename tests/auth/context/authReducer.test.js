
import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => {
    test('debe retornar el estado por defecto ', () => {
      
      const state = authReducer({ logged: false }, { });

        expect(state).toEqual({ logged: false });

    });

    test('debe llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload:{
                id: 'ABC',
                name:'pepe',
            }
        }
        const state = authReducer({ logged: false },action );

        expect(state).toEqual({
            logged:true,
            user: action.payload
        });
    });

    test('debe borrar el name del usuario y logged en false', () => {
     
        const state = { 
            logged: true, 
            user:{ 
                id:'abc',
                name:'pepe' 
            } 
        };

        const action =  {
          type: types.logout
        }

        const newState = authReducer( state, action );

        expect( newState ).toEqual({ logged: false });

    });
});