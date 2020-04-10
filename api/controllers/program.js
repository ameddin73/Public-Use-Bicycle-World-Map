/*
 * Copyright (c) 2020 Alex Meddin
 *  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 *  Alex Meddin github.com/ameddin73 ameddin73@gmail.com
 */

const Program = require('../models').Program;

module.exports = {
    async create(req, res) {
        return await Program.create({
            name: req.body.name,
            city: req.body.city,
        })
            .then(program => res.status(201).send(program))
            .catch(err => res.status(400).send(err));
    },
    async findAll(req, res) {
        return Program.findAll()
            .then(program => res.status(200).send(program))
            .catch(err => res.status(500).send(err));
    },
    async findByPk(req, res) {
        return Program.findByPk(req.params.id)
            .then(program => res.status(200).send(program))
            .catch(err => res.status(404).send(err));
    },
};
