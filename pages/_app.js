import '../styles/globals.css'
import {MoralisProvider} from "react-moralis";

function MyApp({ Component, pageProps }) {
  return(
      <MoralisProvider appId="6Bf22ClB28UjxKbUBikUQUisF3lKeZ2qUbqaX1G2"
                       serverUrl="https://trzxfm2tuigr.usemoralis.com:2053/server">
          {<Component {...pageProps} />}
      </MoralisProvider>
      );
}

export default MyApp
