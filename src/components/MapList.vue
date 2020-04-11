<!--
  - Copyright (c) 2020 Alex Meddin
  -  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
  -  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
  -  You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
  -
  -  Alex Meddin github.com/ameddin73 ameddin73@gmail.com
  -->
<template>
    <div class="mapList">
        <h1>Map list says hello.</h1>
        <ul>
            <li v-for="program in programs" :key="program.id">
                {{ program.name }}
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios';


    export default {
        name: 'MapList',

        data() {
            return {
                programs: []
            }
        },

        mounted() {
            axios.get('http://localhost:3000/api/v1/programs')
                .then(response => (this.$set(this.programs = response.data)))
                .catch(error => (console.log(error)));
        }
    }
</script>