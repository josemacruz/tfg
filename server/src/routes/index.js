const express = require('express');
const { addIssue, readServices, readDevices, readRules, addIssueByRule, readIssues, updateIssue, readIssue, deleteIssue } = require('../controllers');
const router = express.Router();
/** ISSUES ROUTER */
router.get('/api/issues', readIssues);
router.post('/api/issues', addIssue);
router.put('/api/issues/:id', updateIssue);
router.get('/api/issues/:id', readIssue);
router.delete('/api/issues/delete/:id', deleteIssue);

/** SERVICES ROUTER */
router.get('/api/services', readServices);

/** DEVICES ROUTER */
router.get('/api/devices', readDevices);

/** RULES ROUTER */
router.get('/api/rules', readRules);
router.post('/api/ruleIssues', addIssueByRule);

module.exports = router;	