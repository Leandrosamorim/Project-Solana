<script src="http://192.168.1.5:8098"></script>
<template>
  <div class="flex-wrapper-four">
    <p class="coin-title">Daily Stats of {{ getCoinBySymbol(selectedCoin).name }}</p>
    <p class="section-info">
      <img class="icon" :src="getCoinBySymbol(selectedCoin).iconUrl" />
      <br />
      Rank: {{ getCoinBySymbol(selectedCoin).rank }}
      <br />
      Market Cap: {{ getCoinBySymbol(selectedCoin).marketCap }} USD
      <br />
      Price: {{ getCoinBySymbol(selectedCoin).price }} USD
      <br />
      Change: {{ getCoinBySymbol(selectedCoin).change }} %
      <br />
      ATH: {{ getCoinBySymbol(selectedCoin).allTimeHigh.price }} USD on
      {{
        new Date(
          getCoinBySymbol(selectedCoin).allTimeHigh.timestamp
        ).toDateString()
      }}
      <br />
      <br />
      <a class="return-button" @click="hideComponent">&lt;RETURN&gt;</a>
      <a class="return-button" v-if="isFavorite()" @click="removeFavs(getCoinBySymbol(selectedCoin))">&lt;REMOVE FAVORITE&gt;</a>
      <a class="return-button" v-else @click="addFavs(getCoinBySymbol(selectedCoin))">&lt;ADD FAVORITE&gt;</a>
    </p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CoinStats",
  props: ['selectedCoin'],
  computed: mapGetters(['getCoinBySymbol', 'getMyFavs']),
  methods:{
     hideComponent() {
                this.$emit('update:selectedCoin', null);
            },
      ...mapActions(["addFavs", "removeFavs"]),
        isFavorite : function(){
    return this.$store.getters['getMyFavs'].includes(this.$store.getters.getCoinBySymbol(this.selectedCoin))
    //  some(data => this.selectedCoin != data.symbol) ? false : true;
  },
  },
};
</script>
<style >
.icon {
  height: 60px;
  width: 60px;
  align-content: center;
}
</style>