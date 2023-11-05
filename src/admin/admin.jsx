import { useNavigate } from "react-router";
import "./admin.css";
import { auth, db } from "../firebase";
import { child, push, ref, update, get, set } from "firebase/database";
import { useState } from "react";

export default function Admin() {
  const [inputv, setInputV] = useState();
  const navigate = useNavigate();

  const handleInput = (e) => {
    console.log(e.target.value);
    setInputV(e.target.value);
  };

  const updateData = (newValue) => {
    const myRef = ref(db, "message1");

    get(myRef).then((snapshot) => {
      const currentValue = snapshot.val();

      if (currentValue !== newValue) {
        set(myRef, newValue);
        console.log("no space");
      } else {
        set(myRef, newValue + " ");

        console.log("have space");
      }
    });

    // set(ref(db, 'message1'), {
    //  "Chiến thắng"
    // })
    // .then((res) => {
    //   console.log(res);
    //   // Data saved successfully!
    // })
    // .catch((error) => {
    //   // The write failed...
    // });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="header_admin">Admin 1</div>

      <div className="input-gen" style={{ marginTop: "100px" }}>
        <input
          className="input-admin"
          placeholder="Nhập nội dung"
          onChange={handleInput}
        />
        <button className="btn-nhn" onClick={() => updateData(inputv)}>
          Cập nhật
        </button>
      </div>
      <div className="body_admin-btn">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button className="btn-nhn" onClick={() => updateData("Bắt đầu")}>
            Bắt đầu
          </button>
          <button
            className="btn-nhn"
            onClick={() => updateData("Đang phân tích")}
          >
            Đang phân tích
          </button>
          <button className="btn-nhn" onClick={() => updateData("Chuẩn bị")}>
            Chuẩn bị
          </button>
          <button className="btn-nhn" onClick={() => updateData("Chiến thắng")}>
            Chiến thắng
          </button>
          <button className="btn-nhn" onClick={() => updateData("Kết thúc")}>
            Kết thúc
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#637B87",
            alignItems: "center",
            width: "400px",
            height: "150px",
            padding: "10px 0",
          }}
        >
          <span style={{ color: "white" }}>Baccarat</span>

          <div style={{ marginTop: "10px" }}>
            <button className="btn-nhan" onClick={() => updateData("Cái")}>
              Cái
            </button>
            <button
              style={{ marginLeft: "10px" }}
              className="btn-nhan"
              onClick={() => updateData("Con")}
            >
              Con
            </button>
            <button
              style={{ marginLeft: "10px" }}
              className="btn-nhan"
              onClick={() => updateData("Hòa")}
            >
              Hòa
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#637B87",
            alignItems: "center",
            width: "300px",
            height: "150px",
            padding: "10px 0",
          }}
        >
          <span style={{ color: "white" }}>Xóc Đĩa</span>
          <div style={{ marginTop: "10px" }}>
            <button className="btn-nhan" onClick={() => updateData("Chẵn")}>
              Chẵn
            </button>
            <button
              style={{ marginLeft: "10px" }}
              className="btn-nhan"
              onClick={() => updateData("Lẻ")}
            >
              Lẻ
            </button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <button className="btn-nhan" onClick={() => updateData("Tài")}>
              Tài{" "}
            </button>
            <button
              style={{ marginLeft: "10px" }}
              className="btn-nhan"
              onClick={() => updateData("Xỉu")}
            >
              Xỉu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
