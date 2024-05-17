interface Course {
  code: string;
  title: string;
  credits: string;
  description: string;
  prereq: string;
}

interface DetailNodeProps {
  selectedNode: Course | null;
  detailNodeVisible: boolean;
  toggleDetailNodeVisibility: () => void;
}

function DetailNode({
  selectedNode,
  detailNodeVisible,
  toggleDetailNodeVisibility,
}: DetailNodeProps) {
  if (!selectedNode || !detailNodeVisible) return null;

  return (
    <div className="w-1/4 rounded-md flex flex-col p-4 overflow-y-auto">
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
      <button
        className="border rounded-md p-4 my-4 bg-slate-500 hover:bg-slate-700"
        onClick={toggleDetailNodeVisibility}
      >
        Close
      </button>
    </div>
  );
}

export default DetailNode;
