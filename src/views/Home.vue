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
