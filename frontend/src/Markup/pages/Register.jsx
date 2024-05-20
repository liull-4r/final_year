import RegistrationForm from "../components/RegisterForm/RegistrationForm";
import { Helmet } from "react-helmet-async";

function Register() {
  return (
    <>
      <Helmet>
        <title>Register | BlackRock Solutions PLC</title>
        <meta
          name="description"
          content="Register with BlackRock Solutions PLC to get access to our services."
        />
        <meta
          name="keywords"
          content="register, blackrock, solutions, plc, blackrock solutions plc"
        />
        <meta name="author" content="BlackRock Solutions PLC" />
        <link rel="canonical" href="register" />
      </Helmet>
      <RegistrationForm />
    </>
  );
}

export default Register;
