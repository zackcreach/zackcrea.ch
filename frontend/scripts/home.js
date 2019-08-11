import Home from "./home.svelte";
import "../styles/home.css";

const home = new Home({
  target: document.body,
  props: {
    name: "f"
  }
});

export default home;
