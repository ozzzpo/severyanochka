import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import AntLink from "antd/es/typography/Link";
import { Link } from "react-router-dom";
import RegistrationCode from "../../components/modules/RegistrationModules/RegistrationCode";
import RegistrationPhone from "../../components/modules/RegistrationModules/RegistrationPhone";
import { useState } from "react";
import RegistrationPassword from "../../components/modules/RegistrationModules/RegistrationPassword";
import "./Registration.scss";
export default function Registration() {
  const [regState, setRegState] = useState<"phone" | "code" | "password">(
    "phone"
  );
  return (
    <>
      <Title>Регистрация</Title>
      {regState === "phone" && <RegistrationPhone onSub={setRegState} />}
      {regState === "code" && <RegistrationCode onSub={setRegState} />}
      {regState === "password" && <RegistrationPassword />}
      <Text>
        Есть аккаунт?{" "}
        <AntLink>
          <Link to="/login">Войти</Link>
        </AntLink>
      </Text>
    </>
  );
}
