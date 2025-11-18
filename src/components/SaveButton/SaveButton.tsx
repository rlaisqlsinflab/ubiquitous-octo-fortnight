import { useEditorData } from '../../hooks/useEditorData/useEditorData';

export const SaveButton = () => {
  const { generateJson, generateHTML } = useEditorData();

  const handleGenerateJson = () => {
    console.log(JSON.parse(generateJson()), generateJson());
  };

  const handleGenerateHTML = () => {
    console.log(generateHTML());
  };

  return (
    <>
      <button onClick={handleGenerateJson}>저장</button>
      <button onClick={handleGenerateHTML}>HTML export</button>
    </>
  );
};
