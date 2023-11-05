import { useNavigate } from "react-router";
import "./manageuser.css";
import { db, dbstore } from "../firebase";
import { query, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocFromCache,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

export default function ManageUser() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/admin");
  };

  const [user, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const collec = collection(dbstore, "users");
    getDocs(collec).then((snapshot) => {
      let book = [];
      snapshot.docs.forEach((doc) => {
        book.push({ ...doc.data(), id: doc.id });
      });
      setUser(book);
      setFilteredUsers(book); // Set filtered users initially to all users
    });
  }, []);
  const handleSearch = (value) => {
    const searchString = value.target.value.toLowerCase();
    const searchResult = user.filter((e) =>
      e.email?.toString()?.toLowerCase().includes(searchString)
    );
    setFilteredUsers(searchResult);
  };
  const handleBlock = (id, block) => {
    const colletionRef = collection(dbstore, "users");
    console.log(block, id);
    const user = {
      block: !block,
    };
    try {
      const schoolRef = doc(colletionRef, id);
      updateDoc(schoolRef, user);
      getDocs(colletionRef).then((snapshot) => {
        let book = [];
        snapshot.docs.forEach((doc) => {
          book.push({ ...doc.data(), id: doc.id });
        });
        console.log(book);
        setUser(book);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNotify = (id, block) => {
    const colletionRef = collection(dbstore, "users");
    console.log(block, id);
    const user = {
      receive_notify: !block,
    };
    try {
      const schoolRef = doc(colletionRef, id);
      updateDoc(schoolRef, user);
      getDocs(colletionRef).then((snapshot) => {
        let book = [];
        snapshot.docs.forEach((doc) => {
          book.push({ ...doc.data(), id: doc.id });
        });
        console.log(book);
        setUser(book);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFunc = (school) => {
    const a = confirm("Bạn có muốn xóa không?");
    console.log(a);
    if (a === true) {
      const colletionRef = collection(dbstore, "users");
      try {
        const schoolRef = doc(colletionRef, school);
        deleteDoc(schoolRef, schoolRef);
        getDocs(colletionRef).then((snapshot) => {
          let book = [];
          snapshot.docs.forEach((doc) => {
            book.push({ ...doc.data(), id: doc.id });
          });
          console.log(book);
          setUser(book);
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <div className="header_admin" onClick={handleBack}>
        {"<"}
      </div>

      <div className="body_manage">
        <div className="search-bar">
          <div className="search-icon">
            <img src="search_icon.svg" alt="Search" />
          </div>
          <input
            type="text"
            placeholder="Search by email"
            onChange={handleSearch}
          />
        </div>
        {filteredUsers?.map((e) => (
          <div className="border-bottomm" key={e?.id}>
            <div className="body-left">
              <div>{e.email}</div>
              <div>Bị block: {e.block === false ? "không" : "có"}</div>
              <div>
                Nhận thông báo: {e.receive_notify === false ? "không" : "có"}
              </div>
            </div>
            <div className="body-right">
              <button className="btn-nhn" onClick={() => deleteFunc(e?.id)}>
                Xóa
              </button>
              <button
                className={e.block === false ? "btn-disable" : "btn-chan"}
                onClick={() => handleBlock(e?.id, e?.block)}
              >
                Chặn
              </button>
              <button
                className={
                  e.receive_notify === false ? "btn-disable" : "btn-chan"
                }
                onClick={() => handleNotify(e?.id, e?.receive_notify)}
              >
                Chặn thông báo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
