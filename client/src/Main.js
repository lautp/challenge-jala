import React from "react";
import { Switch } from "react-router-dom";
import AppLayout, { RouteWithSubRoutes } from "./components";
import { ContactsOutlined } from "@ant-design/icons";
import { routes } from "./routes";

function Main({ history }) {
  return (
    <AppLayout
      history={history}
      defaultSelected="contacts"
      appOptions={[
        {
          icon: <ContactsOutlined />,
          label: "Contacts",
          path: "contacts",
        },
      ]}
      appTheme="dark"
      breadcrumbs={[]}
    >
      <Switch>
        {routes.map((route) => (
          <RouteWithSubRoutes key={route.path.replace("/", "-")} {...route} />
        ))}
      </Switch>
    </AppLayout>
  );
}

export default Main;
