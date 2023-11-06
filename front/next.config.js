const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "react-github-btn",
]);

const nextTranslate = require("next-translate-plugin");

module.exports = {
  ...withTM({
    reactStrictMode: true,
    // async redirects() {
    //   return [
    //     {
    //       source: "/",
    //       destination: "/dashboards/analytics",
    //       permanent: true,
    //     },
    //   ];
    // },
  }),
  ...nextTranslate(),
};
