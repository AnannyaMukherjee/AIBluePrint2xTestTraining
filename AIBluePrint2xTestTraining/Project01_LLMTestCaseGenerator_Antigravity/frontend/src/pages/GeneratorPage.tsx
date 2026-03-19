import React, { useState } from 'react';
import axios from 'axios';
import { Send, Loader } from 'lucide-react';

export default function GeneratorPage() {
  const [requirements, setRequirements] = useState('');
  const [type, setType] = useState('functional');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerate = async () => {
    if (!requirements.trim()) return;
    
    setLoading(true);
    setErrorMsg('');
    setOutput('');
    
    try {
      const res = await axios.post('/api/generate', { requirements, type });
      setOutput(res.data.testCases);
    } catch (err: any) {
       setErrorMsg(err.response?.data?.error || 'Failed to generate test cases.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
       
       {/* Top: Output View */}
       <div className="flex-1 bg-[#14161a] border border-[#2d3139] rounded-lg overflow-hidden flex flex-col">
          <div className="bg-[#1d2127] px-4 py-3 border-b border-[#2d3139] flex justify-between items-center">
             <h2 className="font-semibold text-white">Test Case Generator with Local LLM / Cloud Keys</h2>
             <select 
               className="bg-[#0f1115] border border-[#2d3139] text-sm rounded px-2 py-1 text-gray-300"
               value={type}
               onChange={(e) => setType(e.target.value)}
             >
               <option value="functional">Functional Tests</option>
               <option value="non-functional">Non-Functional Tests</option>
             </select>
          </div>
          
          <div className="flex-1 p-6 overflow-auto">
             {loading ? (
                 <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                     <Loader className="animate-spin" size={32} />
                     <p>AI is generating Jira Markdown...</p>
                 </div>
             ) : errorMsg ? (
                 <div className="text-red-400 bg-red-900/20 p-4 rounded border border-red-900/50">
                    {errorMsg}
                 </div>
             ) : output ? (
                <div className="jira-panel whitespace-pre-wrap font-mono text-sm text-[#a0aab5]">
                   {output}
                </div>
             ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                    Submit Jira requirements below to generate test cases.
                </div>
             )}
          </div>
       </div>

       {/* Bottom: Input Box */}
       <div className="bg-[#1d2127] border border-[#2d3139] rounded-lg p-2">
           <textarea 
             placeholder="Ask here for TC based on Requirements. (Paste Jira descriptions here...)" 
             className="w-full bg-transparent border-none text-white focus:ring-0 p-3 h-32 resize-none"
             value={requirements}
             onChange={(e) => setRequirements(e.target.value)}
           />
           <div className="flex justify-between items-center px-2 pb-2">
               <span className="text-xs text-gray-500">Press Generate to create {type} cases.</span>
               <button 
                 onClick={handleGenerate}
                 disabled={loading || !requirements.trim()}
                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-md transition-colors font-medium"
               >
                  {loading ? 'Generating...' : 'Generate Cases'}
                  <Send size={16} />
               </button>
           </div>
       </div>

    </div>
  );
}
