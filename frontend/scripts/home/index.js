import Home from "./Home.svelte";

const home = new Home({
  target: document.body,
  props: {
    name: "world"
  }
});

export default home;
