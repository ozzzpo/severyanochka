import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#006B77",
          borderRadius: 5,
          fontFamily: "Marmelad",
        },
        components: {
          Menu: {
            itemSelectedBg: "#7fb5bb4d",
            itemActiveBg: "#7fb5bb99",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
