const express = require('express');
const router = express.Router();
const enterpriseController = require('../controllers/enterpriseController');

router.post('/create', enterpriseController.createEnterprise);
router.get('/list', enterpriseController.getAllEnterprises);
router.get('/get/:id', enterpriseController.getEnterpriseById);
router.put('/update/:id', enterpriseController.updateEnterprise);
router.delete('/delete/:id', enterpriseController.deleteEnterprise);

module.exports = router;