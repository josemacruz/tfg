export const readDevices = async () => {

  const answer = new Promise ((resolve, reject) => {
    fetch('http://172.20.0.5:8080/typeList', {
        method: 'GET',
        // headers: {
        //   'Fiware-Service': 'devices',
        //   'Fiware-ServicePath': '/',
        // },
      })
        .then(async (response) => {
          response = await response.json();
          resolve({status: 200, data: response });
        })
        .catch((error) => {
          reject(error);
        });
  });

  return answer;
}