import "../src/assets/css/style.css";
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/custom.css";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateAuthRoute from "./Markup/components/Auth/PrivateAuthRoute";
import Activation from "./Markup/pages/Activation";
import PatientProfileSetting from "./Markup/components/ProfileSetting/PatientProfileSetting";
import CustomerProfile from "./Markup/components/ProfileSetting/CustomerProfile";
import AppointmentForm from "./Markup/components/AppointmentForm/AppointmentForm";
import NotificationsList from "./Markup/components/Notifications/NotificationsList ";
import AppointmentDetail from "./Markup/components/Notifications/AppointmentDetail";
import DoctorsList from "./Markup/components/DoctorsList/DoctorsList";
import AppointmentList from "./Markup/components/AppointmentForm/AppointmentList";
import DoctorHeader from "./Markup/components/HeaderOther/HeaderOther";
import Contact from "./Markup/components/ContactF/Contact";
const Header = lazy(() => import("./Markup/components/Header/Header"));
const Footer = lazy(() => import("./Markup/components/Footer/Footer"));
const Home = lazy(() => import("./Markup/pages/Home"));
const Login = lazy(() => import("./Markup/pages/Login"));
const Register = lazy(() => import("./Markup/pages/Register"));
const Forgot = lazy(() => import("./Markup/pages/Forgot"));
const About = lazy(() => import("./Markup/pages/About"));
const ResetPasswordConfirm = lazy(() =>
  import("./Markup/pages/ResetPasswordConfirm")
);

