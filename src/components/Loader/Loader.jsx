import { ClipLoader } from "react-spinners";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.backdrop}>
      <ClipLoader color="#36d7b7" size={60} />
    </div>
  );
};

export default Loader;
