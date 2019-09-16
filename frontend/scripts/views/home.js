import Home from "./home.svelte";
import "../../styles/home.css";
import "../components/background";

const weddingDate = new Date("9/15/2019").getTime();
const nowDate = Date.now();
const timeDifference = nowDate - weddingDate;
const status = timeDifference > 0 ? "engaged" : "married";

const home = new Home({
  target: document.body,
  props: {
    status
  }
});

export default home;
