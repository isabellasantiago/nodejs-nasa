"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const singup_1 = require("../factories/singup");
function default_1(router) {
    router.post('/', (0, express_route_adapter_1.adaptRoute)((0, singup_1.makeSignupController)()));
}
exports.default = default_1;
