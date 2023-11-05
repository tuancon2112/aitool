import { useEffect, useState } from "react";

import { onValue, query, ref, child, push, update } from "firebase/database";
import { auth, db, dbstore } from "../firebase";
import Drag from "react-draggable";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  where,
} from "firebase/firestore";

let first = false;

function App() {
  const [value, setValue] = useState("Chào mừng");
  const [status, setStatus] = useState("default");
  const [isVisible, setVisible] = useState(true);
  const [receive_notify, setReceive_notify] = useState();
  const [err, setErr] = useState(false);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(-1);
  const [isOverflow, setIsOverflow] = useState(false);

  const navigate = useNavigate();
  const updateData = () => {
    const newPostKey = push(child(ref(db), "message1")).key;
    console.log(newPostKey);
    const updates = {};

    updates["message1"] = "Xin chào";
    return update(ref(db), updates);
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
  useEffect(() => {
    updateData();

    const starCountRef = ref(db, "message1");
    console.log(starCountRef);
    const unsub = onValue(starCountRef, (snapshot) => {
      console.log(snapshot);
      const data = snapshot.val();
      const greetings = [
        "Chẵn",
        "Lẻ",
        "Tài",
        "Xỉu",
        "Giữ điểm",
        "Cái",
        "Con",
        "Hòa",
      ];
      let containsValue = false;

      for (const greeting of greetings) {
        if (data.includes(greeting)) {
          containsValue = true;
          break;
        }
      }
      if (!containsValue) {
        setVisible(true);
        setStatus("default");
      } else {
        setStatus("play");
        setTimeout(() => {
          setVisible(true);
        }, 500);
        setTimeout(() => {
          setStatus("default");
          setVisible(false);
        }, 5000);
      }
      if (first) {
        setValue(data);
      }
      first = true;
    });
    return () => {
      unsub();
    };
  }, []);
  useEffect(() => {
    const messageContent = document.querySelector(".message-content");

    if (messageContent) {
      setIsOverflow(messageContent.scrollWidth > messageContent.clientWidth);
    }
  }, [value]);
  useEffect(() => {
    let userSnapShotEvent = undefined;
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(dbstore, "users"),
          where("_id", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          userSnapShotEvent = onSnapshot(
            doc(dbstore, "users", querySnapshot.docs[0].id),
            async (doc) => {
              const data = doc.data();
              console.log(data);
              if (data.block) {
                await auth.signOut();
                return navigate("/login", {
                  replace: true,
                });
              }
              if (data.isDeleted) {
                await auth.signOut();
                return navigate("/login", {
                  replace: true,
                });
              }
              if (data.receive_notify) {
                setErr(false);
              } else {
                setStart(false);
              }

              setReceive_notify(data.receive_notify);
              setLoading(false);
              return;
            }
          );
        }
      } else {
        return navigate("/login", {
          replace: true,
        });
      }
    });
    return () => {
      unsubAuth();
      if (userSnapShotEvent) {
        userSnapShotEvent();
      }
    };
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
  };

  const handleBack = () => {
    navigate("/");
  };
  return loading ? (
    <div className="h-100 d-flex ">
      <img
        src="/loading.gif"
        width={100}
        height={100}
        className="m-auto"
        alt=""
      />
    </div>
  ) : (
    <>
      <div className="button-back" onClick={handleBack}>
        {"<"}
      </div>
      <div className="p-5 h-100 d-flex flex-column bg-4btn-page1">
        {!start && (
          <div
            style={{
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {err && (
                <div className="alert alert-danger mb-5 mt-2" role="alert">
                  Chức năng nhận thông báo của bạn đã bị chặn. Vui lòng liên hệ
                  admin để được mở.
                </div>
              )}
              <div className="option-select-wrap">
                <button
                  onClick={() => setSelected(1)}
                  className={`option_btn ${selected === 1 && "active"} `}
                >
                  TÀI XỈU
                </button>
                <button
                  onClick={() => setSelected(2)}
                  className={`option_btn ${selected === 2 && "active"} `}
                >
                  XÓC ĐĨA
                </button>
                <button
                  onClick={() => setSelected(3)}
                  className={`option_btn ${selected === 3 && "active"}`}
                >
                  SICBO
                </button>
                <button
                  onClick={() => setSelected(4)}
                  className={`option_btn ${selected === 4 && "active"} `}
                >
                  XỔ SỐ
                </button>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  disabled={selected == -1}
                  style={{
                    fontSize: 20,
                    width: "220px",
                    padding: "1rem",
                  }}
                  onClick={() => {
                    if (receive_notify) {
                      setStart(true);
                    } else {
                      setErr(true);
                    }
                  }}
                >
                  Khởi động ngay
                </button>
              </div>
            </div>
          </div>
        )}

        {start && (
          <div
            style={{
              flex: 1,
              display: "flex",
            }}
          >
            <button
              className="btn btn-secondary m-auto"
              style={{
                height: "fit-content",
              }}
              onClick={() => setStart(false)}
            >
              Đóng tool
            </button>
          </div>
        )}

        {start && (
          <Drag>
            <div
              className="d-flex handle "
              style={{
                width: "fit-content",
                position: "fixed",
              }}
            >
              <div className="wrapper">
                <div
                  style={{
                    zIndex: 5,
                    inset: 0,
                    position: "absolute",
                    cursor: "pointer",
                  }}
                ></div>
                <img
                  width={70}
                  src={
                    value === "Đang phân tích"
                      ? "robot_thinking.gif"
                      : status == "play"
                      ? "robot_lazer.gif"
                      : "robot_thinking.gif"
                  }
                  alt=""
                />
                {value === "Đang phân tích" ? (
                  <div className="loading">
                    <img src="/loading.gif" width={80} alt="" />
                  </div>
                ) : isVisible ? (
                  <div
                    className={`content cursor-pointer message-box `}
                    style={{ whiteSpace: "nowrap", marginTop: "20px" }}
                  >
                    <div
                      className={`message-content ${
                        isOverflow ? "marquee" : ""
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Drag>
        )}
      </div>
    </>
  );
}

export default App;
