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
        <div id="map"></div>
    </div>
</template>

<script>
    import axios from 'axios';
    axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;
    import mapboxgl from 'mapbox-gl';

    import 'mapbox-gl/dist/mapbox-gl.css';
    import '../styles/map.css';

    export default {
        name: 'MapList',

        data() {
            return {
                programs: []
            }
        },

        mounted() {
            axios.get('/programs')
                .then(response => (this.$set(this.programs = response.data)))
                .then(() => this.addMarkers())
                .catch(error => (console.log(error)));

            this.createMap();
        },

        methods: {
            createMap: function () {
                mapboxgl.accessToken = process.env.VUE_APP_MAP_TOKEN;
                this.map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/ameddin73/ck8xynurv4jt91iqiy240ig1n',
                })
                this.map.resize();
            },
            addMarkers() {
                this.programs.forEach(program => {
                    try {
                        var ll = new mapboxgl.LngLat(program.longitude, program.latitude);

                        var el = document.createElement('div');
                        el.className = 'marker';

                        new mapboxgl.Marker(el)
                            .setLngLat(ll)
                            .addTo(this.map);
                    } catch (err) {
                        console.warn(err);
                    }
                });
            }

        }
    }
</script>
