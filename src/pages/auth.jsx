import { useLocation, useNavigate } from "react-router";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, dbstore } from "../firebase";
import { query } from "firebase/database";
import { collection, getDocs, where } from "firebase/firestore";

const Auth = () => {
  const path = useLocation();
  const [error, serError] = useState("");

  const navigate = useNavigate();
  const handleTelegramButtonClick = () => {
    window.open("https://t.me/");
  };

  const handleZaloButtonClick = () => {
    // window.open("")
  };
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(dbstore, "users"),
          where("_id", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          const data = querySnapshot.docs[0].data();
          console.log(data);

          if (data.block) {
            return serError("Tài khoản của bạn đã bị khoá.");
          }
          if (data.isDeleted) {
            return serError("Tài khoản của bạn đã bị xoá vĩnh viễn.");
          }
          navigate("/", {
            replace: true,
          });
          return;
        }
      }
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <section className="">
        <div
          className="container-fluid h-custom d-flex "
          style={{
            minHeight: "100vh",
          }}
        >
          <div
            className="  d-flex flex-column align-items-center m-auto"
            style={{
              width: "100%",
              maxWidth: "450px",
            }}
          >
            <div className="mb-5 d-flex flex-column align-items-center">
              <img
                src="/robot.png"
                width={100}
                className="mb-3"
                alt="Sample image"
              />
              <h2
                className="text-primary"
                style={{
                  fontWeight: "bold",
                }}
              >
                TOOL AI 6.0
              </h2>
            </div>
            {path.pathname == "/login" && <Login error={error} />}
            {path.pathname == "/register" && <Register />}

            <div
              className="mt-5 mb-4"
              style={{
                fontWeight: "600",
                fontSize: 20,
              }}
            >
              <p className="m-0 mb-2 text-secondary text-center">HỖ TRỢ 24/7</p>
              <p className="m-0 mb-2 text-secondary text-center"></p>
              <p className="m-0 mb-2 text-secondary text-center"></p>
            </div>

            <div>
              <div>
                <img
                  src="./telegram.png"
                  style={{ width: "50px", cursor: "pointer" }}
                  onClick={handleTelegramButtonClick}
                />
                <img
                  src="./zalo.svg"
                  style={{
                    width: "50px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  onClick={handleZaloButtonClick}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
