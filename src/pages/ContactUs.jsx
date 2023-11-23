import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center mt-[150px] gap-5">
      <span className="text-center text-[19px]">
        {t("contact_us.contact1")}, <br /> {t("contact_us.contact2")}{" "}
        <a className="text-blue-600" href="mailto:emikot321@gmail.com">
          emikot321@gmail.com
        </a>
      </span>
    </div>
  );
};

export default ContactUs;
