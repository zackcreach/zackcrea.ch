import Vue from "vue";
import Balance from "./Balance.vue";
import "../global_styles/styles.css";

new Vue({
  el: "#balance",
  render: h => h(Balance)
});
