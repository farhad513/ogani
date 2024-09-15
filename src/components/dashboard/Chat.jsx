import React from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import io from "socket.io-client";
import {
  add_friend,
  messageClear,
  send_message,
  updateMessage,
} from "../../store/reducers/chatReducer";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRef } from "react";
import { base_url } from "../../utils/config";
const socket = io(base_url);
const Chat = () => {
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const [receverMsg, setRecevermsg] = useState("");
  const scrollRef = useRef();
  const [activeSeller, setActiveSeller] = useState([]);
  const { fd_messages, currentfd, my_friends, successMessage } = useSelector(
    (state) => state.chat
  );
  useEffect(() => {
    socket.emit("add_user", userInfo.id, userInfo);
  }, []);

  useEffect(() => {
    dispatch(
      add_friend({
        sellerId: sellerId || "",
        userId: userInfo.id,
      })
    );
  }, [sellerId]);
  const send = () => {
    if (text) {
      dispatch(
        send_message({
          userId: userInfo.id,
          text,
          sellerId,
          name: userInfo.name,
        })
      );
      setText("");
    }
  };
  useEffect(() => {
    socket.on("seller_message", (msg) => {
      setRecevermsg(msg);
    });
    socket.on("activeSellers", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);
  useEffect(() => {
    if (successMessage) {
      socket.emit("customer_send_message", fd_messages[fd_messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (receverMsg) {
      if (
        sellerId === receverMsg.senderId &&
        userInfo.id === receverMsg.receverId
      ) {
        dispatch(updateMessage(receverMsg));
      } else {
        toast.success(receverMsg.senderName + " " + "send a message");
        dispatch(messageClear());
      }
    }
  }, [receverMsg]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fd_messages]);
  const [show, setShow] = useState();
  return (
    <div className="bg-white rounded-md p-3">
      <div className="w-full flex relative">
        <div
          className={`w-[230px] bg-white transition-all md-lg:absolute md-lg:h-full md-lg:${
            show ? "left-0" : "-left-[350px]"
          }`}
        >
          <div className="flex justify-center items-center gap-3 text-slate-600 text-xl h-[50px]">
            <span>
              <AiOutlineMessage />
            </span>
            <span>Message</span>
          </div>
          <div className="flex flex-col gap-1 w-full text-slate-600 py-4 h-[400px] pr-3">
            {my_friends.map((f, i) => (
              <Link
                to={`/deshboard/chat/${f.fndId}`}
                key={i}
                className={`h-[50px] flex justify-start gap-2 items-center text-white p-2 rounded-sm cursor-pointer`}
              >
                <div className="relative">
                  <img
                    className="w-[40px] h-[40px] border-white border-2 max-w-[40px] p-[2px] rounded-full"
                    src="http://localhost:3001/images/admin.png"
                    alt=""
                  />
                  {activeSeller.some((a) => a.sellerId === f.fndId) && (
                    <div className="w-[8px] h-[8px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  )}
                </div>
                <div className="flex justify-center items-center flex-col w-full">
                  <div className=" flex justify-between items-center w-full">
                    <h2 className="text-base font-semibold text-slate-600">
                      {f.name}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-[calc(100%-230px)] md-lg:w-full">
          {currentfd ? (
            <div className="w-full h-full">
              <div className="flex justify-between gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center">
                    <img
                      className="w-[40px] h-[40px] border-white border-2 max-w-[40px] p-[2px] rounded-full"
                      src="http://localhost:3001/images/admin.png"
                      alt=""
                    />
                    {activeSeller.some(
                      (a) => a.sellerId === currentfd.fndId
                    ) && (
                      <div className="w-[8px] h-[8px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                    <h2 className="text-base font-semibold text-slate-600">
                      {currentfd.name}
                    </h2>
                  </div>
                </div>
                <div
                  onClick={() => setShow(!show)}
                  className="w-[35px] h-[35px] rounded-sm bg-sky-600 text-white  justify-center items-center hidden md-lg:flex"
                >
                  <FaList />
                </div>
              </div>
              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  {fd_messages.map((m, i) => {
                    if (currentfd?.fndId !== m.receverId) {
                      return (
                        <div
                          ref={scrollRef}
                          key={i}
                          className="w-full flex gap-2 justify-start items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px] border-white border-2 max-w-[30px] p-[2px] rounded-full"
                            src="http://localhost:3001/images/admin.png"
                            alt=""
                          />
                          <div className=" bg-green-500 rounded-md p-1 text-white ">
                            <span className="">{m.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRef}
                          key={i}
                          className="w-full  flex gap-2 justify-end items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px] border-white  border-2 max-w-[30px] p-[2px] rounded-full"
                            src="http://localhost:3001/images/admin.png"
                            alt=""
                          />
                          <div className=" bg-purple-500 rounded-md p-1 order-first text-white ">
                            <span className="">{m.message}</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex p-2 justify-between items-center w-full">
                <div className="w-[30px] h-[30px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer" htmlFor="">
                    <AiOutlinePlus />
                  </label>
                  <input type="file" className="hidden" />
                </div>
                <div className="border  h-[40px] p-0 ml-2 w-[calc(100%-100px)] rounded-full relative">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Plese Enter type"
                    className="w-full rounded-md h-full outline-none p-3"
                  />
                  <div className="text-2xl right-2 top-2 absolute cursor-pointer">
                    <GrEmoji />
                  </div>
                </div>
                <div className="w-[30px] p-2 justify-center items-center rounded-full">
                  <div onClick={send} className="text-2xl cursor-pointer">
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setShow(true)}
              className="w-full h-[400px] flex justify-center items-center font-bold text-lg"
            >
              <span>Select Seller</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
