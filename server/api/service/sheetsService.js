/*
 * Copyright (c) 2020 Alex Meddin
 *  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 *  Alex Meddin github.com/ameddin73 ameddin73@gmail.com
 */

const moment = require('moment');
const urlRegex = require('url-regex');
const sheetsController = require('../controllers/sheetsController');

const QUERY_COUNT = 10;
const QUERY_TIMEOUT = 1000;
const CHUNK_SIZE = 100;

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
            // const chunkSize = 3;
            let programs = [];
            let count = 0;
            for (let i = 0; i <= sheet.rowCount; i += chunkSize) {
            // for (let i = 0; i <= 3; i += chunkSize) {
                count++;
                if (count % QUERY_COUNT === 0) {
                    await new Promise(resolve => setTimeout(resolve, QUERY_TIMEOUT));
                }
                programs.push(loadCells(sheet, i, chunkSize, res)
                    .then(chunk => programs.push(chunk)));
            }
            await Promise.all(programs);
            programs = programs.filter(value => Object.keys(value).length !== 0).flat();
            programs = programs.map(program => transform(program));
            console.log('Loaded rows: 1 - ' + programs.length);

            programs = programs.filter(value => value.error.length > 0);
            res.status(200).send(programs);
        } catch (err) {
            console.error(err);
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

loadCells = async function (sheet, offset, limit) {
    // Load rows in this chunk
    const cells = await sheetsController.loadCells(sheet, offset, limit);
    const rows = await cells.getRows({offset, limit});

    // Map spreadsheet rows to Programs
    let programs = [];
    for (let i = 0; i < rows.length; i++) {
        if (rows[i]) {
            let row = {};
            Object.assign(row,
                rows[i]['City'] && {city: rows[i]['City']},
                rows[i]['pr'] && {province: rows[i]['pr']},
                rows[i]['city'] && {city_local: rows[i]['city']},
                rows[i]['municip/distrcit'] && {municipality: rows[i]['municip/distrcit']},
                rows[i]['Country'] && {country: rows[i]['Country']},
                rows[i]['Continent'] && {continent: rows[i]['Continent']},
                rows[i]['Name'] && {name: rows[i]['Name']},
                rows[i]['Status'] && {status: rows[i]['Status']},
                rows[i]['Type'] && {type: rows[i]['Type']},
                rows[i]['Start Bike'] && {start_date: rows[i]['Start Bike']},
                rows[i]['Bikes'] && {bike_count: rows[i]['Bikes']},
                rows[i]['Stations'] && {station_count: rows[i]['Stations']},
                rows[i]['Pedelec'] && {pedelec_count: rows[i]['Pedelec']},
                rows[i]['Cargo'] && {cargo_count: rows[i]['Cargo']},
                rows[i]['Terminated'] && {end_date: rows[i]['Terminated']},
                rows[i]['URL'] && {url: rows[i]['URL']},
                rows[i]['Longitude'] && {longitude: rows[i]['Longitude']},
                rows[i]['Latitude'] && {latitude: rows[i]['Latitude']},
                rows[i]['Map'] && {map: rows[i]['Map']},
                rows[i]['pathToCell'] && {pathToCell: rows[i]['pathToCell']},
            );
            programs.push(row);
        }
    }

    return programs;
}

/* Map raw row data to a Program object. Add error details if it
fails validation.
 */
transform = function (row) {
    Object.values(row).map(value => value.trim());
    row.error = [];
    row = validateNotEmpty(row, 'city', 'City');
    row = validateNotEmpty(row, 'name', 'Name');
    if (row.type)
        row = validateType(row, 'type', 'number', 'Type');
    if (row.status)
        row = validateType(row, 'status', 'number', 'Status');
    if (row.url)
        row = validateUrl(row, 'url', 'URL');
    if (row.start_date)
        row = validateType(row, 'start_date', 'date', 'Start Bike');
    if (row.end_date)
        row = validateType(row, 'end_date', 'date', 'Terminated');
    if (row.bike_count)
        row = validateType(row, 'bike_count', 'number', 'Bikes');
    if (row.station_count)
        row = validateType(row, 'station_count', 'number', 'Stations');
    if (row.pedelec_count)
        row = validateType(row, 'pedelec_count', 'number', 'Pedelec');
    if (row.cargo_count)
        row = validateType(row, 'cargo_count', 'number', 'Cargo');
    if (row.latitude)
        row = validateType(row, 'latitude', 'number', 'Latitude');
    if (row.longitude)
        row = validateType(row, 'longitude', 'number', 'Longitude');
    if (row.map)
        row = validateUrl(row, 'map', 'Map');
    if (row.pathToCell)
        row = validateUrl(row, 'pathToCell', 'pathToCell');

    return row;
}

validateNotEmpty = function (row, property, column) {
    if (!row[property]) {
        row.error.push('Column "' + column + '" may not be empty.');
    }
    return row;
}

validateType = function (row, property, type, column) {
    if (type === 'number') {
        row[property] = row[property].replace(',','');
        if (isNaN(row[property])) {
            row.error.push(row[property] + ' is not a valid number. Column "' + column + '" may only contain a number.');
        }
    }
    let formats = [
        'YYYY',
        'YYY-MM-DD',
    ]
    if (type === 'date') {
        if (!moment(row[property], formats).isValid()) {
            row.error.push(row[property] + ' is not a valid date. Column "' + column + '" may only contain a date'
                + 'of format "YYYY-MM-DD" or "YYYY".');
        }
    }
    return row;
}

validateUrl = function (row, property, column) {
    if (!urlRegex({exact: false, strict: false}).test(row[property])) {
        row.error.push(row[property] + ' is not a valid URL. Column "' + column + '" may only contain valid URLs.');
    }
    return row;
}