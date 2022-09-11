const axios = require('axios');

const orionUrl = "http://172.20.0.3";

/** ISSUES CONTROLLERS */
const readIssues = async (req, res) => {
	axios.defaults.headers.common['Fiware-Service'] = 'issues';
  axios.get(orionUrl + ":1026/v2/entities")
    .then(function (response) {
			const issues = response.data;
      res.status(200).json(issues);
    })
    .catch(function (error) {
      res.status(404).json({ message: error.message });
    });
}

/** DEVICES CONTROLLERS */
const readDevices = async (req, res) => {
  axios.defaults.headers.common['Fiware-Service'] = 'iotAgent';
  axios.get(orionUrl + ":1026/v2/entities")
    .then(function (response) {
      const devices = response.data;
      res.status(200).json(devices);
    })
    .catch(function (error) {
      res.status(404).json({ message: error.message });
    });
}

/** RULES CONTROLLERS */

const addIssueByRule = async (req, res) => {
	console.log('DENTRO', req.body);
  const id = Math.floor(Math.random() * 999999);
  axios({
    method: 'post',
    url: orionUrl + ":1026/v2/entities",
    headers: {
      'Fiware-Service': 'issues',
      'Fiware-ServicePath': '/',
      'Content-Type': 'application/json',
    },
    data: {
				"id": `service-request:${id}`,
				"type": "Open311ServiceRequest",
				"status": {
					"value": "Abierta"
				},
				"description": {
					"value": req.body.description,
					"type": "Text"
				},
				"service_code": {
					"value": 234
				},
				"status_notes": {
						"value": "Duplicate request."
				},
				"service_name": {
						"value": ""
				},
				"service_request_id": {
						"value": id
				},
				"address_string": {
					"value": "C. Américo Vespucio, 41092 Sevilla"
			},
				"location": {
					"type": "geo:json",
					"value": {
							"type": "Point",
							"coordinates": [37.411388888889, -6.0005858333333]
					}
			},
			"attributes": {
					"value": Object.keys(req.body)[0],
			},
			"agency_responsible": {
				"value": "Universidad de Sevilla"
			},
			"media_url": {
					"value": "http://exaple.org/media/638344.jpg"
			}
    },
  })
  .then(function (response) {
		const newIssue = JSON.parse(response.config.data);
		res.status(201).json(newIssue);
	})
	.catch(function (error) {
		res.status(404).json({ message: error.message });
	});
}


module.exports = {
  readIssues: readIssues,
  readDevices: readDevices,
  addIssueByRule: addIssueByRule,
}