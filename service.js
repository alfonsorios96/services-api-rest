'use strict';

const kueskiConfirmation = (request, response) => {
  const payload = request.body;
  response.set('Content-Type', 'application/json');
  response.set('Authorization', 'Bearer 5ccd922a-e0e4-4d38-a936-1d22d3b70d40');
  console.log(JSON.stringify(request.body));
  console.log('headers', JSON.stringify(request.headers));
  switch (payload.status) {
    case 'approved':
      response.status(200).json({
        status: 'accept'
      });
      break;
    case 'denied':
      response.status(200).json({
        status: 'reject'
      });
      break;
    case 'canceled':
      response.status(200).json({
        status: 'ok'
      });
      break;
    default :
      response.status(200).json({
        status: 'ok'
      });
      break;
  }
};

module.exports = {kueskiConfirmation};
