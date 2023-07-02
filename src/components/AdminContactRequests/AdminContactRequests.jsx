import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { toast } from "react-hot-toast";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import { doc, updateDoc } from "firebase/firestore";
import MessageCard from "../MessageCard/MessageCard";
import { useSearchParams } from "react-router-dom";
import mergeSearchParams from "../../helpers/mergeSearchParams";

const AdminContactRequests = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const answered = searchParams.get("answered")

      const messagesCollRef = collection(db, "/messages");
      const messagesRef = answered === null ? messagesCollRef : query(messagesCollRef, where("answered", "==", answered === "true"))

      getDocs(messagesRef)
        .then((result) => {
          setLoading(false);
          setMessages(
            result.docs.map((message) => {
              return { ...message.data(), messageId: message.id };
            })
          );
        })
        .catch(() => {
          toast.error("Something went wrong");
          setError(true);
          setLoading(false);
        });
      
    }, 500);

      return () => clearTimeout(debounceTimer)
  }, [searchParams]);

  const handleMessageStatus = (messageId, answered) => {
    const messageRef = doc(db, `/messages/${messageId}`);
    const idx = messages.findIndex(
      (message) => message.messageId === messageId
    );
    updateDoc(messageRef, { answered: answered === "true" })
      .then(() => {
        const updatedMessages = [...messages];
        updatedMessages[idx] = {
          ...messages[idx],
          answered: answered === "true",
        };
        setMessages(updatedMessages);
        toast.success("Successfully updated");
      })
      .catch(() => toast.error("Something went wrong"));
  };

  if (error) return <ErrorIndicator />;
  else if (loading) return <LoadingIndicator />;
  else
    return (
      <>
        <h1 className="text-3xl mb-5 font-semibold leading-normal text-center">
          Messages
        </h1>
        <div className="flex gap-7 flex-wrap  mb-5">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-base">Status:</h1>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={searchParams.get("answered") || "any"}
            onChange={(e) =>
              setSearchParams(
                mergeSearchParams(searchParams, { answered: e.target.value === "any" ? undefined : e.target.value })
              )
            }
          >
            <option value="any">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

        <div>
          {messages.map((contactReq) => (
            <MessageCard
              contactReq={contactReq}
              handleMessageStatus={handleMessageStatus}
              key={contactReq.messageId}
            />
          ))}
        </div>
      </>
    );
};

export default AdminContactRequests;
