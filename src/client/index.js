import { handleSubmit } from "./js/formHandler";
import "./styles/main.scss";

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit(event);
});
