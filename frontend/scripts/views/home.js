import Home from "./home.svelte";
import "../../styles/home.css";

const weddingDate = new Date("11/2/2019").getTime();
const nowDate = Date.now();
const timeDifference = nowDate - weddingDate;
const status = timeDifference > 0 ? "married" : "engaged";

const home = new Home({
  target: document.body,
  props: {
    status
  }
});

export default home;
