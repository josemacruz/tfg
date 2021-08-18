export const readIssues = async () => {

  const answer = new Promise ((resolve, reject) => {
    fetch('/v2/entities/', {
        method: 'GET',
        headers: {
          'Fiware-Service': 'issues',
          'Fiware-ServicePath': '/',
        },
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