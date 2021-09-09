import config from "../config";
import EventEmitter from "eventemitter3";

const EVENTS = {
  APP_READY: "app_ready",
};

/**
 * App entry point.
 * All configurations are described in src/config.js
 */

export default class Application extends EventEmitter {
  constructor() {
    super();

    const url = "https://swapi.boom.dev/api/planets/";

    // fetch("https://swapi.dev/api/planets/")
    //     .then(response => response.json())
    //     .then(data => count = data.count)
    //     .then(() => console.log(count));

    async function getData(url) {
      const response = await fetch(url);

      // Storing data in form of JSON
      let data = await response.json();
      let count = data.count;

      // let allData = [];
      // let morePagesAvailable = true;
      // let currentPage = 4;

      // while (morePagesAvailable) {
      //   currentPage++;
      //   const response = await fetch(
      //     `https://swapi.dev/api/planets/?page=${currentPage}`
      //   );
      //   let { test, total_pages } = await response.json();
      //   morePagesAvailable = currentPage === null;
      // }
    }

    getData(url);

    this.config = config;
    this.data = {};

    this.init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Initializes the app.
   * Called when the DOM has loaded. You can initiate your custom classes here
   * and manipulate the DOM tree. Task data should be assigned to Application.data.
   * The APP_READY event should be emitted at the end of this method.
   */
  async init() {
    // Initiate classes and wait for async operations here.

    this.emit(Application.events.APP_READY);
  }
}
