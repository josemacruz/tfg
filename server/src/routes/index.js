const express = require('express');
const { addIssue, readServices, readDevices, readRules, addIssueByRule, readIssues, updateIssue, readIssue, deleteIssue, readWidget, readWidgets, updateWidget } = require('../controllers');
const router = express.Router();
/** ISSUES ROUTER */
router.get('/api/issues', readIssues);

/** DEVICES ROUTER */
router.get('/api/devices', readDevices);

/** RULES ROUTER */
router.post('/api/ruleIssues', addIssueByRule);


module.exports = router;	