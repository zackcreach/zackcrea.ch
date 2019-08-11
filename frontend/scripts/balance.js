import Balance from "./balance.svelte";
import "../styles/balance.css";

const balance = new Balance({
  target: document.body,
  props: {
    name: "sheet"
  }
});

export default balance;
