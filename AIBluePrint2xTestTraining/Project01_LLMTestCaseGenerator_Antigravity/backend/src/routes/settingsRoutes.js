"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settingsController_1 = require("../controllers/settingsController");
const router = (0, express_1.Router)();
router.get('/', settingsController_1.getSettings);
router.post('/save', settingsController_1.saveSettings);
router.post('/test', settingsController_1.testConnection);
exports.default = router;
