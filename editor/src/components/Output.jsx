import { useState } from "react";
import { executeCode } from "../api";

function Output({ editorRef, language }) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode.trim()) return;

    setLoading(true);
    try {
      const { run } = await executeCode(language, sourceCode);
      setOutput(run.output || run.stderr || "No output");
    } catch {
      setOutput("Error running code");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col h-full bg-[#2d2d2d] text-[#218e5e] ">
      <div className="flex justify-between items-center  text-[#218e5e] border-b border-[#131519]">
        <h3 className=" font-semibold text-lg  ">Output :</h3>
        <button
          onClick={runCode}
          disabled={loading}
          className="bg-[#131519] h-[35px] w-1/8 text-[#218e5e] px-2  mr-10 rounded border-none rounded-full "
        >
          {loading ? "Running..." : "Run ▶"}
        </button>
      </div>
      <pre className="flex-1 text-green-400 p-3 overflow-auto text-lg whitespace-pre-wrap">
        {output ? output :  " Run to see the output here.."}
      </pre>
    </div>
  );
}

export default Output;
