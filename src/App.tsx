import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import courseData from "./com-courses.json";

import "reactflow/dist/style.css";

function App() {
  console.log(courseData);
  interface Course {
    code: string;
    title: string;
    credits: string;
    description: string;
    prereq: string;
  }

  const transformDataToNodes = (data: Course[]): Node[] => {
    const nodes: Node[] = [];
    const columnCount = 7; // Number of columns in the grid
    let x = 100; // Initial x position
    let y = 100; // Initial y position

    data.forEach((course, index) => {
      // Calculate x and y positions based on index and columnCount
      const columnIndex = index % columnCount;
      const rowIndex = Math.floor(index / columnCount);

      // Set position for the current node
      const position = {
        x: x + columnIndex * 300, // Adjust the spacing between columns as needed
        y: y + rowIndex * 200, // Adjust the spacing between rows as needed
      };

      // Create node and push to nodes array
      const node: Node = {
        id: course.code,
        type: "default",
        data: { label: course.code },
        position,
        dragHandle: false,
        dragging: false,
      };

      nodes.push(node);
    });

    return nodes;
  };

  const nodes: Node[] = transformDataToNodes(courseData);
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif " }}>
      <Header />
      <div style={{ width: "100vw", height: "200vh" }}>
        <ReactFlow nodes={nodes} fitView>
          <Controls />
        </ReactFlow>
      </div>
      <Footer />
    </div>
  );
}

export default App;
