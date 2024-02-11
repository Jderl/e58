import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Poll from "./components/Poll";
//functional component
const App = () => {
  return (
    <>
      <Container>
        <Poll />
      </Container>
    </>
  );
};
export default App;