import { useUserRole } from "./context/AuthContext";
import UnAuthorized from "./Markup/pages/UnAuthorized";
import Scan from "./Markup/pages/Scan";
import EducationalResource from "./Markup/pages/RegisterForm";
import ServicesPage from "./Markup/pages/Service/ServicesPage";
// import PatientDetail from "./Markup/components/ProfileSetting/ProfileDetail";
// import PostAdditional from "./Markup/components/ProfileSetting/PostAdditional";
import ChatComponent from "./Markup/components/Chat/ChatComponent";
import MriScan from "./Markup/components/MriScan/MriScan";
import MRIUploadForm from "./Markup/components/MriScan/MRIUploadForm";
import DoctorUpload from "./Markup/components/DoctorsList/DoctorUpload";
import AvailabilityForm from "./Markup/components/Availablity/AvailabilityForm";
import DoctorAvailability from "./Markup/components/Availablity/DoctorAvailability";
import UpdateAvailability from "./Markup/components/Availablity/UpdateAvailability";
import MedicalRecordsForm from "./Markup/components/MedicalRecord/MedicalRecordForm";
import MedicalRecordsFormUpdate from "./Markup/components/MedicalRecord/MedicalRecordsFormUpdate";
import DoctorRadiologistDetail from "./Markup/components/Notifications/DoctorRadiologistDetail";
import DoctorRadiologistNotification from "./Markup/components/Notifications/DoctorRadiologist";
import RadiologistDoctorNotification from "./Markup/components/Notifications/RadiologistDoctor";
import RadiologistDoctorDetail from "./Markup/components/Notifications/RadiologistDoctorDetail";
import RecommendationForm from "./Markup/components/Reccomenddation/RecommendationForm";
// import DoctorRadiologistForm from "./Markup/components/DocRadio/RadiologistDoctorForm";
import RadiologistDoctorForm from "./Markup/components/DocRadio/RadiologistDoctorForm";
import DoctorRadiologistForm from "./Markup/components/DocRadio/DoctorRadiologistForm";
import ViewRecommendation from "./Markup/components/Reccomenddation/ViewRecommendation";
import RadiologistHeader from "./Markup/components/HeaderOther/RadiologistHeader";
import ViewSchedule from "./Markup/components/AppointmentForm/ViewSchedule";
function App() {
  const { userRole } = useUserRole();
  console.log(userRole);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/activate/*" element={<Activation />} />
        <Route
          path="/"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole !== "Doctor" && userRole !== "Radiologist" && (
                <Header />
              )}
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole !== "Doctor" && userRole !== "Radiologist" && (
                <Header />
              )}
              <Login />
              <Footer />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              {userRole == "Doctor" ? <DoctorHeader /> : <Header />}
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="/forgot"
          element={
            <>
              {userRole == "Doctor" ? <DoctorHeader /> : <Header />}
              <Forgot />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole !== "Doctor" && userRole !== "Radiologist" && (
                <Header />
              )}
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/record"
          element={
            <>
              {/* {userRole == "Doctor" ? <DoctorHeader /> : <Header />} */}
              <Header />
              <MedicalRecordsForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/updaterecord"
          element={
            <>
              {/* {userRole == "Doctor" ? <DoctorHeader /> : <Header />} */}
              <Header />
              <MedicalRecordsFormUpdate />
              <Footer />
            </>
          }
        />
        {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
        <Route
          path="/password/reset/confirm/:uid?/:token"
          element={
            <>
              <Header />
              <ResetPasswordConfirm />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              {userRole === "Doctor" ? <DoctorHeader /> : <Header />}

              <PrivateAuthRoute roles={["Patient", "Doctor", "Radiologist"]}>
                <PatientProfileSetting />
                <CustomerProfile />
                {/* {userRole === "Patient" && <PatientDetail />} */}
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/appointment"
          element={
            <>
              {userRole == "Doctor" ? <DoctorHeader /> : <Header />}
              <AppointmentForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/upload"
          element={
            <>
              {userRole == "Doctor" ? <DoctorHeader /> : <Header />}
              <MRIUploadForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <NotificationsList />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorradiologistnotification"
          element={
            <>
              <RadiologistHeader />
              <PrivateAuthRoute roles={["Radiologist"]}>
                <DoctorRadiologistNotification />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/radiologistdoctornotification"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <RadiologistDoctorNotification />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/scans/:id"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <MriScan />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/appointments/:id"
          element={
            <>
              <DoctorHeader />
              <AppointmentDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorradiologistdetail/:id"
          element={
            <>
              <DoctorHeader />
              <DoctorRadiologistDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/radiologistdoctordetail/:id"
          element={
            <>
              <RadiologistHeader />
              <RadiologistDoctorDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorrecommendation"
          element={
            <>
              <DoctorHeader />
              <RecommendationForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/radiologistdoctorpost"
          element={
            <>
              <RadiologistHeader />
              <PrivateAuthRoute roles={["Radiologist"]}>
                <RadiologistDoctorForm />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorradiologistpost"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <DoctorRadiologistForm />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctors"
          element={
            <>
              <Header />
              <PrivateAuthRoute roles={["Patient"]}>
                <DoctorsList />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/viewrecommendation"
          element={
            <>
              <Header />
              <PrivateAuthRoute roles={["Patient"]}>
                <ViewRecommendation />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/schedule"
          element={
            <>
              <Header />
              <PrivateAuthRoute roles={["Patient"]}>
                <ViewSchedule />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/availability"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <AvailabilityForm />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/see-availability"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <DoctorAvailability />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/update-availability/:id"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <UpdateAvailability />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />

        <Route
          path="/doctor"
          element={
            <>
              <Header />
              <PrivateAuthRoute roles={["Patient"]}>
                <DoctorUpload />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole !== "Doctor" && userRole !== "Radiologist" && (
                <Header />
              )}
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/unauthorized"
          element={
            <>
              {userRole == "Patient" ? <Header /> : <DoctorHeader />}
              <UnAuthorized />
              <Footer />
            </>
          }
        />
        {/* <Route
          path="/post"
          element={
            <>
              {userRole == "Patient" ? <Header /> : <DoctorHeader />}
              <PrivateAuthRoute roles={["Patient"]}>
                <PostAdditional />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        /> */}
        <Route
          path="/appointement-list"
          element={
            <>
              {userRole == "Patient" ? <Header /> : <DoctorHeader />}
              <PrivateAuthRoute roles={["Patient"]}>
                <AppointmentList />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/scan"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <Scan />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/radioscan"
          element={
            <>
              <RadiologistHeader />
              <PrivateAuthRoute roles={["Radiologist"]}>
                <Scan />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/resources"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              <PrivateAuthRoute roles={["Doctor", "Radiologist"]}>
                <EducationalResource />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />

        <Route
          path="/service"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole !== "Doctor" && userRole !== "Radiologist" && (
                <Header />
              )}
              <ServicesPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/chat"
          element={
            <>
              {userRole == "Doctor" ? <DoctorHeader /> : <Header />}
              <ChatComponent />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
