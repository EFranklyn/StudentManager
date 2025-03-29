import axios from 'axios';

// Ajustando para garantir que as props do modal sejam tipadas corretamente
interface Optios {
  label: string
  value: string
}

const useLocationOptions = () => {
    const url = 'http://servicodados.ibge.gov.br/api/v1/'
    
    
    const getStateOptions = async(): Promise<Optios[]> => {
        try {
            const response = await axios.get(url + 'localidades/estados');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const states = response.data.map((state:any)=>{
                if(state)
                return {
                    label: state.sigla + ' - ' + state.nome,
                    value: String(state.id),
                }
            });

            return states
          } catch (error) {
            console.error("Erro ao buscar opções:", error);
            throw error
          }
        };

    const getCity = async(id:string): Promise<Optios[]> => {
        try {
            const response = await axios.get(url + `localidades/estados/${id}/municipios`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cities = response.data.map((city:any)=>{
                if(city)
                return {
                    label: city.nome,
                    value: String(city.id),
                }
            });

            return cities
          } catch (error) {
            console.error("Erro ao buscar opções:", error);
            throw error
          }
        };    

    return {
        getStateOptions,
        getCity
    };

}

  


export default useLocationOptions;