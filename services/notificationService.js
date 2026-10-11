const { PublishCommand } = require('@aws-sdk/client-sns');
const { snsClient } = require('../config/aws');

async function sendDispatchSms({ alert, pipeline, phoneNumber }) {
  if (!snsClient) return { delivered: false, reason: 'AWS_REGION is not configured' };
  const recipient = phoneNumber || pipeline.crewPhone;
  if (!recipient) return { delivered: false, reason: 'No E.164 crew phone number supplied' };
  const [lng, lat] = pipeline.location.coordinates[0];
  const message = `AquaLedger CRITICAL dispatch: pipeline ${pipeline._id}. Coordinates ${lat},${lng}. Alert ${alert._id}. Proceed to site.`;
  const result = await snsClient.send(new PublishCommand({ PhoneNumber: recipient, Message: message }));
  return { delivered: true, messageId: result.MessageId };
}

module.exports = { sendDispatchSms };
