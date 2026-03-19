"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generationController_1 = require("../controllers/generationController");
const router = (0, express_1.Router)();
router.post('/', generationController_1.generateTestCases);
exports.default = router;
