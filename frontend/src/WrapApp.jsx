import { UserProvider } from "./Pages/Context/Context";
import App from "./App";
function WrapApp() {
  return (
    <>
      <UserProvider>
        <App />
      </UserProvider>
    </>
  );
}

export default WrapApp;
