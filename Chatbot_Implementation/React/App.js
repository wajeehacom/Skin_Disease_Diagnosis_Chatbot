// import React, { useState } from 'react';

// function App() {
//   const [message, setMessage] = useState('');
//   const [image, setImage] = useState(null);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [result, setResult] = useState('');        // Text chat prediction result
//   const [imageResult, setImageResult] = useState(''); // Image prediction result

//   const prompts = [
//     'Red rash on arms',
//     'Itching and dryness',
//     'Skin inflammation',
//     'Blisters and bumps',
//     'Swelling and redness',
//   ];

//   // Text chat response handler
//   const handleChatResponse = (response) => {
//     if (!response.confidence || response.confidence < 40) {
//       // setResult("We couldn't confidently predict a disease based on your symptoms.");
//     } else {
//       // setResult(`${response.response}`);

//     }
//   };

//   // Image prediction response handler
//   const handleImagePrediction = (response) => {
//     if (!response.confidence || response.confidence < 40) {
//       setImageResult("We couldn't confidently diagnose the skin condition from the image.");
//     } else {
//       // setImageResult(response.prediction + ` (Confidence: ${response.confidence.toFixed(2)}%)`);
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://127.0.0.1:5001/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message, history: chatHistory }),
//       });

//       const data = await res.json();

//       if (data.response) {
//         handleChatResponse(data);

//         setChatHistory((prevHistory) => [
//           ...prevHistory,
//           { type: 'text', user: message, bot: data.response },
//         ]);
//       } else if (data.error) {
//         setChatHistory((prevHistory) => [
//           ...prevHistory,
//           { type: 'text', user: 'Error', bot: data.error },
//         ]);
//       }
//     } catch (error) {
//       setChatHistory((prevHistory) => [
//         ...prevHistory,
//         { type: 'text', user: 'Error', bot: 'Error connecting to the API.' },
//       ]);
//     }

//     setMessage('');
//   };

//   const handleImageUpload = async (e) => {
//     e.preventDefault();

//     if (!image) return alert('Please upload an image.');

//     const formData = new FormData();
//     formData.append('file', image);

//     const localUrl = URL.createObjectURL(image);

//     try {
//       const res = await fetch('http://127.0.0.1:5001/predict_image', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.prediction) {
//         handleImagePrediction(data);

//         setChatHistory((prevHistory) => [
//           ...prevHistory,
//           { type: 'image', imageUrl: localUrl, bot: data.prediction },
//         ]);
//       }
//     } catch (error) {
//       setChatHistory((prevHistory) => [
//         ...prevHistory,
//         { type: 'text', user: 'Error', bot: 'Error connecting to the API.' },
//       ]);
//     }

//     setImage(null);
//   };

//   const handlePromptClick = (prompt) => {
//     setMessage(prompt);
//   };

//   const handleBackClick = () => {
//     window.history.back();
//   };

//   return (
//     <>
//       <style>{`
//         body {
//           margin: 0; 
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background-color: #f9fafb;
//           color: #1f2937;
//         }
//         .app-container {
//           display: flex;
//           height: 100vh;
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px;
//           box-sizing: border-box;
//           gap: 20px;
//         }
//         .sidebar {
//           width: 250px;
//           background: white;
//           border-radius: 10px;
//           box-shadow: 0 2px 10px rgb(0 0 0 / 0.1);
//           padding: 20px;
//           display: flex;
//           flex-direction: column;
//           gap: 15px;
//         }
//         .sidebar h2 {
//           margin-bottom: 10px;
//           font-size: 1.25rem;
//           font-weight: 600;
//           border-bottom: 1px solid #e5e7eb;
//           padding-bottom: 10px;
//         }
//         .prompt-btn {
//           padding: 10px 15px;
//           background-color: rgb(58, 49, 49);
//           border: none;
//           border-radius: 6px;
//           color: white;
//           cursor: pointer;
//           font-size: 0.9rem;
//           transition: background-color 0.3s ease;
//           text-align: left;
//         }
//         .prompt-btn:hover {
//           background-color: #000000;
//         }
//         .chat-container {
//           flex: 1;
//           background: white;
//           border-radius: 10px;
//           box-shadow: 0 2px 20px rgb(0 0 0 / 0.1);
//           display: flex;
//           flex-direction: column;
//           padding: 25px;
//           overflow-y: auto;
//           max-height: 90vh;
//           position: relative;
//         }
//         h1 {
//           text-align: center;
//           margin-bottom: 25px;
//           font-weight: 700;
//           font-size: 2rem;
//           color: #111827;
//         }
//         .chat-history {
//           flex: 1;
//           overflow-y: auto;
//           padding-right: 10px;
//           margin-bottom: 20px;
//         }
//         .cursive-text {
//           font-family: "'Satisfy', cursive";
//           font-style: normal;
//         }
//         .chat-message {
//           margin-bottom: 20px;
//           padding-bottom: 10px;
//           border-bottom: 1px solid #e5e7eb;
//         }
//         .chat-message p {
//           margin: 5px 0;
//           line-height: 1.4;
//         }
//         .chat-message strong {
//           color: #000000;
//         }
//         .uploaded-image {
//           max-width: 200px;
//           border-radius: 10px;
//           margin-bottom: 10px;
//           border: 1px solid #d1d5db;
//         }
//         form {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 15px;
//         }
//         input[type="text"] {
//           flex: 1;
//           padding: 12px 15px;
//           border: 1px solid #d1d5db;
//           border-radius: 8px;
//           font-size: 1rem;
//           transition: border-color 0.3s ease;
//         }
//         input[type="text"]:focus {
//           outline: none;
//           border-color: #000000;
//           box-shadow: 0 0 5px #000000;
//         }
//         input[type="file"] {
//           flex: 1;
//         }
//         button {
//           padding: 12px 20px;
//           background-color: #000000;
//           border: none;
//           border-radius: 8px;
//           color: white;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background-color 0.3s ease;
//           font-size: 1rem;
//         }
//         button:hover {
//           background-color: #000000;
//         }
//         .back-arrow {
//           position: absolute;
//           top: 20px;
//           left: 25px;
//           font-size: 1.8rem;
//           cursor: pointer;
//           user-select: none;
//           color: #000000;
//           transition: color 0.3s ease;
//         }
//         .back-arrow:hover {
//           color: #555555;
//         }
//         .result-message {
//           font-style: italic;
//           color: #4b5563;
//           margin-bottom: 10px;
//           text-align: center;
//         }
//       `}</style>

