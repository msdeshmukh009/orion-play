import { Base } from "./components/base/Base";
import { NavigationRoutes } from "./routes/NavigationRoutes";

const App = () => {
  return (
    <div className="App">
      <Base>
        <NavigationRoutes />
      </Base>
    </div>
  );
};

export { App };
