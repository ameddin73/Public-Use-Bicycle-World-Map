/*
 * Copyright (c) 2020 Alex Meddin
 *  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 *  Alex Meddin github.com/ameddin73 ameddin73@gmail.com
 */

const sheetsController = require('../controllers/sheetsController');

module.exports = {
    async updatePath(req, res) {
        return sheetsController.createSheetId(req, res);
    },
    async refresh(req, res) {
        try {
            // Get google sheet and convert it into a list of rows
            const sheetId = await sheetsController.findSheetId();
            const sheet = await sheetsController.getSheet(sheetId);
            const rows = await sheet.getRows({
                offset: 0,
                limit: 10000,
            });
            res.status(200).send(rows);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
}
