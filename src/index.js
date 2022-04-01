import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { App } from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import {
  AuthProvider,
  LikesProvider,
  PlaylistProvider,
  VideosProvider,
  WatchLaterVideosProvider,
  HistoryProvider,
  CategoryProvider,
} from "./context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <VideosProvider>
          <LikesProvider>
            <PlaylistProvider>
              <WatchLaterVideosProvider>
                <HistoryProvider>
                  <CategoryProvider>
                    <App />
                  </CategoryProvider>
                </HistoryProvider>
              </WatchLaterVideosProvider>
            </PlaylistProvider>
          </LikesProvider>
        </VideosProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
