/*
 * Copyright (c) 2020 Alex Meddin
 *  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 *  Alex Meddin github.com/ameddin73 ameddin73@gmail.com
 */

const {GoogleSpreadsheet} = require('google-spreadsheet');
const Sheet = require('../models').Sheet;

module.exports = {
    async createSheetId(req, res) {
        return await Sheet.create(req.body)
            .then(program => res.status(201).send(program))
            .catch(err => res.status(400).send(err));
    },
    async findSheetId() {
        const sheetId = await Sheet.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']]
        });
        return sheetId[0].dataValues;
    },
    async getSheet(sheetId) {
        console.log('Loading google sheet: ' + sheetId.sheet_id);
        const doc = new GoogleSpreadsheet(sheetId.sheet_id);

        await doc.useServiceAccountAuth({
            client_email: sheetId.service_account_email,
            private_key: sheetId.api_key,
        });

        await doc.loadInfo()
        console.log('Loaded google sheet: ' + doc.title);
        return doc.sheetsByIndex[0];
    }
}