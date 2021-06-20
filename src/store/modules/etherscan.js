const coinsOptions = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  headers: {
    'x-rapidapi-key': 'f46e6b5558mshd9ec85ad2adbd83p136042jsnd58c3eca783c',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
  },
};
const mktOptions = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/stats',
  headers: {
    'x-rapidapi-key': 'f46e6b5558mshd9ec85ad2adbd83p136042jsnd58c3eca783c',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
  },
};

const state = {
  allCoins: [],
  mktStats: [],
  myFavs: []
};

const getters = {
  getCoins: state => state.allCoins,
  getCoinById: (state) => (id) => {
    return state.allCoins.find(coin => coin.id === id)
  },
  getCoinBySymbol: (state) => (symbol) => {
    return state.allCoins.find(coin => coin.symbol === symbol)
  },
  getBiggestChange: (state) => {
    var biggest = -100
    var name;
    var icon;
    state.allCoins.forEach(element => {
      if(element.change > biggest)
      {
        biggest = element.change;
        name = element.symbol;
        icon = element.iconUrl;
      }
    });
    return [icon, name, biggest.toString()]
  },
  getBiggestMktCap: (state) => {
    var biggest = 0;
    var name;
    var icon;
    state.allCoins.forEach(element => {
      if(element.marketCap > biggest)
      {
        biggest = element.marketCap;
        name = element.symbol;
        icon = element.iconUrl;
      }
    });
    return [icon, name, biggest.toString()];
  },
  getBiggestSupply: (state) => {
    var biggest = 0;
    var name;
    var icon;
    state.allCoins.forEach(element => {
      if(element.circulatingSupply > biggest)
      {
        biggest = element.marketCap;
        name = element.symbol;
        icon = element.iconUrl;
      }
    });
    return [icon, name, biggest.toString()];
  },
  getMktStats: state => state.mktStats,
  getLastCoin: state => state.allCoins[state.allCoins.length-1],
  getMyFavs: state => state.myFavs
};

const actions = {
  getAllCoins({ commit }) {
    var axios = require("axios").default;
    axios.request(coinsOptions).then(function (response) {
      commit('getCoins',response.data.data.coins);
    }).catch(function (error) {
      console.error(error);
    }); 
  },
  getMktInfo({commit}){
    var axios = require("axios").default;
    axios.request(mktOptions).then(function (response) {
      commit('getMktStats',response.data.data);
    }).catch(function (error) {
      console.error(error);
    }); 
  },
  addRandomCoin({ commit }, id) {
    var options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coin/'+id,
      headers: {
        'x-rapidapi-key': 'f46e6b5558mshd9ec85ad2adbd83p136042jsnd58c3eca783c',
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
      }}
    var axios = require("axios").default;
    axios.request(options).then(function (response) {
      commit('addCoins', response.data.data.coin);
    }).catch(function (error) {
      console.error(error);
    });
  },
  addCoins (state, coin) {
    state.allCoins.push(coin)
    state.commit('addCoins', coin.id)
  },
  addFavs (state, coin) {
    state.commit('addFavs', coin);
  },
  removeFavs (state, coin){
    state.commit('removeFavs', coin)
  }

}

const mutations = {
  getCoins: (state, data) => (state.allCoins = data),
  getMktStats: (state, data) => (state.mktStats = data),
  addCoins: (state, data) => state.allCoins.push(data),
  getFavs: (state, data) => (state.myFavs = data),
  addFavs: (state, data) => state.myFavs.push(data),
  removeFavs: (state, data) => {
    const index = state.myFavs.findIndex(x => x.id ==data.id)
    state.myFavs.splice(index, 1);
  }
  // updateFavs: (state, data) => {
  //   const index = state.myFavs.findIndex(t => t.id === data.id)
  //   if (index !== -1) {
  //     state.todos.splice(index, 1, data);
  //   }
  // }
}

export default {
  state,
  actions,
  getters,
  mutations
};