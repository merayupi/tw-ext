const main = () => {
    // const bootstrapCSS = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css';
    // const bootstrapIconsCSS = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.5.0/font/bootstrap-icons.min.css';
    
    // injectCSS(bootstrapCSS);
    // injectCSS(bootstrapIconsCSS);

    const intervalId = setInterval(() => {
        attachButton(intervalId );
    }, 100);
}

// const injectCSS = (href) => {
//     const link = document.createElement('link');
//     link.href = href;
//     link.rel = 'stylesheet';
//     document.head.appendChild(link);
// }

const attachButton = async (intervalId) => {
    const element = document.querySelector("div[data-testid='UserName'] div:nth-child(2) span");

    if (element) {

        const username = element.innerHTML.substr(1);
        console.log('Username found: ' + username);
        
        const existingButton = element.parentNode.querySelector('.history-btn');
        if (!existingButton) {
            const button = await createButton(username);
            button.className = "history-btn";
            element.parentNode.appendChild(button);
        }
        clearInterval(intervalId);
    }
    
}

const createButton = async (username) => {
    const button = document.createElement("button");
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="height: 20px; width: auto; vertical-align: middle;"><path fill="#B100FF" d="M12,2A10,10,0,0,0,5.12,4.77V3a1,1,0,0,0-2,0V7.5a1,1,0,0,0,1,1H8.62a1,1,0,0,0,0-2H6.22A8,8,0,1,1,4,12a1,1,0,0,0-2,0A10,10,0,1,0,12,2Zm0,6a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1h2a1,1,0,0,0,0-2H13V9A1,1,0,0,0,12,8Z"></path></svg>';
    button.style.background = 'transparent';
    button.style.padding = '0px';
    button.style.cursor = "pointer";
    button.style.border = "0px";
    button.style.margin = "0em 0em 0em 0.5em";

    button.onclick = async function(event) {
        // const result = createModalUI();
        createModalUI();
        // await createHsitoryUsernameUI(username, result);
        console.log('Button clicked' + username);
    };
    return button;
}
// const createModalUI = () => {
//     const modal = document.createElement('div');
//     modal.className = 'modal fade';
//     modal.id = 'usernameModal';
//     modal.tabIndex = '-1';
//     modal.setAttribute('aria-labelledby', 'usernameModalLabel');
//     modal.setAttribute('aria-hidden', 'true');

//     const modalDialog = document.createElement('div');
//     modalDialog.className = 'modal-dialog modal-dialog-centered';
//     const modalContent = document.createElement('div');
//     modalContent.className = 'modal-content';
    
//     modalDialog.appendChild(modalContent);
//     modal.appendChild(modalDialog);
//     // modal.appendChild(modalDialog);

//     document.body.appendChild(modal);
//     // return modal;
// }
const createModalUI = () => {
    document.body.style.overflow = 'hidden';

    const container = document.createElement("div");
    container.id = 'container';
    const page = document.createElement("div");
    page.style.position = "fixed";
    page.style.top = "0";
    page.style.left = "0";
    page.style.width = "100vw";
    page.style.height = "100vh";
    page.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    page.style.zIndex = "9998";
    page.onclick = function () {
        container.remove();
        page.remove();
        document.body.style.overflow = '';
    };

    const popup = document.createElement("div");
    popup.id = "popup";
    popup.className = "popup-layout";
    popup.style.backgroundColor = "#3C096C";
    const c = document.createElement("div");
    c.style.display = "flex";
    c.style.width = "100%";
    c.style.flexDirection = "column";
    c.style.alignItems = "end";
    const closeButton = document.createElement("span");
    closeButton.id = "close";
    closeButton.innerHTML = '❌';
    closeButton.style.fontSize = "18px";
    closeButton.style.cursor = "pointer";
    closeButton.style.justifySelf = "end";
    closeButton.onclick = function () {
        container.remove();
        page.remove();
        document.body.style.overflow = '';
    };
    c.appendChild(closeButton);
    const result = document.createElement("div");
    result.className = "result";
    result.id = "result";
    popup.appendChild(c);
    popup.appendChild(result);
    container.appendChild(popup);
    document.body.appendChild(container);

    const closeModal = document.getElementById("close");
    closeModal && (closeModal.onclick = function () {
        container.remove();
        page.remove();
        document.body.style.overflow = '';
    });
    document.body.appendChild(page);

    return result;
}

const createUIHisotryUsername = (username, result) => {

}

main();
