/*
 * Copyright (c) 2020 Alex Meddin
 *  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 *  Alex Meddin github.com/ameddin73 ameddin73@gmail.com
 */

const express = require('express');
const router = express.Router();
const sheetsService = require('../service/sheetsService');
const userService = require('../service/userService');

router.use(async function (req, res, next) {
    try {
        const user = await userService.validateCredentials(req);
        if (user.role !== 'admin') {
            return res.status(401).send({error: 'User not authorized.'});
        } else {
            next();
        }
    } catch {
        return res.status(403).send({error: 'Unable to authenticate user.'});
    }
});

router.put('/path', sheetsService.updatePath);

router.get('/refresh', sheetsService.refresh);

module.exports = router;