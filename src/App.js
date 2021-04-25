import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Persik from "./panels/Persik";

const App = () => {
  const [activePanel, setActivePanel] = useState("home");

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme || "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
  }, []);

  return (
    <AdaptivityProvider>
      <AppRoot>
        <View activePanel={activePanel}>
          <Home id="home" />
        </View>
      </AppRoot>
    </AdaptivityProvider>
  );
};

export default App;
