"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const login_1 = require("../factories/login");
function default_1(router) {
    router.post('/login', (0, express_route_adapter_1.adaptRoute)((0, login_1.makeLoginController)()));
}
exports.default = default_1;
