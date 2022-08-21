import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import moment from "moment";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const [allData, setallData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState([]);

  let { id } = useParams();
  // console.log("SLUG", id);
  // console.log("ID", id);

  useEffect(() => {
    setLoading(true);
    // console.log("ID", id);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=29cc88a702bd22ca0b5c97a5f5124dd1&language=en-US`
      )
      .then((res) => {
        // console.log(res.data);

        setallData(res.data);
        setGenre(res.data.genres);
        setLoading(false);
      });
  }, [id]);

  // console.log("Film detail", allData);
  return (
    <>
      {loading ? (
        <>
          <div className="center-screen ">
            <div className="flex-col justify-center space-y-2">
              <Loader
                type="Bars"
                color="#032541"
                height={50}
                width={50}
                timeout={3000} //3 secs
              ></Loader>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              backgroundImage: `linear-gradient(to right bottom, rgb(9, 19, 33), rgba(9, 19, 33, 0.84)), url(${
                "https://www.themoviedb.org/t/p/w1920_and_h800_face/" +
                allData.backdrop_path
              })`,
              backgroundSize: "cover",
              backgroundRepeat: "initial",
            }}
            className="bg-center w-screen container flex flex-row sm:w-screen sm:h-full md:w-screen md:h-screen lg:h-screen h-full justify-center flex-wrap p-16"
          >
            <div className="mt-10 container-detail items-center  flex flex-col md:flex-row flex-1 gap-10 ">
              <div style={{ width: "300px", height: "450px" }}>
                <img
                  alt="poster"
                  src={
                    `https://www.themoviedb.org/t/p/w600_and_h900_face/` +
                    allData.poster_path
                  }
                  className="h-auto rounded-lg shadow-lg"
                />
              </div>

              <div className="flex flex-col flex-1 gap-2 text-white">
                <div style={{ fontSize: "32px" }} className="text-white">
                  <span className="font-bold ">{allData.title}</span>
                  <span className="opacity-80">
                    {" "}
                    ({moment(allData.release_date).format("YYYY")})
                  </span>
                </div>
                <div>
                  <span>{moment(allData.release_date).format("ll")}</span>
                  <span>({allData.original_language}) - </span>
                  {genre.map((item, index) => {
                    return (
                      <>
                        {index === genre.length - 1 ? (
                          <>
                            <span>{item.name} </span>
                          </>
                        ) : (
                          <>
                            <span>{item.name}, </span>
                          </>
                        )}
                      </>
                    );
                  })}
                  <span>
                    {" "}
                    - {parseInt(allData.runtime / 60)}h {allData.runtime % 60}m
                  </span>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="h-16 w-16 ">
                    <CircularProgressbarWithChildren
                      value={allData.vote_average * 10}
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
                          style={{ fontSize: "18px" }}
                          className="font-bold"
                        >
                          {parseInt(allData.vote_average * 10)}
                        </span>{" "}
                        <span style={{ fontSize: "10px" }} className="-mt-0">
                          %
                        </span>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>

                  <span className="justify-center">
                    User
                    <br />
                    Score
                  </span>
                </div>

                <i className="text-gray-500 font-medium">{allData.tagline}</i>
                <div style={{ fontSize: "20px" }} className="font-bold">
                  Overview
                </div>

                <div>{allData.overview}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MovieDetail;
