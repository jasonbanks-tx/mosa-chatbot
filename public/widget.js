(function () {
  const API_URL = "https://mosa-chatbot.vercel.app/api/chat";

  // Styles
  const style = document.createElement("style");
  style.textContent = `
    @keyframes mosa-pulse {
      0% { box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0 0 rgba(26,58,92,0.35); }
      70% { box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0 12px rgba(26,58,92,0); }
      100% { box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0 0 rgba(26,58,92,0); }
    }
    @keyframes mosa-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @keyframes mosa-fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes mosa-tooltip-in {
      from { opacity: 0; transform: translateX(10px); }
      to { opacity: 1; transform: translateX(0); }
    }

    #mosa-chat-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #e5e7eb;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, background 0.2s, border-color 0.2s;
      animation: mosa-pulse 2s ease-in-out infinite;
    }
    #mosa-chat-btn:hover {
      transform: scale(1.08);
      background: #f8f9fa;
      border-color: #1a3a5c;
      animation: none;
    }
    #mosa-chat-btn svg { width: 28px; height: 28px; fill: #1a3a5c; }
    #mosa-chat-btn.active { animation: none; }

    /* Notification dot */
    #mosa-chat-dot {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 16px;
      height: 16px;
      background: #ef4444;
      border-radius: 50%;
      border: 2px solid white;
      display: block;
    }
    #mosa-chat-btn.active #mosa-chat-dot { display: none; }

    /* Tooltip bubble */
    #mosa-chat-tooltip {
      position: fixed;
      bottom: 32px;
      right: 90px;
      background: white;
      color: #333;
      padding: 10px 16px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 500;
      z-index: 99998;
      white-space: nowrap;
      animation: mosa-tooltip-in 0.4s ease-out;
      cursor: pointer;
    }
    #mosa-chat-tooltip::after {
      content: '';
      position: absolute;
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid white;
    }
    #mosa-chat-tooltip-close {
      display: inline-block;
      margin-left: 8px;
      color: #9ca3af;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      vertical-align: middle;
    }
    #mosa-chat-tooltip-close:hover { color: #666; }

    #mosa-chat-window {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 370px;
      height: 520px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.25);
      z-index: 99999;
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      animation: mosa-fade-in 0.25s ease-out;
    }
    #mosa-chat-window.open { display: flex; }

    #mosa-chat-header {
      background: #1a3a5c;
      color: white;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    #mosa-chat-header-icon {
      width: 36px;
      height: 36px;
      background: rgba(255,255,255,0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #mosa-chat-header-icon svg { width: 20px; height: 20px; fill: white; }
    #mosa-chat-header-text h3 { margin: 0; font-size: 15px; font-weight: 600; }
    #mosa-chat-header-text p { margin: 2px 0 0; font-size: 12px; opacity: 0.8; }
    #mosa-chat-close {
      margin-left: auto;
      background: none;
      border: none;
      color: white;
      font-size: 22px;
      cursor: pointer;
      padding: 0 4px;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    #mosa-chat-close:hover { opacity: 1; }

    #mosa-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #f5f7fa;
    }
    .mosa-msg {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.45;
      word-wrap: break-word;
    }
    .mosa-msg.bot {
      background: white;
      color: #333;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .mosa-msg.user {
      background: #1a3a5c;
      color: white;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }

    /* Typing dots animation */
    .mosa-msg.typing-dots {
      background: white;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      padding: 14px 20px;
    }
    .mosa-typing-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #9ca3af;
      border-radius: 50%;
      margin: 0 2px;
      animation: mosa-bounce 1.2s ease-in-out infinite;
    }
    .mosa-typing-dot:nth-child(2) { animation-delay: 0.15s; }
    .mosa-typing-dot:nth-child(3) { animation-delay: 0.3s; }

    #mosa-chat-input-area {
      padding: 12px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
      background: white;
    }
    #mosa-chat-input {
      flex: 1;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 14px;
      outline: none;
      font-family: inherit;
      resize: none;
    }
    #mosa-chat-input:focus { border-color: #1a3a5c; }
    #mosa-chat-input::placeholder { color: #9ca3af; }
    #mosa-chat-send {
      background: #1a3a5c;
      border: none;
      border-radius: 8px;
      width: 40px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    #mosa-chat-send:hover { background: #244d75; }
    #mosa-chat-send:disabled { background: #9ca3af; cursor: not-allowed; }
    #mosa-chat-send svg { width: 18px; height: 18px; fill: white; }

    #mosa-chat-footer {
      text-align: center;
      padding: 6px;
      font-size: 11px;
      color: #9ca3af;
      background: white;
    }
    #mosa-chat-footer a { color: #1a3a5c; text-decoration: none; }

    @media (max-width: 480px) {
      #mosa-chat-window {
        width: calc(100vw - 20px);
        height: calc(100vh - 120px);
        right: 10px;
        bottom: 80px;
        border-radius: 10px;
      }
      #mosa-chat-tooltip {
        right: 80px;
        left: 10px;
        bottom: 28px;
        font-size: 13px;
        padding: 8px 12px;
        white-space: normal;
        max-width: calc(100vw - 100px);
      }
    }
  `;
  document.head.appendChild(style);

  // Chat button with notification dot
  const btn = document.createElement("button");
  btn.id = "mosa-chat-btn";
  btn.title = "Chat with us!";
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/><path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg><span id="mosa-chat-dot"></span>';
  document.body.appendChild(btn);

  // Tooltip bubble - shows after 3 seconds
  var tooltip = null;
  function showTooltip() {
    if (tooltip || isOpen) return;
    tooltip = document.createElement("div");
    tooltip.id = "mosa-chat-tooltip";
    tooltip.innerHTML = '🤖 Got moving questions? Our AI can answer them! <span id="mosa-chat-tooltip-close">&times;</span>';
    document.body.appendChild(tooltip);

    // Click tooltip to open chat
    tooltip.addEventListener("click", function (e) {
      if (e.target.id === "mosa-chat-tooltip-close") {
        hideTooltip();
        return;
      }
      btn.click();
    });
  }
  function hideTooltip() {
    if (tooltip) {
      tooltip.remove();
      tooltip = null;
    }
  }

  // Show tooltip after 3 seconds
  setTimeout(showTooltip, 3000);

  // Chat window
  const win = document.createElement("div");
  win.id = "mosa-chat-window";
  win.innerHTML = '\
    <div id="mosa-chat-header">\
      <div id="mosa-chat-header-icon">\
        <svg viewBox="0 0 24 24"><path d="M18 18.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zM6 18.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zM20 8h-3l-3-4H3c-1.1 0-2 .9-2 2v9h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2V12l-3-4zM7 6h4v4H3V6h4zm13 7h-8V6h1.5l3 4H20v3z"/></svg>\
      </div>\
      <div id="mosa-chat-header-text">\
        <h3>Movers of San Antonio</h3>\
        <p>Ask us anything about your move!</p>\
      </div>\
      <button id="mosa-chat-close">&times;</button>\
    </div>\
    <div id="mosa-chat-messages"></div>\
    <div id="mosa-chat-input-area">\
      <input id="mosa-chat-input" type="text" placeholder="Type your question..." autocomplete="off" />\
      <button id="mosa-chat-send">\
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>\
      </button>\
    </div>\
    <div id="mosa-chat-footer">Powered by <a href="https://moversofsanantonio.com" target="_blank">Movers of San Antonio</a></div>\
  ';
  document.body.appendChild(win);

  // State
  var messages = [];
  var isOpen = false;
  var isSending = false;

  var msgsEl = win.querySelector("#mosa-chat-messages");
  var inputEl = win.querySelector("#mosa-chat-input");
  var sendBtn = win.querySelector("#mosa-chat-send");
  var closeBtn = win.querySelector("#mosa-chat-close");

  // Toggle
  btn.addEventListener("click", function () {
    isOpen = !isOpen;
    win.classList.toggle("open", isOpen);
    btn.classList.toggle("active", isOpen);
    hideTooltip();
    if (isOpen && messages.length === 0) {
      addBotMessage("Hi there! I'm here to help with your upcoming move. What questions do you have about our moving services?");
    }
    if (isOpen) inputEl.focus();
  });

  closeBtn.addEventListener("click", function () {
    isOpen = false;
    win.classList.remove("open");
    btn.classList.remove("active");
  });

  // Send message
  function sendMessage() {
    var text = inputEl.value.trim();
    if (!text || isSending) return;

    addUserMessage(text);
    inputEl.value = "";
    isSending = true;
    sendBtn.disabled = true;

    // Show animated typing dots
    var typingEl = document.createElement("div");
    typingEl.className = "mosa-msg typing-dots";
    typingEl.innerHTML = '<span class="mosa-typing-dot"></span><span class="mosa-typing-dot"></span><span class="mosa-typing-dot"></span>';
    msgsEl.appendChild(typingEl);
    msgsEl.scrollTop = msgsEl.scrollHeight;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.map(function (m) {
          return { role: m.role, content: m.content };
        }),
      }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        typingEl.remove();
        addBotMessage(data.reply || "Sorry, I couldn't process that. Please call us at 210-348-8199!");
      })
      .catch(function () {
        typingEl.remove();
        addBotMessage("I'm having trouble connecting. Please call us at 210-348-8199 and we'll be happy to help!");
      })
      .finally(function () {
        isSending = false;
        sendBtn.disabled = false;
        inputEl.focus();
      });
  }

  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  function addUserMessage(text) {
    messages.push({ role: "user", content: text });
    var el = document.createElement("div");
    el.className = "mosa-msg user";
    el.textContent = text;
    msgsEl.appendChild(el);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function addBotMessage(text) {
    messages.push({ role: "assistant", content: text });
    var el = document.createElement("div");
    el.className = "mosa-msg bot";
    el.textContent = text;
    msgsEl.appendChild(el);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }
})();
