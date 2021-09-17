import axios from 'axios';

export const readIssues = async () => {

  const answer = new Promise ((resolve, reject) => {
    fetch('http://172.20.0.5:8080/api/issues', {
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

export const addIssue = (payload) => {
  axios.post('http://172.20.0.5:8080/api/issues', payload)
    .then(res => {
    })
}

export const readServices = async () => {
const answer = new Promise ((resolve, reject) => {
  fetch('http://172.20.0.5:8080/api/services', {
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