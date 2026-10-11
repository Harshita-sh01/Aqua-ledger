const Alert = require('../models/Alert');
const Pipeline = require('../models/Pipeline');
const { getIO } = require('../sockets/socketManager');
async function getActive(req, res, next) {
  try {
    const filter = { status: 'active' };
    if (req.user.role === 'operator') { if (!req.user.assigned_ward) return res.status(403).json({ success: false, message: 'Operator has no assigned ward.' }); const pipelines = await Pipeline.find({ ward_id: req.user.assigned_ward }).select('_id').lean(); filter.pipeline_id = { $in: pipelines.map((p) => p._id) }; }
    const alerts = await Alert.find(filter).populate('pipeline_id', 'name ward_id location status').sort({ created_at: -1 }).lean();
    return res.json({ success: true, count: alerts.length, data: alerts });
  } catch (error) { return next(error); }
}
async function dispatch(req, res, next) {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert || alert.status !== 'active') return res.status(404).json({ success: false, message: 'Active alert not found.' });
    const pipeline = await Pipeline.findById(alert.pipeline_id);
    if (!pipeline) return res.status(404).json({ success: false, message: 'Pipeline not found.' });
    if (req.user.role === 'operator' && String(pipeline.ward_id) !== req.user.assigned_ward) return res.status(403).json({ success: false, message: 'Pipeline is outside your assigned ward.' });
    alert.status = 'dispatched'; pipeline.status = 'repair'; await Promise.all([alert.save(), pipeline.save()]);
    getIO().emit('alert:dispatched', { alert, pipeline });
    return res.json({ success: true, message: 'Repair crew dispatched.', data: { alert, pipeline } });
  } catch (error) { return next(error); }
}
module.exports = { dispatch, getActive };
