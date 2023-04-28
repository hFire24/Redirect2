import { ref } from "vue"
import { getDocs, getDoc, doc, query, where, setDoc } from "firebase/firestore";
import { dbBreaksRef } from "../firebase";

export default function useBreaks() {
    const allBreaks = ref([]);
    const passedBreaks = ref([]);
    const breakIndex = ref(0);
    const breakText = ref('');
    const link = ref('');

    async function getBreaks() {
        try {
            const queryData = query(dbBreaksRef, where("enabled", "==", true));
            const docs = await getDocs(queryData);
            docs.forEach((doc) => {
                const breakItem = {
                    id: doc.id,
                    ...doc.data()
                }
                allBreaks.value.push(breakItem);
            })
            generateBreak();
        } catch(e) {
            console.log(e);
        }
    }

    async function getBreaksAdmin() {
        try {
            const docs = await getDocs(dbBreaksRef);
            docs.forEach((doc) => {
                const breakItem = {
                    id: doc.id,
                    ...doc.data()
                }
                allBreaks.value.push(breakItem);
            })
            generateBreak();
        } catch(e) {
            console.log(e);
        }
    }

    async function getSmallBreaks() {
        try {
            const queryData = query(dbBreaksRef, where("short", "==", true), where("enabled", "==", true));
            const docs = await getDocs(queryData);
            docs.forEach((doc) => {
                const breakItem = {
                    id: doc.id,
                    ...doc.data()
                }
                allBreaks.value.push(breakItem);
            })
            generateBreak();
        } catch(e) {
            console.log(e);
        }
    }

    function generateBreak() {
        try {
            link.value = allBreaks.value[0].link;

            if(allBreaks.value.length === 0) {
                breakText.value = "You're still here? Then get back to whatever you should be doing!";
                return;
            }
            for(let aBreak of passedBreaks.value) {
                allBreaks.value.push(aBreak)
            }
            passedBreaks.value = [];
            if(allBreaks.value.length === 1) {
                breakIndex.value = 0;
                breakText.value = allBreaks.value[0].text;
                link.value = allBreaks.value[0].link;
                return;
            }
            let previousBreak = breakText.value;
            do {
                breakIndex.value = Math.floor(Math.random() * allBreaks.value.length)
                breakText.value = allBreaks.value[breakIndex.value].text;
                link.value = allBreaks.value[breakIndex.value].link;
            } while(breakText.value === previousBreak);
        } catch(e) {
            console.log(e);
            breakText.value = "Guru Meditation"
        }
    }

    function complete() {
        allBreaks.value = allBreaks.value.filter( a => a !== allBreaks.value[breakIndex.value])
        generateBreak()
    }

    function pass() {
        passedBreaks.value.push(allBreaks.value[breakIndex.value])
        complete()
    }

    async function disableBreak(id) {
        try {
            const oldData = doc(dbBreaksRef, id);
            const newData = await getDoc(oldData);
            await setDoc(oldData, { 
                ...newData.data(),
                enabled: !newData.data().enabled
            });
            alert(`The break has been ${newData.data().enabled ? "disabled" : "enabled"}.`)
        } catch(e) {
            alert("There was an error deleting the break, please try again.");
            console.log(e);
        }
    }
    return { allBreaks, breakText, passedBreaks, link, getBreaks, getSmallBreaks, getBreaksAdmin, disableBreak, generateBreak, complete, pass }
}