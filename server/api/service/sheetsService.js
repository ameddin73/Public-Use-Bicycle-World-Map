/*
 * Copyright (c) 2020 Alex Meddin
 *  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 *  Alex Meddin github.com/ameddin73 ameddin73@gmail.com
 */

const sheetsController = require('../controllers/sheetsController');

const QUERY_COUNT = 10;
const QUERY_TIMEOUT = 1000;
const CHUNK_SIZE = 500;

module.exports = {
    async updatePath(req, res) {
        return sheetsController.createSheetId(req, res);
    },
    async refresh(req, res) {
        try {
            // Fetch sheet metadata without data
            const sheet = await fetchSheet(res);

            // Build list of entries from sheet in batches of size chunkSize
            // Allow QUERY_COUNT calls per second because of google api restrictions
            // This ended up being a lot of wasted time I basically couldn't optimize past 10 seconds.
            const chunkSize = CHUNK_SIZE;
            let programs = [];
            let count = 0;
            for (let i = 1; i <= sheet.rowCount; i += chunkSize) {
                count++;
                if (count % 10 === 0) {
                    await new Promise(resolve => setTimeout(resolve, QUERY_TIMEOUT));
                }
                programs.push(loadCells(sheet, i, chunkSize, res)
                    .then(chunk => programs.push(chunk)));
            }
            await Promise.all(programs);
            programs = programs.filter(value => Object.keys(value).length !== 0).flat();
            console.log(count);
            console.log(programs.length);

            res.status(200).send(programs);
        } catch (err) {
            res.status(500).send(err);
        }
    },
}

fetchSheet = async function (res) {
    try {
        // DB action
        const sheetId = await sheetsController.findSheetId();
        // Sheets api action
        return await sheetsController.getSheet(sheetId);
    } catch (err) {
        res.status(500).send(err);
    }
}

loadCells = async function (sheet, offset, limit, res) {
    try {
        // Load rows in this chunk
        const cells = await sheetsController.loadCells(sheet, offset, limit);
        const rows = await cells.getRows();

        // Map spreadsheet rows to Programs
        let programs = [];
        for (let i = 0; i < rows.length; i++) {
            if (rows[i]) {
                programs.push({
                    city: rows[i]['City'],
                    province: rows[i]['pr'],
                    city_local: rows[i]['city'],
                    municipality: rows[i]['municip/distrcit'],
                    country: rows[i]['Country'],
                    continent: [i]['Continent'],
                    name: rows[i]['Name'],
                    status: rows[i]['Status'],
                    type: rows[i]['Type'],
                    start_date: rows[i]['Start Bike'],
                    bike_count: rows[i]['Bikes'],
                    station_count: rows[i]['Stations'],
                    pedelec_count: rows[i]['Pedelec'],
                    cargo_count: rows[i]['Cargo'],
                    end_date: rows[i]['Terminated'],
                    url: rows[i]['URL'],
                    longitude: rows[i]['Longitude'],
                    latitude: rows[i]['Latitude'],
                    map: rows[i]['Map'],
                });
            }
        }

        return programs;
    } catch (err) {
        res.status(500).send(err);
    }
}