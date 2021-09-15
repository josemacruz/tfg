export const readDevices = async () => {

  const answer = new Promise ((resolve, reject) => {
    fetch('http://172.20.0.5:8080/api/devices', {
        method: 'GET',
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