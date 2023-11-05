import axios from "axios";

export function sendPostRequestWithBody(message) {
  const botToken = "6847922450:AAEcyddvDFMH4JkeBwQ1j1xP031i9F0M0-U";
  const chatId = "5576899070"; // ID of the recipient (could be a user or group ID)

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const params = {
    chat_id: chatId,
    text: message,
    parse_mode: "HTML",
  };

  axios
    .get(apiUrl, { params })
    .then((response) => {
      console.log("success");
    })
    .catch((error) => {
      console.error(error);
    });
}
