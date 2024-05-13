import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";
import ReactFlow from "reactflow";

import "reactflow/dist/style.css";

function App() {
  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  ];
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif " }}>
      <Header />
      <div style={{ width: "80vw", height: "80vh" }}>
        <ReactFlow nodes={initialNodes} edges={initialEdges} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
