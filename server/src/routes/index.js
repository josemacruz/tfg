const express = require('express');
const { addIssue, readServices, readDevices, readRules, addIssueByRule, readIssues } = require('../controllers');
const router = express.Router();
/** ISSUES ROUTER */
router.get('/api/issues', readIssues);
router.post('/api/issues', addIssue);

/** SERVICES ROUTER */
router.get('/api/services', readServices);

/** DEVICES ROUTER */
router.get('/api/devices', readDevices);

/** RULES ROUTER */
router.get('/api/rules', readRules);
router.post('/api/ruleIssues', addIssueByRule);

module.exports = router;