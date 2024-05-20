import Service from "./Service";

const ServicesPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>Our Services</h1>
      <Service
        title="Tumor Detection AI Model"
        description="Our advanced machine learning model utilizes medical imaging data such as MRI and CT scans to accurately detect tumors in various parts of the body. With high precision and sensitivity, our AI model assists healthcare professionals in early diagnosis and treatment planning for tumor-related diseases."
      />
      <Service
        title="Automated Radiology Analysis"
        description="Our automated radiology analysis service employs cutting-edge machine learning algorithms to analyze radiological images for signs of tumors and abnormal growths. By leveraging AI-driven image processing techniques, we provide rapid and accurate assessments, aiding radiologists in interpreting complex medical images with efficiency and precision"
      />
      <Service
        title="Pathological Image Classification"
        description="Using deep learning techniques, our pathological image classification service categorizes histopathological images based on the presence or absence of tumors and cancerous cells. By analyzing tissue samples at a microscopic level, our AI model assists pathologists in diagnosing tumor-related diseases and guiding treatment decisions with confidence"
      />
    </div>
  );
};

export default ServicesPage;
