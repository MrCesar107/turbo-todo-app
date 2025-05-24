import { Application } from "@hotwired/stimulus";
import ListsController from "./controllers/lists_controller";
import ListHeaderController from "./controllers/list_header_controller";
import ListController from "./controllers/list_controller";

window.Stimulus = Application.start();
Stimulus.register("lists", ListsController);
Stimulus.register("list-header", ListHeaderController);
Stimulus.register("list", ListController);