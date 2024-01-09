const axios = require('axios');
const _ = require('lodash');

const apiEndpoint = 'http://localhost:4000/api/v1/observation';
const userId = '659d3da859a99be651d75836';
const numCalls = 10; // Adjust the number of calls as needed

function generateRandomObservation() {
  const baseTimestamp = new Date('2023-11-16T12:54:00Z');
  const offset = _.random(1, numCalls) * 50; // Random millisecond offset within call range
  const timestamp = new Date(baseTimestamp.getTime() + offset);

  return {
    UserId: userId,
    visitcount:2,
    observationData: {
      timestamp: timestamp.toISOString(),
      messages: _.random(1, 99),
      observationNumber: _.uniqueId(), // Use _.uniqueId to handle potential conflicts
      frequency: 100,
      postGenerator: _.random(1, 5),
      postSensor: _.random(1, 5),
      bioImpedance: _.random(1, 500),
      phaseAngle: _.random(-0.00393, 0.99999),
      stepSize: _.random(1, 10),
      numberOfPoints: _.random(10, 100),
      metadata: {
        UserId: userId,
      },
    },
  };
}
/////////

const makeApiCall = () => {
  const randomValues = generateRandomObservation();

  axios.post(apiEndpoint, randomValues)
    .then(response => {
      console.log('API Response:', response.data);
    })
    .catch(error => {
      console.error('Error making API request:', error.message);
    });
};

const interval = 5000; // Set the interval to call the API function every 5 seconds
setInterval(makeApiCall, interval);