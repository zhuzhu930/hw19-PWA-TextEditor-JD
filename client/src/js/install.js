const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (e) => {
    window.deferredPrompt = e; 
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

    const promptE = window.deferredPrompt; 

    if(!promptE) {
        return; 
    }

    promptE.prompt(); 

    window.deferredPrompt = null; 

    butInstall.classList.toggle('hidden', true); 
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (e) => {
    window.deferredPrompt = null; 
});
