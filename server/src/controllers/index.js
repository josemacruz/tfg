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
					"value": "closed"
				},
				"description": {
					"value": "My happy entity",
					"type": "Text"
				},
				"service_code": {
					"value": 234
				},
				"status_notes": {
						"value": "Duplicate request."
				},
				"service_name": {
						"value": "Aceras"
				},
				"service_request_id": {
						"value": id
				},
				"address_string": {
					"value": "Calle San Juan Bautista, 2"
			},
				"location": {
					"type": "geo:json",
					"value": {
							"type": "Point",
							"coordinates": [-3.164485591715449, 40.62785133667262]
					}
			},
			"attributes": {
					"value": {
							"ISSUE_TYPE": ["Bordillo"]
					}
			},
			"agency_responsible": {
				"value": "Ayuntamiento de Ciudad"
			},
			"media_url": {
					"value": "http://exaple.org/media/638344.jpg"
			}
    },
  })
  .then(function (response) {
		const newIssue = response.data;
		res.status(200).json(newIssue);
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