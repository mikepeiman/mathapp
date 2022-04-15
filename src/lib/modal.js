function outsideClick(e) {
    console.log(`🚀 ~ file: modal.js ~ line 2 ~ outsideClick ~ e.target: `, e.target)
    // console.log(`🚀 ~ file: modal.js ~ line 4 ~ outsideClick ~ e.target.closest`, e.target.closest())
    console.log(`🚀 ~ file: modal.js ~ line 3 ~ outsideClick ~ e.target.closest(".modal-inner")`, e.target.closest(".modal"))
    if (e.target.closest(".modal-inner")) {
        return;
    }
    const modalVisible = document.querySelector(".modal-visible");
    let focusableNodes = trapTabKey(e)
    console.log(`🚀 ~ file: modal.js ~ line 10 ~ outsideClick ~ focusableNodes`, focusableNodes)
    if (modalVisible) {
        console.log(`🚀 ~ file: modal.js ~ line 10 ~ outsideClick ~ modalVisible`, modalVisible)
        closeModal('modalvisible');
    }
}
function escKey(e) {
    if (e.keyCode == 27) {
        closeModal('esckey');
    }
}

function closeClick(e) {
    if (e.target.classList.contains("closeModal")) {
        closeModal('closeclick');
    }
}
function trapTabKey(e) {
    const vanillaModal = document.querySelector(".vanilla-modal");
    const FOCUSABLE_ELEMENTS = [
        "a[href]",
        "area[href]",
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        "select:not([disabled]):not([aria-hidden])",
        "textarea:not([disabled]):not([aria-hidden])",
        "button:not([disabled]):not([aria-hidden])",
        "iframe",
        "object",
        "embed",
        "[contenteditable]",
        '[tabindex]:not([tabindex^="-"])',
    ];

    const nodes = vanillaModal.querySelectorAll(FOCUSABLE_ELEMENTS);
    let focusableNodes = Array(...nodes);
    // console.log(`🚀 ~ file: modal.js ~ line 39 ~ trapTabKey ~ focusableNodes`, focusableNodes)

    if (focusableNodes.length === 0) return;

    focusableNodes = focusableNodes.filter((node) => {
        return node.offsetParent !== null;
    });

    // if disableFocus is true
    if (!vanillaModal.contains(document.activeElement)) {
        console.log(`🚀 ~ file: modal.js ~ line 52 ~ trapTabKey ~ !vanillaModal.contains(document.activeElement)`, !vanillaModal.contains(document.activeElement))
        focusableNodes[0].focus();
    } else {
        const focusedItemIndex = focusableNodes.indexOf(document.activeElement);

        if (e.shiftKey && focusedItemIndex === 0) {
            focusableNodes[focusableNodes.length - 1].focus();
            e.preventDefault();
        }

        if (
            !e.shiftKey &&
            focusableNodes.length > 0 &&
            focusedItemIndex === focusableNodes.length - 1
        ) {
            focusableNodes[0].focus();
            e.preventDefault();
        }
    }
    return focusableNodes
}

function closeModal(msg) {
    console.log(`🚀 ~ file: modal.js ~ line 71 ~ closeModal ~ msg`, msg)
    const vanillaModal = document.querySelector(".vanilla-modal");
    let trigger = document.getElementById('modal-trigger');
    trigger.disabled = false
    if (vanillaModal) {
        vanillaModal.classList.remove("modal-visible");
        setTimeout(() => {
            document.getElementById("modal-content").innerHTML = "";
            document.getElementById("modal-content").style = "";
        }, 500);
    }
    setTimeout(() => {
        vanillaModal.remove()
    }, 500);

    document.removeEventListener("keydown", escKey);
    document.removeEventListener("click", outsideClick, true);
    document.removeEventListener("click", closeClick);
    document.removeEventListener("keydown", trapTabKey);
}

const modal = {
    init: async function () {
        const prerendredModal = document.createElement("div");
        prerendredModal.classList.add("vanilla-modal");
        const htmlModal = `         
         <div class="modal">
         <div class="modal-inner"
         ><div id="modal-content"></div></div></div>`;
        prerendredModal.innerHTML = htmlModal;
        document.body.appendChild(prerendredModal);
        return prerendredModal;
    },
    open: async function (idContent, triggerSource, option = { default: null }) {
        console.log(`🚀 ~ file: modal.js ~ line 97 ~ triggerSource`, triggerSource)
        let trigger = document.getElementById(triggerSource);
        trigger.disabled = true
        let vanillaModal = document.querySelector(".vanilla-modal");
        console.log(`🚀 ~ file: modal.js ~ line 95 ~ vanillaModal`, vanillaModal)
        if (!vanillaModal) {
            console.log("there is no vanilla modal class");
            await modal.init();
            vanillaModal = document.querySelector(".vanilla-modal");
        }

        const content = document.getElementById(idContent);
        let currentModalContent = content.cloneNode(true);
        currentModalContent.classList.add("current-modal");
        // currentModalContent.classList.add("modal-visible");
        // currentModalContent.classList.add("modal");
        currentModalContent.classList.remove("modal-hidden");
        currentModalContent.style = "";
        document.getElementById("modal-content").appendChild(currentModalContent);

        if (!option.default) {
            if (option.width && option.height) {
                document.getElementById("modal-content").style.width = option.width;
                document.getElementById("modal-content").style.height = option.height;
            }
        }
        vanillaModal.classList.add("modal-visible");
        document.addEventListener("click", outsideClick, true);
        document.addEventListener("keydown", escKey);
        // document.addEventListener("keydown", trapTabKey);
        document
            .getElementById("modal-content")
            .addEventListener("click", closeClick);
    },

    close: function () {
        console.log(`🚀 ~ file: modal.js ~ line 129 ~ 'closing modal'`, 'closing modal')
        closeModal();
    },
};

// for webpack es6 use uncomment the next line
export default modal;
