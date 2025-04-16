import s from "./NotFoundPage.module.css";
import { FaRegFaceSadTear } from "react-icons/fa6";

const NotFoundPage = () => {
  return (
    <>
      <h1 className={s.header}>
        Page not found. Please change your search query or try again later
        <FaRegFaceSadTear />
      </h1>
    </>
  );
};

export default NotFoundPage;
