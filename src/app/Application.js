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

    this.config = config;
    this.init();
    this.data = {
      count: 0,
      planets: [],
    };
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
    let url = "https://swapi.boom.dev/api/planets/";
    // Initiate classes and wait for async operations here.
    do {
      const response = await fetch(url);

      // Storing data in form of JSON
      let data = await response.json();
      let count = data.count;
      let planets = data.results;
      url = data.next;
      this.data.count = count;
      this.data.planets.push(...planets);

      console.log(this.data);
    } while (url);

    this.emit(Application.events.APP_READY);
  }
}
