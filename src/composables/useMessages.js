import { ref } from "vue"
import { getDocs, getDoc, doc, query, where, setDoc } from "firebase/firestore";
import { dbMessagesRef } from "../firebase";

export default function useMessages() {
    const allMessages = ref([]);
    const messageText = ref('');

    async function getMessages() {
        try {
            const queryData = query(dbMessagesRef, where("enabled", "==", true));
            const docs = await getDocs(queryData);
            docs.forEach((doc) => {
                const messageItem = {
                    id: doc.id,
                    ...doc.data()
                }
                allMessages.value.push(messageItem);
            })
            generateMessage();
        } catch(e) {
            console.log(e);
        }
    }

    async function getMessagesAdmin() {
        try {
            const docs = await getDocs(dbMessagesRef);
            docs.forEach((doc) => {
                const messageItem = {
                    id: doc.id,
                    ...doc.data()
                }
                allMessages.value.push(messageItem);
            })
        } catch(e) {
            console.log(e);
        }
    }

    function generateMessage() {
        try {
            console.log(allMessages.value);
            const messageIndex = Math.floor(Math.random() * allMessages.value.length)
            console.log(messageIndex)
            messageText.value = allMessages.value[messageIndex].text;
            console.log(messageText.value);
        } catch(e) {
            console.log(e);
            messageText.value = "This website is blocked."
        }
    }

    async function disableMessage(id) {
        try {
            const oldData = doc(dbMessagesRef, id);
            const newData = await getDoc(oldData);
            await setDoc(oldData, { 
                ...newData.data(),
                enabled: !newData.data().enabled
            });
            alert(`The message has been ${newData.data().enabled ? "disabled" : "enabled"}.`)
        } catch(e) {
            alert("There was an error deleting the message, please try again.");
            console.log(e);
        }
    }
    return { allMessages, messageText, getMessages, getMessagesAdmin, disableMessage }
}