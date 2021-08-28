export const readIssues = async () => {

  const answer = new Promise ((resolve, reject) => {
    fetch('http://172.21.0.4:8080/api/issues', {
        method: 'GET',
      })
        .then(async (response) => {
          response = await response.json();
          console.log('response', response)
          resolve({status: 200, data: response });
        })
        .catch((error) => {
          reject(error);
        });
  });

  return answer;
}

export const addIssue = async () => {

  const answer = new Promise ((resolve, reject) => {
    fetch('http://172.21.0.4:8080/api/issues', {
        method: 'POST',
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