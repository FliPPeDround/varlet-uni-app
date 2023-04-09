// Component entry, the folder where the file exists will be exposed to the user
import Fab from './Fab.mjs';
Fab.install = function (app) {
  app.component(Fab.name, Fab);
};
export var _FabComponent = Fab;
export default Fab;