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
    /* Add new Google Sheets API access info to DB */
    async createSheetId(req, res) {
        return await Sheet.create(req.body)
            .then(program => res.status(201).send(program))
            .catch(err => res.status(400).send(err));
    },
    /* Find stored Google Sheets API access info from DB */
    async findSheetId() {
        const sheetId = await Sheet.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']]
        });
        return sheetId[0].dataValues;
    },
    /* Fetch the google sheet info NO ACTUAL DATA */
    async getSheet(sheetId) {
        // Access sheet
        const doc = new GoogleSpreadsheet(sheetId.sheet_id);
        await doc.useServiceAccountAuth({
            client_email: sheetId.service_account_email,
            private_key: sheetId.api_key,
        });

        // Load sheet and single column (to populate cellStats)
        await doc.loadInfo();
        let sheet = await doc.sheetsByIndex[0];
        await sheet.loadCells({
            startColumnIndex: 0,
            endColumnIndex: 1,
        });

        console.log('Fetched google sheet: ' + doc.title);
        return sheet;
    },
    /* Load actual google sheet cells at specified range */
    async loadCells(sheet, offset, limit) {
        await sheet.loadCells({
            startRowIndex: offset,
            endRowIndex: offset + limit,
        });
        return sheet;
    }
}