import React, { useEffect, useState } from "react";
import ClasicInput from "../Reusable/ClassicInput";
import ButtonOutline from "../Reusable/BtnOutline";
import filterArr from "../../utils/filterArr";
import { toast } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";

const ContactForm = () => {
  const user = useSelector((state) => state.user.user);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const textArea = document.getElementById("message");
    textArea.style.height = `${textArea.scrollHeight + 10}px`;
  }, []);

  const handleSendMessage = () => {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm))
      toast.error("Email isn't valid");
    else if (filterArr([name, subject, message]).length !== 3)
      toast.error("You maust fill in all fields to send message");
    else {
      const messagesColRef = collection(db, "/messages");
      if (user)
        addDoc(messagesColRef, { email, name, subject, message, user })
          .then(() => {
            toast.success("Successfully sent");
            setEmail("");
            setMessage("");
            setName("");
            setSubject("");
          })
          .catch(() => toast.error("Something went wrong, try again later"));
      else
        addDoc(messagesColRef, { email, name, subject, message })
          .then(() => {
            toast.success("Successfully sent");
            setEmail("");
            setMessage("");
            setName("");
            setSubject("");
          })
          .catch(() => toast.error("Something went wrong, try again later"));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
      className="sm:w-1/2 w-full sm:items-start items-center flex flex-col gap-5"
    >
      <ClasicInput
        label={"Your name"}
        value={name}
        name={"name"}
        onChange={setName}
      />
      <ClasicInput
        label={"Email address"}
        value={email}
        name={"email"}
        type="email"
        onChange={setEmail}
      />
      <ClasicInput
        label={"Subject"}
        value={subject}
        name={"name"}
        onChange={setSubject}
      />

      <label className={`flex w-full flex-col gap-5 max-w-sm`}>
        <h3 className="font-medium text-[20px] leading-normal">Message</h3>
        <textarea
          name="message"
          id="message"
          value={message}
          placeholder="Message"
          className="border h-fit min-h-[120px] p-2 border-black w-full rounded-lg"
          onChange={(e) => {
            e.target.style.height = `${e.target.scrollHeight + 2}px`;
            setMessage(e.target.value);
          }}
        ></textarea>
      </label>
      <ButtonOutline type="submit">Submit</ButtonOutline>
    </form>
  );
};

export default ContactForm;
