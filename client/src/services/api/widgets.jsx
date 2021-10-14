import axios from 'axios';

export const readWidgets = async () => {

  const answer = new Promise ((resolve, reject) => {
    fetch('http://172.20.0.5:8080/api/widgets', {
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

export const updateWidget = async (payload) => {
  const { id, body } = payload; 
  const answer = new Promise ((resolve, reject) => {
    axios.put(`http://172.20.0.5:8080/api/widgets/${id}`, body)
    .then( async (res) => {
      res = await res;
      resolve({status: res.status, data: res.data });
    })
    .catch((error) => {
      reject(error);
    });
  });
  return answer;
}
