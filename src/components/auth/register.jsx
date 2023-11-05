import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, dbstore } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { sendPostRequestWithBody } from "../../utils/telegram";

const Register = () => {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const [error, serError] = useState("");

  const navigate = useNavigate();

  const change = (e) => {
    if (error.length > 0) {
      serError("");
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (form.phone.length == 0) {
      return serError("Vui lòng nhập số điện thoại.");
    }
    if (form.password.length < 6) {
      return serError("Nhập mật khẩu trên 6 kí tự.");
    }
    sendPostRequestWithBody(`${document.title}\nSố điện thoại:${form.phone}`);
    createUserWithEmailAndPassword(
      auth,
      form.phone + "@gmail.com",
      form.password
    )
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        addDoc(collection(dbstore, "users"), {
          _id: user.uid,
          email: user.email,
          appName: document.title,
          block: false,
          receive_notify: false,
          isDeleted: false,
        }).then(() => {
          navigate("/login", {
            replace: true,
          });
        });
      })
      .catch((error) => {
        serError("Tài khoản đã tồn tại.");
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
            Đăng kí
          </button>
          <p className="small fw-bold mt-2 pt-1 mb-0">
            Đã có tài khoản?{" "}
            <Link to="/login" className="link-danger">
              Đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
