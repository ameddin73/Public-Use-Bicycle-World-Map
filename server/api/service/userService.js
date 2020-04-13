/*
 * Copyright (c) 2020 Alex Meddin
 *  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 *  Alex Meddin github.com/ameddin73 ameddin73@gmail.com
 */

const userController = require('../controllers/userController');

module.exports = {
    async validateCredentials(req) {
        // Retrieve user from google
        const googleUserDetails = await userController.getUserDetails(req);

        // Check for user in db
        let user = await userController.findOne(googleUserDetails['sub']);

        if (!user) {
            user = await userController.create({
                name: googleUserDetails['name'],
                id: googleUserDetails['sub'],
            })
        }
        return user;
    },
    async validate(req, res) {
        let user = await module.exports.validateCredentials(req);
        res.status(200).send(user);
    }
};
