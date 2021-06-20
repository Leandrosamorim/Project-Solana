<template>
  <div class="desktop-1">
    <div class="flex-wrapper-one">
      <p class="title">Crypto Watcher</p>
    </div>
    <div class="panel">
      <p v-for="fav in getMyFavs" name="coin" id="coin" v-bind:key="fav.id" :style="setColor(fav)" class="panel-text">
        {{ fav.symbol }} {{ fav.change }}
      </p>
      </div>
    <div class="flex-wrapper-two">
      <div class="flex-wrapper-three">
        <div>
          <label class="section-info">Choose a coin</label>
          <select
            v-model="selectedCoin"
            name="coin"
            id="coin"
            class="form-control"
            tabindex="12"
          >
            <!-- <MyFavorites v-if="getMyFavs != null"></MyFavorites> -->
            <option
              v-for="coin in getCoins"
              :key="coin.id"
              :value="coin.symbol"
            >
              {{ coin.symbol }}
            </option>
          </select>
        </div>
        <button>
          <p class="combo-label" @click="getRandCoin()">
            Find your lucky crypto
          </p>
        </button>
      </div>

      <Daily v-if="selectedCoin == null"></Daily>
      <Coin
        v-else
        v-bind:selectedCoin.sync="selectedCoin"
        v-on:hideComponent="setNull"
      ></Coin>
    </div>
    <footer class="flex-wrapper-five">
      <p class="footer">
        2020-2021 Bugmaster Software Solutions. Bugmaster is a trademark of
        Bugmaster Software Solutions
      </p>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Daily from "./components/DailyStats.vue";
import Coin from "./components/CoinStats.vue";

export default {
  name: "App",
  components: {
    Daily,
    Coin,
  },
  computed: mapGetters(["getCoins", "getLastCoin", "getMyFavs"]),
  methods: {
    ...mapActions(["getAllCoins", "addRandomCoin", "getRandomCoin"]),
    setNull: function () {
      this.selectedCoin = null;
    },
    getRandCoin: function () {
      var rand = (Math.floor(Math.random() * 200) + 50).toString();
      this.addRandomCoin(rand);
      this.selectedCoin = this.$store.getters["getLastCoin"].symbol;
    },
    setColor(fav){
    return{ color: fav.change > 0 ? 'green' : 'red' }},
  },
  data() {
    return {
      selectedCoin: null,
    };
  },
  created() {
    this.getAllCoins();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=VT323&display=swap");
.desktop-1 {
  background-color: #353535;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-wrapper-one {
  width: 100%;
  text-align: center;
  margin: 42px 0 42px 0;
}

.title {
  font-family: "VT323";
  font-size: 88px;
  font-weight: 400;
  line-height: 10rem;
  margin: 0;
  color: dark-gray;
  align-items: center;
  text-align: center;
  text-shadow: 1px 2px 4px white;
}

.flex-wrapper-two {
  background-color: silver;
  width: 100%;
  height: fit-content;
  position: relative;
  align-content: center;
  margin-bottom: 30px;
}

.flex-wrapper-three {
  background-color: silver;
  justify-content: space-around;
  flex-direction: initial;
  display: inline-flex !important;
  width: 100%;
  align-items: center;
  align-content: center;
  position: relative;
  margin-top: 20px;
}

.search-combo {
  background-color: white;
  position: relative;
}

.combo-label {
  color: black;
  display: flex;
  align-items: center;
  text-align: center;
  font-family: "VT323";
  font-size: 18px;
  margin: 0px;
}

.search-button {
  width: fit-content;
  height: fit-content;
  background-color: white;
  position: absolute;
  border: 2px solid black;
}

.flex-wrapper-four {
  background: linear-gradient(silver, silver), silver;
  display: flexbox;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.section-title {
  color: black;
  align-items: center;
  text-align: center;
  margin-bottom: 67px;
  font-family: "VT323";
  font-size: 36px;
}

.coin-title {
  color: black;
  align-items: center;
  text-align: center;
  margin-bottom: 67px;
  font-family: "VT323";
  font-size: 36px;
}

.section-info {
  color: black;
  align-items: center;
  text-align: center;
  font-family: "VT323";
  font-size: 24px;
}

.flex-wrapper-five {
  background-color: dim-gray;
  display: flex;
  align-items: flex-start;
}

.footer {
  color: white;
  background-color: #353535;
  flex: 1;
  align-self: stretch;
  text-align: center;
  align-items: center;
  text-align: center;
  font-family: "VT323";
  font-size: 24px;
}
.return-button {
  color: blue;
}
.return-button:hover {
  text-decoration: underline;
  cursor: pointer;
}
.form-control {
  margin-left: 4px;
}
.panel{
  align-self: center;
  display: inline-flex;
  justify-content:space-evenly;
    background-color: black;
  width: 100%;
  overflow: hidden;
}
.panel-text{
  height: fit-content;
  margin: 0;
  font-family: "VT323";
  font-size: 18px;
  animation: move 20s linear infinite;
  transform: translateX(-50%);
}
@keyframes move {
  50% {
    transform: translateX(50vw);
  }
  50.001% {
    transform: translateX(-50vw) ;
  }
}
</style>
