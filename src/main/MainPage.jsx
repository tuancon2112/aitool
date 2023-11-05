import { useNavigate } from "react-router";
import IMG from "../image/b1.jpg";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, dbstore } from "../firebase";
import { query } from "firebase/database";
import { collection, getDocs, where } from "firebase/firestore";

export default function MainPage() {
  const [isAdmin, setAdmin] = useState(false);
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };
  const handleManage = () => {
    navigate("/manage-user");
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
          setAdmin(data.isAdmin);
          if (data.block) {
            return serError("Tài khoản của bạn đã bị khoá.");
          }
          if (data.isDeleted) {
            return serError("Tài khoản của bạn đã bị xoá vĩnh viễn.");
          }
        }
      } else {
        navigate("/login");
      }
    });
    return () => {
      unsub();
    };
  }, []);
  const navigate = useNavigate();
  const handleMain2 = () => {
    navigate(isAdmin ? "/admin" : "/app1");
  };
  const handleMain1 = () => {
    navigate(isAdmin ? "/admin2" : "/app2");
  };
  return (
    <div
      className="bg-main"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="body_admin">
        <button
          className="btn-dx"
          style={{ position: "fixed", top: "10px", right: "10px" }}
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
        <button
          className="gamebtn"
          style={{
            marginTop:"120px",
            marginBottom: "60px",
            height: "60px",
            borderRadius: "25px",
            padding: "0 10px",

            width: "100vw",
          }}
          onClick={handleMain1}
        >
          TOOL KU-THABET
        </button>

        <button
          className="gamebtn"
          style={{
            height: "60px",
            borderRadius: "25px",
            width: "100vw",
            padding: "0 10px",
            marginInline: "20px",
            marginBottom: "20px",
          }}
          onClick={handleMain2}
        >
          TOOL SẢNH THẾ GIỚI
        </button>
      {isAdmin ? (
        <button
          style={{ minWidth: "700px" }}
          className="btn-ql"
          onClick={handleManage}
        >
          Quản lí người dùng
        </button>
      ) : null}
    </div>
  );
}
