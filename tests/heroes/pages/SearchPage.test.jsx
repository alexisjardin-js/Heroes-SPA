const { render, screen, fireEvent } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");
const { SearchPage } = require("../../../src/heroes/pages/SearchPage");

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}));

describe('Pruebas en <SearchPage />', () => {

    beforeEach(()=> jest.clearAllMocks() );

    test('debe mostrarse correctamente con valores por defecto', () => {


      const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

      expect ( container ).toMatchSnapshot();
    });

    test('debe mostrar a batman y el input con el valor del queryString', () => {


         render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        const input = screen.getByRole( 'textbox' );
        expect( input.value ).toBe( 'batman' );
        
        const img = screen.getByRole( 'img' );
        expect(img.src).toContain('http://localhost/heroes/dc-batman.jpg' );

        const alertDanger = screen.getByLabelText('div-search');
        expect(alertDanger.style.display).toBe( 'none' );

    });

    test('debe mostrar un error si el hero no se encuentra', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=ba123']}>
                <SearchPage />
            </MemoryRouter>
        );
        const alertDanger = screen.getByLabelText('div-search2');
        expect(alertDanger.style.display).toBe('');

    });

    test('debe llamar el navigate a la pantalla nueva', () => {

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {name:'searchText',value:'superman'}});

        const form = screen.getByRole('form');
        fireEvent.submit(form);
        expect(mockUseNavigate).toHaveBeenCalledWith('?q=superman');
      
    });
    
});