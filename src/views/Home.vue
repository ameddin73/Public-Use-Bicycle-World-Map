<template>
    <div class="home">
        <h1>Public-Use Bicycle World Map</h1>
        <MapList/>
    </div>
</template>

<script>
import MapList from '@/components/MapList'

export default {
  name: 'Home',
  components: {
    MapList
  }
}
</script>

<style>
    h1 {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        color: aliceblue;
        background: #2c3e50;
        z-index: 10;
        padding: 5px;
        border-radius: 3px;
        text-align: center;
    }
    home {
        position: relative;
        width: 100%;
    }
</style>
