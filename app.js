import React,{useState} from 'react'
import Title from '../layouts/Title';
import axios from 'axios';

const Contact = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  //Email Validation
  const emailValidation = () => {
    return String(email)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (username === "") {
        setErrMsg("Please enter your name");
    } else if (phoneNumber === "") {
        setErrMsg("Please enter your phone number");
    } else if (email === "") {
        setErrMsg("Please enter your Email!");
    } else if (!emailValidation(email)) {
        setErrMsg("Please enter a valid Email");
    } else if (subject === "") {
        setErrMsg("Please give your Subject");
    } else if (message === "") {
        setErrMsg("Message is required!");
    } else {
        try {
            const response = await axios.post('https://test-server-6kaz.onrender.com/send', {
                subject,
                email,
                text: message
            });

            if (response.data.status === 'success') {
                setSuccessMsg(`Thank you dear ${username}, Your Messages has been sent Successfully!`);
                setErrMsg("");
                setUsername("");
                setPhoneNumber("");
                setEmail("");
                setSubject("");
                setMessage("");
            } else {
                throw new Error(`Failed to send message. Server responded with status 'fail'. Error: ${response.data.error}`);
            }
        } catch (error) {
          setErrMsg(error.message);
        }

    }
};

  const ContactLeft = () => {
    return (
      <div className="w-full lgl:w-[35%] h-full bg-gradient-to-r from-[#1e2024] to-[#23272b] p-4 lgl:p-8 rounded-lg shadow-shadowOne flex flex-col gap-5 justify-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-3xl font-bold text-white">Jiajie Wang</h3>
          <p className="text-lg font-normal text-gray-400">
            MERN Stack Developer
          </p>
          <p className="text-base text-gray-400 tracking-wide">
            I am a passionate MERN stack developer with expertise in building dynamic websites. 
          </p>
          <p className="text-base text-gray-400 flex items-center gap-2">
            Phone: <span className="text-lightText">437-925-8754</span>
          </p>
          <p className="text-base text-gray-400 flex items-center gap-2">
            Email: <span className="text-lightText">wangjia3@oregonstate.edu</span>
          </p>
          <p className="text-base text-gray-400 flex items-center gap-2">
            Github: <span className="text-lightText">https://github.com/jwang483</span>
          </p>
        </div>
      </div>
    );
  }



  return (
    <section
      id="contact"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold pb-4">Welcome to Jiajie Wang Contact Page</h1>
        <Title title="CONTACT" des="Lets Connect " />
      </div>
      <div className="w-full">
        <div className="w-full h-auto flex flex-col lgl:flex-row justify-between">
          <ContactLeft />
          <div className="w-full lgl:w-[60%] h-full py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] flex flex-col gap-8 p-4 lgl:p-8 rounded-lg shadow-shadowOne">
            <form className="w-full flex flex-col gap-4 lgl:gap-6 py-2 lgl:py-5">
              {errMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
                  {errMsg}
                </p>
              )}
              {successMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
                  {successMsg}
                </p>
              )}
              <div className="w-full flex flex-col lgl:flex-row gap-10">
                <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    Your name
                  </p>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className={`${
                      errMsg === "Username is required!" &&
                      "outline-designColor"
                    } contactInput`}
                    type="text"
                  />
                </div>
                <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    Phone Number
                  </p>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    className={`${
                      errMsg === "Phone number is required!" &&
                      "outline-designColor"
                    } contactInput`}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Email
                </p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={`${
                    errMsg === "Please give your Email!" &&
                    "outline-designColor"
                  } ${
                    errMsg === "Give a valid Email!" && "outline-designColor"
                  } contactInput`}
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Subject
                </p>
                <input
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                  className={`${
                    errMsg === "Please give your Subject!" &&
                    "outline-designColor"
                  } contactInput`}
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Your Message
                </p>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className={`${
                    errMsg === "Message is required!" &&
                    "outline-designColor"
                  } textareaInput`}
                  rows="10"
                  cols="50"
                >
                </textarea>
              </div>
              <button
                onClick={handleSend}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-4 text-white text-lg uppercase tracking-wide rounded-sm transition-all hover:shadow-shadowOne"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
