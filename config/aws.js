const { SNSClient } = require('@aws-sdk/client-sns');

const snsClient = process.env.AWS_REGION
  ? new SNSClient({ region: process.env.AWS_REGION })
  : null;

module.exports = { snsClient };
