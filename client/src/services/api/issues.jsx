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

export const readIssue = async (payload) => {
  const { id } = payload;
  const answer = new Promise ((resolve, reject) => {
    fetch(`http://172.20.0.5:8080/api/issues/${id}`, {
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
  const answer = new Promise ((resolve, reject) => {
    axios.post('http://172.20.0.5:8080/api/issues', payload)
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

export const updateIssue = async (payload) => {
  const { id, body } = payload; 
  const answer = new Promise ((resolve, reject) => {
    axios.put(`http://172.20.0.5:8080/api/issues/${id}`, body)
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
