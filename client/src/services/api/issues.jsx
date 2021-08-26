export const readIssues = async () => {

  const answer = new Promise ((resolve, reject) => {
    fetch('http://172.21.0.6:8080/api/issues', {
        method: 'GET',
        // headers: {
        //   'Fiware-Service': 'issues',
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

export const addIssue = async () => {

  const answer = new Promise ((resolve, reject) => {
    fetch('http://172.21.0.6:8080/api/issues', {
        method: 'POST',
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