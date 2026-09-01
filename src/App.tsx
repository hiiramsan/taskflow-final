import { useEffect, useState } from "react"

type InfoData = {
  app: string;
  version: string;
}

function App() {

  const [info, setInfo] = useState<InfoData>();

  const fetchInfo = async () => {

    const response = await fetch("https://d3ujwk09smrk9z.cloudfront.net/info");
    const data = await response.json();
    setInfo(data);

  }

  useEffect(() => {
    fetchInfo();
  }, [])

  return (
    <>
      <div className="container">
        <h1>TaskFlow</h1>
        <p>App: {info?.app}</p>
        <p>Version: {info?.version}</p>
      </div>
    </>
  )
}

export default App
