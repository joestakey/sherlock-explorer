import '@animxyz/core';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from "react-query";
import fetchReports from '../modules/api/fetchApi';
import { createFile, Element } from '../modules/utils';

export default function Home() {
  const [user, setUser] = useState<string>('');
  const [status, setStatus] = useState("idle")
  const [visible, setVisible] = useState<boolean>(false);
  const [downloadLink, setDownloadLink] = useState<JSX.Element | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const callBack = () => fetchReports(user);
  const sortFindings = (data: Element[]) => {
    const highPriorityItems = data.filter(
      (element: Element) => element.labels[0]?.name === "High"
    );
    const medPriorityItems = data.filter(
      (element: Element) => element.labels[0]?.name !== "High"
    );
    const highSortedItems = [...highPriorityItems].sort(
      (a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      }
    );
    const medSortedItems = [...medPriorityItems].sort(
      (a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      }
    );
    return { highSortedItems, medSortedItems };
  }

  const { data, isError, isLoading } = useQuery(
    ['user', user],
    callBack,
    { enabled: !! user}
    );
    
  const clickHandler = () => {
    setStatus("idle");
    if(inputRef.current?.value === "") {
      setStatus("error");
      return;
    }
    if (inputRef.current !== null && inputRef.current?.value !== user) {
      setUser(inputRef.current.value);
      return;
    }
    data?.length ? setStatus("success") : setStatus("error");
  };

  useEffect(() => {
    setVisible(true);
  }, []);
  
  useEffect(() => {
    
    if (( data?.length === 0)) {
      setStatus("error");
    } else {
      if (data !== undefined) {
        setStatus("success");
        let { highSortedItems, medSortedItems } = sortFindings(data);
        let highReport = createFile(highSortedItems, user, true);
        let medReport = createFile(medSortedItems, user, false);
        const blob = new Blob([highReport+medReport], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        // Create a download link
        setDownloadLink(
          <div className="mb-4 sm:mb-6">
            <a href={url} className="underline text-sm hover:text-indigo-500" download="SherlockFindingsReport.md">
              download {user} Sherlock findings report
            </a>
          </div>
        );
        return;
      } else if (inputRef.current?.value !== ""){
        setStatus("error");
        return;
      }
    }
  }, [data]);

  function MyReports({ data }: { data: any[] }) {
    let { highSortedItems, medSortedItems } = sortFindings(data);
    return (
        <div className="mt-8 sm:mt-12">
          <div className="text-xl sm:text-2xl font-custom-bold">{user} Sherlock contests reports: {highSortedItems.length + medSortedItems.length} findings</div>
          {downloadLink}
          <div className="divide-y">
            <div className="p-4 mb-2 rounded bg-gradient-to-r from-rose-500 to-rose-400">
              <div className="text-left text-lg sm:text-xl mb-2">{highSortedItems.length} High severity findings</div>
              {highSortedItems.map((element) => (
                <div key={element.title} className="relative border-none">
                  <div className="p-2 bg-gradient-to-r border-b border-rose-300 from-rose-200 to-rose-100 transition-filter duration-300 hover:brightness-125 relative flex items-start space-x-3">
                    <div className="max-w-[14rem] phone:max-w-[18rem] largePhone:max-w-xs sm:max-w-md md:max-w-xl lg:max-w-[39rem]">
                      <a href={element.url.replace('api.github.com/repos', 'github.com')} target="_blank" rel="noreferrer noopener" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-xs sm:text-sm text-left font-medium text-gray-900 truncate">
                          {element.title}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 mb-2 rounded bg-gradient-to-r from-blue-500 to-blue-400">
              <div className="text-left text-lg sm:text-xl mb-2 ">{medSortedItems.length} Medium severity findings</div>
              {medSortedItems.map((element) => (
                <div key={element.title} className="relative border-none">
                  <div className="p-2 bg-gradient-to-r border-b border-blue-300 from-blue-200 to-blue-100 transition-filter duration-300 hover:brightness-125 relative flex items-start space-x-3 ">
                    <div className="max-w-[14rem] phone:max-w-[18rem] largePhone:max-w-xs sm:max-w-md md:max-w-xl lg:max-w-[39rem]">
                      <a href={element.url.replace('api.github.com/repos', 'github.com')} target="_blank" rel="noreferrer noopener" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-xs sm:text-sm text-left font-medium text-gray-900 whitespace-nowrap truncate">
                          {element.title}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>    
          </div>
        </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Sherlock contests finding browser - Sherlock Explorer</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-16 font-custom">
        <div>
          <div>
            <header className="block lg:hidden absolute inset-x-0 top-0 z-50">
              <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="lg:flex-1">
                  <div>
                    <a href="https://github.com/joestakey" aria-label="Github" target="_blank" rel="noreferrer noopener">
                      <Image
                        src="/images/signature.png"
                        className="h-5 sm:h-7 w-auto"
                        alt=""
                        width={100}
                        height={100}
                      />
                    </a>            
                  </div>
                  <div className="font-custom-bold text-[#031672] text-2xl sm:text-3xl">
                    Sherlock Explorer
                  </div>
                </div>
              </nav>
            </header>

            <div className="relative isolate pt-14 lg:px-8">
              <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
              >
                <div
                  className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                />
              </div>
              <div className="max-w-2xl py-6 sm:py-14 lg:py-22">
                <div>
                  <div className={`opacity-0 transform transition-all ease-out transition-opacity ${
                    visible ? 'opacity-100 translate-y-0' : '-translate-y-4 sm:-translate-y-8'
                    }`}
                  >
                    <h1 className="text-[2.5rem] leading-10 sm:leading-[3.5rem] font-custom-bold tracking-tight text-gray-900 sm:text-[3.5rem]">
                      Make your own Sherlock portfolio
                    </h1>
                  </div>
                  <div className={`opacity-0 transform transition-all delay-700 ease-out transition-opacity ${
                    visible ? 'opacity-100 translate-y-0' : '-translate-y-4 sm:-translate-y-8'
                    }`}
                  >
                    <p className="mt-6 text-xl sm:text-2xl leading-7 sm:leading-8 text-gray-600">
                      Enter your github username to see all your findings in Sherlock contests and generate a report
                    </p>
                    <div className="mt-8 text-gray-600">
                      <label htmlFor="username">
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                          ref={inputRef}
                          type="text"
                          name="username"
                          id="username"
                          className="block w-full rounded-md border-0 py-1.5 px-3.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="username"
                        />
                      </div>
                    </div>
                    <div id="container" className="mt-4 items-center justify-center gap-x-6" >
                      <button
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        aria-label="search-findings"
                        onClick={clickHandler}
                      >
                        Get your findings
                      </button>
                    </div>
                  </div>
                  <div>
                    {
                      (() => {
                          if (data !== undefined && status === "success") {
                            return (
                              <div className="container">                            
                                { 
                                  data !== undefined &&
                                  < MyReports data={data} />                              
                                }
                              </div>
                            );
                          }
                          if (isLoading) {
                            return <div className="center">Loading...</div>;
                          }                  
                          if (status === "error") {
                            return (
                              <div className="center">
                                🧐 We found no reports for this user, are you sure the spelling is correct?
                              </div>
                            );
                          }
                          if (isError) {
                            return (
                              <div className="center">
                                There was an error fetching your reports{" "}
                                <span role="img" aria-label="sad">
                                  😢
                                </span>
                              </div>
                            );
                          }
                      })()
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
