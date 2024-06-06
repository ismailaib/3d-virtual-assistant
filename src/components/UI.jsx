import { useRef, useState, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import ofpptLogo from '../assets/logo_ofppt.png';
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from 'react-icons/fa';
import { BsFillRecordCircleFill } from 'react-icons/bs';

export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const { chat, loading, message } = useChat();
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [recordedText, setRecordedText] = useState("");

  const sendMessage = () => {
    const text = input.current.value || recordedText;
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
      setRecordedText("");
    }
  };

  const onSpeechRecognition = (transcript) => {
    setRecordedText(transcript);
    input.current.value = transcript;
  };

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onSpeechRecognition(transcript);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of newline on Enter
      sendMessage();
    }
  };

  const microClicked = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-end p-4">
          <img src={ofpptLogo} alt="OFPPT Logo" width={90} />
        </div>
        <div className="chatbar" > 
            <div className=" bg-white">
              <h3 className=" text-red-600">Bonjour ! Je suis votre Assistant virtuel.</h3>
            </div>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
            placeholder="Entrer Un Message ..."
            ref={input}
            value={recordedText || input.current?.value || ""}
            onChange={(e) => setRecordedText(e.target.value)}
            onKeyDown={handleKeyDown} 
          />
          <button
            disabled={loading || message}
            onClick={sendMessage}
            className={`sendbtn btn border border-gray-200 rounded-lg hover:bg-gray-100 ${
              loading || message ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            <IoSend />
          </button>
          <button onClick={microClicked} className='btn border border-gray-200 rounded-lg hover:bg-gray-100'>
            {isRecording ? <BsFillRecordCircleFill className='recording' /> : <FaMicrophone />}
          </button>
        </div>
        
      </div>
    </>
  );
};