//       <div className="app-container">
//         <aside className="sidebar">
//           <h2>Quick Prompts</h2>
//           {prompts.map((prompt, i) => (
//             <button
//               key={i}
//               className="prompt-btn"
//               onClick={() => handlePromptClick(prompt)}
//               type="button"
//             >
//               {prompt}
//             </button>
//           ))}
//         </aside>

//         <main className="chat-container">
//           <span
//             className="back-arrow"
//             onClick={handleBackClick}
//             title="Go back"
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' || e.key === ' ') handleBackClick();
//             }}
//           >
//             ←
//           </span>

//           <h1>
//             DermaAI: <span className="cursive-text">Your Skin Health Companion</span>
//           </h1>

//           {result && <div className="result-message">{result}</div>}
//           {imageResult && <div className="result-message">{imageResult}</div>}

//           <div className="chat-history">
//             {chatHistory.map((item, index) => (
//               <div key={index} className="chat-message">
//                 {item.type === 'text' && (
//                   <>
//                     <p><strong>User:</strong> {item.user}</p>
//                     <p><strong>DermaAI:</strong> {item.bot}</p>
//                   </>
//                 )}
//                 {item.type === 'image' && (
//                   <>
//                     <p><strong>User uploaded image:</strong></p>
//                     <img src={item.imageUrl} alt="Uploaded skin condition" className="uploaded-image" />
//                     <p><strong>DermaAI:</strong> {item.bot}</p>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>

//           <form onSubmit={handleSendMessage}>
//             <input
//               type="text"
//               placeholder="Describe your symptoms..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               required
//             />
//             <button type="submit">Send</button>
//           </form>

//           <form onSubmit={handleImageUpload}>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//             <button type="submit">Upload Image</button>
//           </form>
//         </main>
//       </div>
//     </>
//   );
// }

// export default App;

import React, { useState, useRef, useEffect } from 'react';

