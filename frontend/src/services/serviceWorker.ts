export const registerSW = async () => {
    try {
        await navigator.serviceWorker.register(`/ticketflow/sw.js`);
        await navigator.serviceWorker.ready;
    } catch (error: any) {
        console.log("ERROR : ", error);
    }
};