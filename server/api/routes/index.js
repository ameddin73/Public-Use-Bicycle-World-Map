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

const programRoute = require('./programRouter');
const sheetsRoute = require('./sheetsRouter');
const userRoute = require('./userRouter');

/* GET routing index displays links */
router.get('/', function(req, res, next) {
    const baseURI = req.get('host') + req.baseUrl;
    res.json({
        map: baseURI + programURI
    });
});

router.use('/programs', programRoute);
router.use('/sheets', sheetsRoute);
router.use('/users', userRoute);

module.exports = router;
