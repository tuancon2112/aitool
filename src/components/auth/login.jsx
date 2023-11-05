import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

// eslint-disable-next-line react/prop-types
const Login = ({ error }) => {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, form.phone + "@gmail.com", form.password)
      // eslint-disable-next-line no-unused-vars
      .then((_userCredential) => {
        console.log(_userCredential)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-100">
      <form>
        {error?.length > 0 && (
          <p className="text-center text-danger bold">{error}</p>
        )}
        {/* Email input */}
        <div className="form-outline mb-4">
          <input
            name="phone"
            onChange={change}
            type="number"
            id="form3Example3"
            className="form-control form-control-lg"
            placeholder="Nhập số điện thoại"
          />
        </div>
        {/* Password input */}
        <div className="form-outline mb-3">
          <input
            type="password"
            name="password"
            onChange={change}
            id="form3Example4"
            className="form-control form-control-lg"
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div className="text-center text-lg-start mt-4 pt-2 d-flex flex-column align-items-center  ">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary btn-lg mt-2"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          >
            Đăng nhập
          </button>
          <p className="small fw-bold mt-2 pt-1 mb-0">
            Đã có tài khoản?{" "}
            <Link to="/register" className="link-danger">
              Đăng kí
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
