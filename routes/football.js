const express = require("express");
const footballRouter = express.Router();
const request = require("request");
const axios = require("axios");

footballRouter.get("", (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://v3.football.api-sports.io/standings",
      qs: { league: "39", season: "2021" },
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "50c9612b9c270aaa2c94e3ccb8a2f868",
      },
    };

    return request(options, function (error, response, body) {
      if (error) throw new Error(error);
      // console.log(body);
      const info = JSON.parse(body);
      const data = info.response[0].league;
      res.render("football/table", { data });
    });
  } catch (err) {
    console.error("Error", err.message);
    res.render("football/table");
  }
});

footballRouter.get("/fixtures", (req, res) => {
  try {
    const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const tomorrow = year + "-" + month + "-" + day;

    const options = {
      method: "GET",
      url: "https://v3.football.api-sports.io/fixtures",
      // qs: { date: tomorrow, league: 39 },
      qs: { date: tomorrow },
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "50c9612b9c270aaa2c94e3ccb8a2f868",
      },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      const info = JSON.parse(body);
      const data = info.response;
      console.log(data);
      res.render("football/fixtures", { data });
    });
  } catch (err) {
    console.error("Error", err.message);
    res.render("football/fixtures");
  }
});

module.exports = footballRouter;
