'use strict';

const kueskiConfirmation = (request, response) => {
  const payload = request.body;
  response.set('Content-Type', 'application/json');
  response.set('Authorization', 'Bearer bef6fc94-a772-4ed6-bcd9-0796e9f13f3f');
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
