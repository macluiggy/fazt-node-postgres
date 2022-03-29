// import app from "./app";
// // import config from "./config/config";
// // const { port } = config;
// let port = process.env.PORT || 3000;

// if (process.env.NODE_ENV !== 'dev') {
//   app.listen(port, (/*err*/) => {
//     // if (err) {
//     //   console.log(err);n
//     // }
//     console.log(`Listening on port ${port}`);
//   });
// }
 
// export const viteNodeApp = app;
// export default app;
// // babel-node --extensions \".ts\" index.ts
// // webpack --mode=development --config ./webpack.config.js && node ./dist/bundle.js
 
import app from "./app";

async function main() {
  let port = process.env.PORT || 3000;
  if (process.env.NODE_ENV !== 'dev') {
    await app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    })
  }
}

main().catch(err => console.log(err));

export const viteNodeApp = app;