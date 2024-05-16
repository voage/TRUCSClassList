import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import courseData from "./com-courses.json";
import "reactflow/dist/style.css";
import { useState } from "react";

function App() {
  // State to keep track of the selected node
  const [selectedNode, setSelectedNode] = useState<Course | null>(null);

  // Function to handle node selection
  const handleNodeSelect = (event: React.MouseEvent, node: Node) => {
    // Find the course data corresponding to the selected node
    const selectedCourse = courseData.find((course) => course.code === node.id);
    // Update the selectedNode state
    setSelectedNode(selectedCourse || null);
  };

  console.log(courseData);

  // Interfaces

  interface Course {
    code: string;
    title: string;
    credits: string;
    description: string;
    prereq: string;
  }

  interface Edge {
    id: string;
    source: string;
    target: string;
  }

  interface GraphData {
    nodes: Node[];
    edges: Edge[];
  }
  // Generate nodes

  const createNodes = (data: Course[]): GraphData => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const columnCount = 8; // Number of columns in the grid
    const x = 100; // Initial x position
    const y = 100; // Initial y position

    data.forEach((course, index) => {
      // Calculate x and y positions based on index and columnCount
      const columnIndex = index % columnCount;
      const rowIndex = Math.floor(index / columnCount);

      // Set position for the current node
      const position = {
        x: x + columnIndex * 200, // Adjust the spacing between columns as needed
        y: y + rowIndex * 100, // Adjust the spacing between rows as needed
      };

      // Create node and push to nodes array
      const node: Node = {
        id: course.code,
        type: "default",
        data: { label: course.code },
        position,
        draggable: false,
        dragging: false,
      };

      nodes.push(node);

      if (course.prereq) {
        // Extract prerequisite codes
        const prereqMatches = course.prereq.match(/[A-Z]{4} \d{4}/g);
        if (prereqMatches) {
          prereqMatches.forEach((prereq) => {
            edges.push({
              id: `${course.code}-${prereq}`,
              source: prereq.trim(), // Trim to remove whitespace
              target: course.code,
            });
          });
        }
      }
    });

    return { nodes, edges };
  };

  const { nodes, edges } = createNodes(courseData);

  // Div to show course details

  const DetailNode = () => {
    if (!selectedNode) return null;

    return (
      <div className="w-1/4 rounded-md flex flex-col p-4 ">
        <h2 className="text-xl font-semibold">{selectedNode.title}</h2>
        <p>
          <strong>Code:</strong> {selectedNode.code}
        </p>
        <p>
          <strong>Credits:</strong> {selectedNode.credits}
        </p>
        <p>
          <strong>Description:</strong> {selectedNode.description}
        </p>
        <p>
          <strong>Prerequisites:</strong> {selectedNode.prereq}
        </p>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif " }}>
      <Header />
      <div className="w-full h-screen flex gap-2 ">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          zoomOnScroll={false}
          onNodeClick={handleNodeSelect}
        >
          <Controls />
        </ReactFlow>
        <DetailNode />
      </div>
      <Footer />
    </div>
  );
}

export default App;
