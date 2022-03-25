import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import moment from "moment";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

function MovieList() {
  const [allData, setallData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [errMsg, setErrorMsg] = useState("");
  const [sortt, setSortt] = useState(false);
  const [sortType, setSortType] = useState("asc");
  const [load, setLoad] = useState(false);

  useEffect(() => {}, []);

  const loadMore = async () => {
    setLoad(true);
    setLoading(true);
    setPage((page) => page + 1);
    if (sortt === true) {
      setSortt(true);
      setPage((page) => page + 1);
      setallData((data) => [...data]);
    }
  };

  const sort = () => {
    setSortt(true);
    setLoading(true);
    setSortType("asc");
  };

  const handleScroll = (e) => {
    // const target = e.target;
    // console.log("scroll", target);
    // if (target.scrollHeight - target.scrollTop === target.clientHeight) {
    //   //do
    //   loadMore();
    //   console.log(page);
    // }
    // // const bottom =
    // //   // window.innerHeight + document.documentElement.scrollTop ===
    // //   // document.scrollingElement.scrollHeight;
    // //   e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    // // if (bottom) {
    // //   loadMore();
    // //   console.log("BAWAH");
    // // }
  };

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const list = allData;

      if (sortt === true) {
        const sortList = () => {
          if (sortType === "asc") {
            return list.sort((a, b) => {
              return parseFloat(a.vote_average) - parseFloat(b.vote_average);
            });
          } else {
            return list.sort((a, b) => {
              return parseFloat(b.vote_average) - parseFloat(a.vote_average);
            });
          }
        };
        sortList();
      }

      try {
        if (sortt === false) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=29cc88a702bd22ca0b5c97a5f5124dd1&language=en-US&page=${page}`
          );

          console.log(response.data);

          setallData((data) => [...data, ...response.data.results]);
          setErrorMsg("");
        } else if (load === true && sortt === true) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=29cc88a702bd22ca0b5c97a5f5124dd1&language=en-US&page=${page}`
          );

          console.log(response.data);

          setallData((data) => [...data, ...response.data.results]);
          setErrorMsg("");
        }
        // else {
        //     const response = await axios.get(
        //       `https://api.themoviedb.org/3/movie/now_playing?api_key=29cc88a702bd22ca0b5c97a5f5124dd1&language=en-US&page=${page}
        //         )}`
        //     );
        //     setallData((data) => [...data, ...response.data.results]);
        //     setErrorMsg("");
        //   }
        // const response = await axios.get(
        //   `https://api.themoviedb.org/3/movie/now_playing?api_key=29cc88a702bd22ca0b5c97a5f5124dd1&language=en-US&page=${page}
        //         )}`
        // );
        // setallData((data) => [...data, ...response.data.results]);
        // setErrorMsg("");
      } catch (error) {
        setErrorMsg("Error while loading data. Try again later.");
      } finally {
        setLoading(false);
      }
      // loadData();
    };
    // if (sortt === false) {
    //   loadData();
    // } else {
    //   loadData();
    // }
    loadData();
  }, [page, sortt, load]);

  console.log(allData);

  return (
    <>
      <div className="flex flex-col items-center" onScroll={handleScroll}>
        {window.innerHeight + document.documentElement.scrollTop ===
          document.scrollingElement.scrollHeight && loading ? (
          <>
            <Loader
              type="Bars"
              color="#032541"
              height={50}
              width={50}
              timeout={5000} //3 secs
            ></Loader>
          </>
        ) : (
          <>
            <button onClick={() => sort()}>Sort rating</button>
            <div
              className="flex flex-wrap w-10/12 justify-center mx-32 mt-4"
              onScroll={() => handleScroll}
            >
              {allData.map((item, index) => {
                return (
                  <div
                    style={{ width: "150px", minWidth: "150px" }}
                    className="m-2"
                  >
                    <Link
                      to={
                        `/detail/` +
                        item.id +
                        `-` +
                        item.title
                          .replace(/\s/g, "-")
                          .replace(/[%:.*+?^${}()|[\]\\]/g, "")
                          .toLowerCase()
                      }
                    >
                      <img
                        alt="poster"
                        src={
                          `https://www.themoviedb.org/t/p/w440_and_h660_face/` +
                          item.poster_path
                        }
                        className="cursor-pointer w-full h-auto rounded-lg shadow-lg"
                      />
                    </Link>

                    <div className=" h-10 w-10 relative -top-4 left-3">
                      <CircularProgressbarWithChildren
                        value={item.vote_average * 10}
                        className="bg-black rounded-full"
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                          backgroundColor: "#032541",
                          textColor: "#fff",
                          pathColor: "#21d07a",
                          trailColor: "#204529",
                          strokeLinecap: "round",
                        })}
                      >
                        <div className="flex text-white justify-center">
                          <span
                            style={{ fontSize: "12px" }}
                            className="font-bold"
                          >
                            {item.vote_average * 10}
                          </span>{" "}
                          <span style={{ fontSize: "8px" }} className="-mt-0">
                            %
                          </span>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                    <div className="p-2 -mt-4">
                      <p className="font-bold">{item.title}</p>
                      <p>{moment(item.release_date).format("ll")}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <button onClick={loadMore}>Load More</button>
      </div>
    </>
  );
}

export default MovieList;
