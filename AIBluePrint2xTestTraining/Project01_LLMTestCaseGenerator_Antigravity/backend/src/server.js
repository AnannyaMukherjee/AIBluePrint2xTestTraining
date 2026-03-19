"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Import our routes
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const generationRoutes_1 = __importDefault(require("./routes/generationRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/settings', settingsRoutes_1.default);
app.use('/api/generate', generationRoutes_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Test Case Generator API is running' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
