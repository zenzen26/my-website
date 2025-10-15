import { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/navbar";
import CodeOverallChart from "@/components/charts/codeoverall-barchart";
import CodeRadarChart from "@/components/charts/code-radarchart";
import SoftwareChart from "@/components/charts/software-barchart";
import Carousel3D from "@/components/featured-3dcarousel";
import Footer from "@/components/footer";



export default function Home() {
  const [activeTab, setActiveTab] = useState<"coding" | "software" | "overview">("overview");
  const [mounted, setMounted] = useState(false);
   useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <main className="">
      <NavBar/>
      <section className="section">
        <div className="container-1 sm:space-y-10 flex flex-col items-start justify-center">
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-start">
              <h2>Hello!</h2>
              <h1 className="pb-5 md:pb-0 md:!leading-none">I&apos;m Zen <span className="hidden sm:contents">:D</span></h1>
            </div>
            <div className="hidden sm:block sm:w-[300px] lg:w-[400px] sm:h-[150px] lg:h-[200px] relative rounded-xl border-2 outline-double overflow-hidden">
              <Image
                src="/images/home-1.gif"
                alt="Animation"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative w-full flex sm:items-center justify-between">
            <div className="hidden md:block relative w-full h-1000 sm:md:max-h-[370px] md:max-h-[420px] lg:max-h-[500px] 2xl:max-h-[557px]">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1413 557"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Mask for the GIF */}
                  <mask id="gifMask">
                    <path
                      d="M0.5 43L0.5 514C0.5 537.472 19.528 556.5 43 556.5L1370 556.5C1393.47 556.5 1412.5 537.472 1412.5 514L1412.5 162.5C1412.5 139.028 1393.47 120 1370 120L1014.44 120C990.413 120 970.938 100.524 970.937 76.5L970.937 43C970.937 19.528 951.91 0.5 928.437 0.5L43 0.5L41.9033 0.514C18.9381 1.09536 0.5 19.895 0.5 43Z"
                      fill="white"
                    />
                  </mask>
                </defs>

                {/* GIF using the mask */}
                <image
                  href="/images/mewo.gif"
                  width="200"
                  height="200"
                  x={(1413 - 200) / 2} // center horizontally
                  y={(557 - 200) / 2} // center vertically
                  mask="url(#gifMask)"
                  preserveAspectRatio="xMidYMid meet"
                />

                {/* Separate inset path for border to avoid clipping */}
                <path
                  d="M5 48L5 509C5 532 24 551 48 551L1365 551C1389 551 1408 532 1408 509L1408 167C1408 144 1389 125 1365 125L1010 125C986 125 966 105 966 81L966 48C966 25 947 1 924 1L48 1L46 1C22 2 4 21 4 44Z"
                  fill="none"
                  stroke="black"
                  strokeWidth={5}
                />
              </svg>

               <div className="absolute bottom-0 pb-10 left-1/2 transform -translate-x-1/2 w-[calc(100%-80px)] flex space-x-10 z-20 p-2 rounded">
                <a href="#about" className="btn py-1 px-5"><h4>About &gt;</h4></a>
                <a href="#featured" className="btn py-1 px-5"><h4>Featured &gt;</h4></a>
                <a href="#skills" className="btn py-1 px-5"><h4>Skills &gt;</h4></a>
              </div>
            </div>
            <p className="b1 text-left md:text-right md:absolute md:top-0 md:right-8 md:max-w-[28%] leading-tight"> Here are some snippets about me and my work :3</p>
          </div>

          <div className="block md:hidden w-full h-[150px] sm:h-[200px] mt-10 sm:mt-0 relative rounded-xl border-2 outline-double overflow-hidden flex justify-center items-center">
            <Image
              src="/images/mewo.gif"
              alt="Animation"
              width={0} // let class handle width
              height={0} // let class handle height
              className="w-1/4 h-auto object-contain"
            />
          </div>


          <div className="block md:hidden w-full flex flex-col space-y-5 mt-10 sm:mt-0">
            <p className="b1 underline"><b>Jump quickly to:</b></p>
            <div className="flex gap-2">
              <a href="#about" className="btn py-1 sm:px-8 px-2"><h4>About</h4></a>
              <a href="#featured" className="btn py-1 sm:px-8 px-2"><h4>Featured</h4></a>
              <a href="#skills" className="btn py-1 sm:px-8 px-2"><h4>Skills</h4></a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container-1 space-y-10 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="pb-5 lg:pb-0"><span className="hidden sm:contents">- </span> About <span className="hidden sm:contents">- </span> </h1>
            <p className="b1 text-center text-gray-500">A little about me, my work, and what I’m passionate about</p>
          </div>

          <div className="flex flex-col md:flex-row w-full md:items-center lg:items-stretch lg:justify-between lg:pt-20 sm:gap-2 md:gap-5 lg:gap-10">
            {/* Left column */}
            <div className="hidden lg:flex flex-col items-start justify-between sm:max-w-1/3 w-1/3 space-y-10">
              <p className="b2 text-left max-w-[70%]">UTS graduate with a bachelor of computer science (honours) major in AI & data analytics</p>
              <p className="b2 text-right max-w-[70%]">Love analyzing trends and predicting with it</p>
              <p className="b2 text-left max-w-[70%]">Hates coffee but needs it</p>
              <p className="b2 text-center max-w-[70%]">Some more bullshits here because idk what to write anymore</p>
            </div>

            {/* Middle image */}
            <div className="w-full lg:w-1/3 min-h-[350px] sm:min-w-[35px] md:min-w-[420px] lg:min-h-[600px] relative rounded-xl border-2 outline-double overflow-hidden">
              <Image
                  src="/images/home-1.jpg"
                  alt="Animation"
                  fill
                  className="object-cover object-[center_80%]"
                />
            </div>
            <div className="flex lg:hidden flex-col pt-10 md:ot-0">
              <p className="b2 text-justify">UTS grad in <mark>Computer Science (AI & Data Analytics)</mark> who loves uncovering patterns, because apparently, letting some numbers decide our future is the norm now. <br/>  <br/> I build <mark>predictive ML models</mark> for fun (and for work), help people make smarter decisions, and survive on <mark>cats</mark>, not coffee… though lately coffee keeps sneaking in.</p>
            </div>

            {/* Right column */}
            <div className="hidden lg:flex flex-col items-end justify-between sm:max-w-1/3 w-1/3 ">
              <p className="b2 text-left max-w-[70%]">like cats. like. A LOT.</p>
              <p className="b2 text-left max-w-[70%]">I&apos;m colour blind so you might need to pay attention on the road cuz i may or may not be able to see the traffic light precisely</p>
              <p className="b2 text-center max-w-[70%]">One day I will be rich</p>
            </div>
          </div>
        </div>
      </section>

     
      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="container-1 space-y-10 flex flex-col items-start justify-center">
          <div className="flex flex-col items-start justify-center">
            <h1 className="pb-5">Skills<span className="hidden sm:contents"> -</span></h1>
            <div className="w-full flex items-center gap-2 sm:gap-10">
              <button
                className={`btn b2 py-2 px-5 sm:px-8 ${activeTab === "overview" ? "bg-black text-white" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`btn b2 py-2 px-5 sm:px-8 ${activeTab === "coding" ? "bg-black text-white" : ""}`}
                onClick={() => setActiveTab("coding")}
              >
                Coding
              </button>
              <button
                className={`btn b2 py-2 px-5 sm:px-8 ${activeTab === "software" ? "bg-black text-white" : ""}`}
                onClick={() => setActiveTab("software")}
              >
                Software
              </button>
  
            </div>
          </div>

           {/* Overview */}
          <div className={activeTab === "overview" ? "block flex flex-col sm:flex-row sm:gap-7 lg:gap-10" : "hidden"}>
            <div className="flex flex-col pb-5 sm:pb-0 space-y-5 md:w-1/2">
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
            <div className="flex flex-col space-y-5 md:w-1/2">
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
          <div className={activeTab === "coding" ? "w-full flex flex-col sm:flex-row items-stretch justify-between gap-4 lg:gap-10" : "hidden"}>
            <div className="w-full sm:max-w-[45%] h-[350px] sm:h-auto">
              <CodeOverallChart />
            </div>

            <div className="hidden sm:block sm:w-full sm:max-w-[55%] h-[350px] sm:h-auto">
              <CodeRadarChart />
            </div>
          </div>

          {/* Software Skills */}
          <div className={activeTab === "software" ? "w-full min-h-[500px]" : "hidden"}>
            <SoftwareChart />
          </div>


        </div>
      </section>

       {/* Featured Section */}
      <section id="featured" className="section">
        <div className="container-1 space-y-10 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="pb-5 lg:pb-0"><span className="hidden sm:contents">- </span> Featured <span className="hidden sm:contents"> -</span></h1>
            <p className="b1 text-left sm:text-center text-gray-500">Some of my proudest projects</p>
          </div>
          <div className="w-full flex items-center justify-center">
            <Carousel3D />
          </div>
        </div>
      </section>


      <Footer/>
    </main>

  );
}


