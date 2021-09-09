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

    this.config = config;
    this.init();
    this.data = {
      count: 0,
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
    const url = "https://swapi.boom.dev/api/planets/";
    // Initiate classes and wait for async operations here.
    const response = await fetch(url);

    // Storing data in form of JSON
    let data = await response.json();
    let count = data.count;
    this.data.count = count;

    this.emit(Application.events.APP_READY);
  }
}
