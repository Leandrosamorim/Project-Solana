<template>
    <div class="flex-wrapper-four">
        <p class="section-title">Daily Stats</p>
        <p class="section-info">
          Crypto Market 24h Volume: {{getMktStats.total24hVolume}} USD
          <br />
          Biggest market cap: <img style="heigth: 14px ; width:14px" :src = getBiggestMktCap[0] > {{getBiggestMktCap[1]}} {{getBiggestMktCap[2]}} USD
          <br />
          Biggest Daily gain: <img style="heigth: 14px ; width:14px" :src = getBiggestChange[0] > {{getBiggestChange[1]}} {{getBiggestChange[2]}} %
          <br />
          Biggest Circulating Supply: <img style="heigth: 14px ; width:14px" :src = getBiggestSupply[0] > {{getBiggestSupply[1]}} {{getBiggestSupply[2]}} units
        </p>
      </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DailyStats",
  computed: mapGetters(["getBiggestChange", "getBiggestMktCap", "getBiggestSupply", "getMktStats"]),
  methods: {
    ...mapActions(["getMktInfo"]),
  },
  created() {
    this.getMktInfo();
  },
};
</script>