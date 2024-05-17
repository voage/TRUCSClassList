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
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [highlightedEdges, setHighlightedEdges] = useState<string[]>([]);

  // Function to handle node selection
  const handleNodeSelect = (event: React.MouseEvent, node: Node) => {
    // Find the course data corresponding to the selected node
    const selectedCourse = courseData.find((course) => course.code === node.id);
    setSelectedNode(selectedCourse || null);
    setDetailNodeVisible(true);

    // logic to highlight selected node and all edges/nodes its connected to
    const linkedNodes = new Set<string>();
    const linkedEdges: string[] = [];

    edges.forEach((edge) => {
      if (edge.source === node.id || edge.target === node.id) {
        linkedEdges.push(edge.id);
        linkedNodes.add(edge.source);
        linkedNodes.add(edge.target);
      }
    });

    setHighlightedNodes(Array.from(linkedNodes));
    setHighlightedEdges(linkedEdges);
  };

  // Function to toggle visibility of the detail node
  const toggleDetailNodeVisibility = () => {
    setDetailNodeVisible(!detailNodeVisible);
  };

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

  // Generating nodes from json data
  const createNodes = (data: Course[]): GraphData => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const columnCount = 8; // no. of columns and initial positions of the nodes
    const x = 50;
    const y = 75;

    data.forEach((course, index) => {
      // Calculate x and y positions based on index and columnCount
      const columnIndex = index % columnCount;
      const rowIndex = Math.floor(index / columnCount);

      // Set position for the current node
      const position = {
        x: x + columnIndex * 175,
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
          fontWeight: "600",
          color: "white",
          borderRadius: "0.5rem",
          background: highlightedNodes.includes(course.code)
            ? "#607274"
            : "#222831",
        },
      };

      nodes.push(node);

      //logic to generate the edges based on prereqs
      if (course.prereq) {
        // Extract prerequisite codes
        const prereqMatches = course.prereq.match(/[A-Z]{4} \d{4}/g);
        if (prereqMatches) {
          prereqMatches.forEach((prereq) => {
            edges.push({
              id: `${course.code}-${prereq}`,
              source: prereq.trim(),
              target: course.code,
              animated: highlightedEdges.includes(`${course.code}-${prereq}`),
              style: {
                stroke: highlightedEdges.includes(`${course.code}-${prereq}`)
                  ? "#FF2E63"
                  : "#50727B",
              },
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
