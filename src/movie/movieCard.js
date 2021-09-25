import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import moment from "moment";

function MovieList() {
  const [allData, setallData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=29cc88a702bd22ca0b5c97a5f5124dd1&language=en-US&page=1`
      )
      .then((res) => {
        console.log(res.data);
        setallData(res.data.results);
      });
  }, []);

  return (
    <>
      <div className="flex flex-wrap w-10/12 justify-center mx-32 mt-4">
        {allData.map((item, index) => {
          return (
            <div style={{ width: "150px", minWidth: "150px" }} className="m-2">
              <img
                src={
                  `https://www.themoviedb.org/t/p/w440_and_h660_face/` +
                  item.poster_path
                }
                className="cursor-pointer w-full h-auto rounded-lg shadow-lg"
              />
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
                    <span style={{ fontSize: "12px" }} className="font-bold">
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
  );
}

export default MovieList;
