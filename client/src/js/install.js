const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e; 
    // Update UI to notify the user they can install.
    butInstall.classList.toggle('hidden', false);

    // TODO: Implement a click event handler on the `butInstall` element
    butInstall.addEventListener('click', (e) => {

    // const promptE = window.deferredPrompt; 

    // if(!promptE) {
    //     return; 
    // }

    // promptE.prompt(); 

    // window.deferredPrompt = null; 
    // Update UI to change the button style. 
    butInstall.classList.toggle('hidden', true); 
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if(choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null; 
        });
    });
});



// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (e) => {
    window.deferredPrompt = null; 
});
