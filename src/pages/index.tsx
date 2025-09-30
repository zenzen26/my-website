import { useState } from "react";
import NavBar from "@/components/navbar";
import CodeOverallChart from "@/components/charts/codeoverall-barchart";
import CodeRadarChart from "@/components/charts/code-radarchart";
import SoftwareChart from "@/components/charts/software-barchart";
import Carousel3D from "@/components/featured-3dcarousel";
import Footer from "@/components/footer";



export default function Home() {
  const [activeTab, setActiveTab] = useState<"coding" | "software" | "overview">("overview");
  return (
    <main className="">
      <NavBar/>
      <section className="section">
        <div className="container-1 space-y-10 flex flex-col items-start justify-center">
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-start">
              <h2>Lorem</h2>
              <h1>ipsum dolor</h1>
            </div>
            <div className="img bg-black w-[400px] h-[200px]"></div>
          </div>
          <div className="relative w-full flex items-center justify-between">
            <svg width="1413" height="557" viewBox="0 0 1413 557" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M0.499998 43L0.499978 514C0.500009 537.472 19.5279 556.5 43 556.5L1370 556.5C1393.47 556.5 1412.5 537.472 1412.5 514L1412.5 162.5C1412.5 139.028 1393.47 120 1370 120L1014.44 120C990.413 120 970.938 100.524 970.937 76.5L970.937 43C970.937 19.5279 951.91 0.500042 928.437 0.500041L43 0.500002L41.9033 0.513674C18.9381 1.09536 0.500001 19.8946 0.499998 43Z" 
                fill="black" 
                stroke="black"
              />
            </svg>
            <p className="b1 text-right absolute top-0 right-8 max-w-[400px] leading-tight">Cras ullamcorper tempor arcu Vestibulum</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container-1 space-y-10 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1>- About -</h1>
            <p className="b1">Cras ullamcorper tempor arcu Vestibulum interdum</p>
          </div>

          <div className="w-full flex items-stretch justify-between pt-20 gap-10">
            {/* Left column */}
            <div className="flex flex-col items-start justify-between w-1/3">
              <p className="b2 text-left max-w-[70%]">UTS graduate with a bachelor of computer science (honours) major in AI & data analytics</p>
              <p className="b2 text-right max-w-[70%]">Love analyzing trends and predicting with it</p>
              <p className="b2 text-left max-w-[70%]">Hates coffee but needs it</p>
              <p className="b2 text-center max-w-[70%]">Some more bullshits here because idk what to write anymore</p>
            </div>

            {/* Middle image */}
            <div className="img bg-black w-1/3 min-h-[600px]"></div>

            {/* Right column */}
            <div className="flex flex-col items-end justify-between w-1/3">
              <p className="b2 text-left max-w-[70%]">like cats. like. A LOT.</p>
              <p className="b2 text-left max-w-[70%]">Cras ullamcorper tempor arcu. Vestibulum interdum efficitur est id ultricies. Maecenas luctus facilisis erat vel placerat. Fusce ut dolor tincidunt nibh pellentesque porttitor.</p>
              <p className="b2 text-center max-w-[70%]">One day I will be rich</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="section">
        <div className="container-1 space-y-10 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1>- Featured -</h1>
            <p className="b1">Cras ullamcorper tempor arcu Vestibulum interdum</p>
          </div>
          <div className="w-full flex items-center justify-center">
            <Carousel3D />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section">
        <div className="container-1 space-y-10 flex flex-col items-start justify-center">
          <div className="flex flex-col items-start justify-center">
            <h1>Skills -</h1>
            <div className="w-full flex items-center gap-10 pt-10">
              <button
                className={`btn b2 py-2 px-8 ${activeTab === "overview" ? "bg-black text-white" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`btn b2 py-2 px-8 ${activeTab === "coding" ? "bg-black text-white" : ""}`}
                onClick={() => setActiveTab("coding")}
              >
                Coding
              </button>
              <button
                className={`btn b2 py-2 px-8 ${activeTab === "software" ? "bg-black text-white" : ""}`}
                onClick={() => setActiveTab("software")}
              >
                Software
              </button>
  
            </div>
          </div>

           {/* Overview */}
          <div className={activeTab === "overview" ? "block flex gap-10" : "hidden"}>
            <div className="flex flex-col space-y-5">
              <div>
                <p className="b1"><b><u>Coding</u></b></p>
                <p className="b2">HTML/CSS, PHP, Python, SQL, Java, Javascript, C++</p>
              </div>
              <div>
                <p className="b1"><b><u>Software</u></b></p>
                <p className="b2">Tableau, PowerBI, Excel, Firebase, MS Access, Github, Lark, Salesforce</p>
              </div>
              <div>
                <p className="b1"><b><u>Tasks</u></b></p>
                <p className="b2">Data Cleaning, Database Schema Design, Developing AI Models, Data Exploration/Visualisation, Web Development, Web Design</p>
              </div>
            </div>
            <div className="flex flex-col space-y-5">
              <div>
                <p className="b1"><b><u>AI Projects</u></b></p>
                <p className="b2">Churn Predictions, Anomaly Detection, Object Classification, Sentiment Analysis, Recommendation System, Building AI agents</p>
              </div>
              <div>
                <p className="b1"><b><u>AI Models</u></b></p>
                <p className="b2">Decision Trees, Random Forest, LSTM, nnUnet, RestNet</p>
              </div>
            </div>
             

          </div>

           {/* Coding Skills */}
          <div className={activeTab === "coding" ? "w-full flex items-stretch justify-between gap-10" : "hidden"}>
            <div className="w-[45%] w-full"><CodeOverallChart /></div>
            <div className="w-[55%] w-full"><CodeRadarChart /></div>
          </div>

          {/* Software Skills */}
          <div className={activeTab === "software" ? "w-full min-h-[550px]" : "hidden"}>
            <SoftwareChart />
          </div>


        </div>
      </section>

      <Footer/>
    </main>

  );
}


