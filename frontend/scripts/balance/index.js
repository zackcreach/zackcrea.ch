import Balance from "./Balance.svelte";

const balance = new Balance({
  target: document.body,
  props: {
    name: "sheet"
  }
});

export default balance;