function DermaAI() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const prompts = [
    'Red rash on arms',
    'Itching and dryness',
    'Skin inflammation',
    'Blisters and bumps',
    'Swelling and redness',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory(prev => [...prev, { type: 'user', text: message }]);

    try {
      const res = await fetch('http://127.0.0.1:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: chatHistory }),
      });

      const data = await res.json();

      if (data.error) {
        setChatHistory(prev => [...prev, { type: 'bot', text: `Error: ${data.error}` }]);
      } else {
        setChatHistory(prev => [
          ...prev,
          {
            type: 'bot',
            text: data.response || '',
            careTips: data.care_tips || '',
            confidence: data.confidence || null,
            description: data.description || ''
          }
        ]);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { type: 'bot', text: 'Error contacting server.' }]);
      console.error(err);
    }

    setMessage('');
  };

  const sendImage = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please upload an image.');

    const formData = new FormData();
    formData.append('file', image);

    const localUrl = URL.createObjectURL(image);
    setChatHistory(prev => [...prev, { type: 'user-image', imageUrl: localUrl }]);

    try {
      const res = await fetch('http://127.0.0.1:5001/predict_image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setChatHistory(prev => [...prev, { type: 'bot', text: `Error: ${data.error}` }]);
      } else {
        setChatHistory(prev => [
          ...prev,
          {
            type: 'bot',
            text: data.prediction || '',
            confidence: data.confidence || null,
            careTips: data.care_tips || '',
            description: data.description || ''
          }
        ]);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { type: 'bot', text: 'Error contacting server.' }]);
      console.error(err);
    }

    setImage(null);
  };

  const handlePromptClick = (prompt) => setMessage(prompt);

  const handleBackClick = () => window.history.back();

  return (
    <>
      <style>{`
        body {
          margin: 0; 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9fafb;
          color: #1f2937;
        }
        .app-container {
          display: flex;
          height: 100vh;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          box-sizing: border-box;
          gap: 20px;
        }
        .sidebar {
          width: 250px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgb(0 0 0 / 0.1);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .sidebar h2 {
          margin-bottom: 10px;
          font-size: 1.25rem;
          font-weight: 600;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 10px;
        }
        .prompt-btn {
          padding: 10px 15px;
          background-color: rgb(58, 49, 49);
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.3s ease;
          text-align: left;
        }
        .prompt-btn:hover {
          background-color: #000000;
        }
        .chat-container {
          flex: 1;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 20px rgb(0 0 0 / 0.1);
          display: flex;
          flex-direction: column;
          padding: 25px;
          overflow-y: auto;
          max-height: 90vh;
          position: relative;
        }
        h1 {
          text-align: center;
          margin-bottom: 25px;
          font-weight: 700;
          font-size: 2rem;
          color: #111827;
        }
        .back-arrow {
          position: absolute;
          top: 20px;
          left: 25px;
          font-size: 1.8rem;
          cursor: pointer;
          user-select: none;
          color: #000000;
          transition: color 0.3s ease;
        }
        .back-arrow:hover {
          color: #555555;
        }
        .chat-history {
          flex: 1;
          overflow-y: auto;
          padding-right: 10px;
          margin-bottom: 20px;
        }
        .chat-message {
          margin-bottom: 15px;
          padding: 12px 20px;
          border-radius: 15px;
          max-width: 75%;
          word-wrap: break-word;
          line-height: 1.4;
          font-size: 0.95rem;
        }
        .chat-message.user {
          background-color:rgb(67, 71, 75);
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 0;
        }
        .chat-message.bot {
          background-color: #e5e7eb;
          color: #111827;
          margin-right: auto;
          border-bottom-left-radius: 0;
        }
        .chat-message.user-image {
          margin-left: auto;
          max-width: 200px;
          border-radius: 10px;
          border: 2px solid #0084ff;
        }
        .bot-extra {
          font-size: 0.85rem;
          margin-top: 6px;
          color: #555;
          background-color: #f3f4f6;
          padding: 8px 12px;
          border-radius: 10px;
          white-space: pre-line;
        }
        form {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }
        input[type="text"] {
          flex: 1;
          padding: 12px 15px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        input[type="text"]:focus {
          outline: none;
          border-color: #000000;
          box-shadow: 0 0 5px #000000;
        }
        input[type="file"] {
          flex: 1;
          border-radius: 8px;
        }
        button {
          padding: 12px 20px;
          background-color: #000000;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 1rem;
        }
        button:hover {
          background-color: #222222;
        }
      `}</style>

      <div className="app-container">
        <aside className="sidebar">
          <h2>Quick Prompts</h2>
          {prompts.map((prompt, i) => (
            <button
              key={i}
              className="prompt-btn"
              onClick={() => handlePromptClick(prompt)}
              type="button"
            >
              {prompt}
            </button>
          ))}
        </aside>

        <main className="chat-container">
          <span
            className="back-arrow"
            onClick={handleBackClick}
            title="Go back"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleBackClick();
            }}
          >
            ←
          </span>

          <h1>Chat with Derma AI </h1>

          <div className="chat-history" aria-live="polite" aria-atomic="false">
            {chatHistory.map((msg, idx) => {
              if (msg.type === 'user') {
                return (
                  <div key={idx} className="chat-message user" aria-label="User message">
                    {msg.text}
                  </div>
                );
              } else if (msg.type === 'user-image') {
                return (
                  <img
                    key={idx}
                    src={msg.imageUrl}
                    alt="Uploaded by user"
                    className="chat-message user-image"
                  />
                );
              } else if (msg.type === 'bot') {
                return (
                  <div key={idx} className="chat-message bot" aria-label="AI response">
                    <div>{msg.text}</div>
                    {(msg.careTips || msg.confidence !== null || msg.description) && (
                      <div className="bot-extra">
                        {msg.description && <div><strong>Description:</strong> {msg.description}</div>}
                        {msg.careTips && <div><strong>Care Tips:</strong> {msg.careTips}</div>}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={sendMessage} aria-label="Send text message">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Message input"
            />
            <button type="submit">Send</button>
          </form>

          <form onSubmit={sendImage} aria-label="Upload and send image">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              aria-label="Upload image"
            />
            <button type="submit">Upload</button>
          </form>
        </main>
      </div>
    </>
  );
}

export default DermaAI;
