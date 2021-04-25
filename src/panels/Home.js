import React, { useState } from "react";
import PropTypes from "prop-types";
import bridge from "@vkontakte/vk-bridge";

import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
} from "@vkontakte/vkui";

const Home = ({ id }) => {
  const [active_buttons, setActiveButtons] = useState(Array(8).fill(false));
  let interval;
  const ButtonClick = (e) => {
    if (!interval) {
      setActiveButtons((ld) => {
        let new_data = [...ld];
        new_data[Number(e.currentTarget.dataset.id) - 1] = true;
        return new_data;
      });
    }
  };
  const Start = () => {
    let i = 0;
    interval = setInterval(() => {
      if (i == 8) i = 0;
      if (active_buttons[i]) {
        if (!active_buttons[i - 1])
          bridge.send("VKWebAppFlashSetLevel", { level: 1 });
      } else bridge.send("VKWebAppFlashSetLevel", { level: 0 });
      i++;
    }, 1000);
  };
  const Stop = () => {
    clearInterval(interval);
    setActiveButtons(Array(8).fill(false));
    bridge.send("VKWebAppFlashSetLevel", { level: 0 });
  };
  return (
    <Panel id={id}>
      <PanelHeader>Flahs Ritm!</PanelHeader>
      <Group>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            onClick={ButtonClick}
            mode={active_buttons[0] ? "primary" : "destructive"}
            data-id={1}
          >
            1
          </Button>
          <Button
            onClick={ButtonClick}
            mode={active_buttons[1] ? "primary" : "destructive"}
            data-id={2}
          >
            2
          </Button>
          <Button
            onClick={ButtonClick}
            mode={active_buttons[2] ? "primary" : "destructive"}
            data-id={3}
          >
            3
          </Button>
          <Button
            onClick={ButtonClick}
            mode={active_buttons[3] ? "primary" : "destructive"}
            data-id={4}
          >
            4
          </Button>
          <Button
            onClick={ButtonClick}
            mode={active_buttons[4] ? "primary" : "destructive"}
            data-id={5}
          >
            5
          </Button>
          <Button
            onClick={ButtonClick}
            mode={active_buttons[5] ? "primary" : "destructive"}
            data-id={6}
          >
            6
          </Button>
          <Button
            onClick={ButtonClick}
            mode={active_buttons[6] ? "primary" : "destructive"}
            data-id={7}
          >
            7
          </Button>
          <Button
            onClick={ButtonClick}
            mode={active_buttons[7] ? "primary" : "destructive"}
            data-id={8}
          >
            8
          </Button>
        </div>
        <div
          style={{
            width: "100%",
            marginTop: "8%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button style={{ width: "45%" }} onClick={Start}>
            Start!
          </Button>
          <Button style={{ width: "45%" }} onClick={Stop}>
            Stop!
          </Button>
        </div>
      </Group>
    </Panel>
  );
};

Home.propTypes = { id: PropTypes.string.isRequired };

export default Home;
