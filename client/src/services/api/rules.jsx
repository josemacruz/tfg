import axios from 'axios';

export const readRules = async (payload) => {
  const answer = await axios.get('http://172.20.0.5:8080/api/rules')
    .then(res => {
      return res;
    })
		.catch(err => err);
	return answer;
}