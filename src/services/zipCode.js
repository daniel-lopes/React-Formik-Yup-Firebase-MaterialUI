import axios from 'axios';

export default async function fetchZipCodeInformation(zipCode) {
  return await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then(result => {
      const data = {
        'estado': result.data.uf,
        'municipio': result.data.localidade,
        'rua': result.data.logradouro,
      }
      return data;
    })
}