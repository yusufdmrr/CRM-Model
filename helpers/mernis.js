//const soap = require('soap')
const axios = require('axios')
const xml2js = require('xml2js');

const verifyMernisIdentity = async (mernisValue) => {
  const url = process.env.MERNIS_URL
  return new Promise((resolve, reject) => {
    soap.createClient(url, (error, client) => {
      if (error) {
        reject(error)
      } else {
        client.TCKimlikNoDogrula(mernisValue, (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
      }
    })
  })
}

const verifyAxiosMernisIdentity = async (mernisValue) => {

  const url = process.env.MERNIS_URL;
  const xmlData = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                    <Body>
                      <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
                        <TCKimlikNo>${mernisValue.TCKimlikNo}</TCKimlikNo>
                        <Ad>${mernisValue.Ad}</Ad>
                        <Soyad>${mernisValue.Soyad}</Soyad>
                        <DogumYili>${mernisValue.DogumYili}</DogumYili>
                      </TCKimlikNoDogrula>
                    </Body>
                  </Envelope>`;

  const headers = {
    'Content-Type': 'text/xml;charset=UTF-8',
    'SOAPAction': 'http://tckimlik.nvi.gov.tr/WS/TCKimlikNoDogrula',
  };

  try {
    const response = await axios.post(url, xmlData, { headers });


    console.log("reeeeee",response)


    const result = await xml2js.parseStringPromise(response.data);
    return result; // Burada sonucu düzgün bir şekilde işlemeniz gerekebilir
  } catch (error) {
    throw error;
  }
};

module.exports = { verifyMernisIdentity, verifyAxiosMernisIdentity } 
