import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import DetailNode from "./components/DetailNode.tsx";
import "./index.css";
import ReactFlow, { Controls } from "reactflow";
import courseData from "./com-courses.json";
import "reactflow/dist/style.css";
import { useState } from "react";

function App() {
  // State to keep track of the selected node
  const [selectedNode, setSelectedNode] = useState<Course | null>(null);
  const [detailNodeVisible, setDetailNodeVisible] = useState<boolean>(true);

  // Function to handle node selection
  const handleNodeSelect = (event: React.MouseEvent, node: Node) => {
    // Find the course data corresponding to the selected node
    const selectedCourse = courseData.find((course) => course.code === node.id);
    // Update the selectedNode state
    setSelectedNode(selectedCourse || null);
    setDetailNodeVisible(true);
  };

  // Function to toggle visibility of the detail node
  const toggleDetailNodeVisibility = () => {
    setDetailNodeVisible(!detailNodeVisible);
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

    const columnCount = 8;
    //initial positions
    const x = 100;
    const y = 100;

    data.forEach((course, index) => {
      // Calculate x and y positions based on index and columnCount
      const columnIndex = index % columnCount;
      const rowIndex = Math.floor(index / columnCount);

      // Set position for the current node
      const position = {
        x: x + columnIndex * 200,
        y: y + rowIndex * 100,
      };

      // Create node
      const node: Node = {
        id: course.code,
        type: "default",
        data: { label: course.code },
        position,
        draggable: false,
        dragging: false,
        style: {
          background: "#9CA3AF",
        },
      };

      nodes.push(node);

      if (course.prereq) {
        // Extract prerequisite codes
        const prereqMatches = course.prereq.match(/[A-Z]{4} \d{4}/g);
        if (prereqMatches) {
          prereqMatches.forEach((prereq) => {
            edges.push({
              id: `${course.code}-${prereq}`,
              source: prereq.trim(),
              target: course.code,
            });
          });
        }
      }
    });

    return { nodes, edges };
  };

  const { nodes, edges } = createNodes(courseData);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif " }}>
      <Header />
      <div className="w-full h-screen flex gap-2 ">
        <ReactFlow nodes={nodes} edges={edges} onNodeClick={handleNodeSelect}>
          <Controls />
        </ReactFlow>
        <DetailNode
          selectedNode={selectedNode}
          detailNodeVisible={detailNodeVisible}
          toggleDetailNodeVisibility={toggleDetailNodeVisibility}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
