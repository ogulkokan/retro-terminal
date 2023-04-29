import { scrollToBottom } from './utils.js';

export function handleClick(event) {
  if (event) {
    event.preventDefault();
  }
  let input = document.querySelector("[contenteditable='true']");
  if (input) {
    input.focus();
  }

  const terminalOutput = document.getElementById("terminal-output");
  const isScrolledToBottom =
    terminalOutput.scrollHeight - terminalOutput.clientHeight <=
    terminalOutput.scrollTop + 1;

  if (isScrolledToBottom) {
    scrollToBottom();
  }

  // Only allow click events that originated from within the terminal container
  if (event.target.closest(".terminal") !== null) {
    event.stopPropagation();
  }

  // Set focus back to the input field
  setTimeout(() => {
    input.focus();
  }, 0);
}


  
  export function theme(event) {
    let theme = event.target.dataset.theme;
    [...document.getElementsByClassName("theme")].forEach(b =>
      b.classList.toggle("active", false)
    );
    event.target.classList.add("active");
    document.body.classList = "theme-" + theme;
    handleClick();
  }
  
  export function fullscreen(event) {
    event.target.blur();
  }
  
  export function globalListener(event) {
    const keyCode = event.keyCode;
  
    if (event.target.matches("#terminal-input")) {
      // Add touch event listeners for terminal input
      event.target.addEventListener("click", handleClick);
      event.target.addEventListener("touchstart", handleClick);
    }
  
    if (keyCode === 122) {
      // F11
      toggleFullscreen();
    } else if (keyCode === 27) {
      // ESC
      toggleFullscreen(false);
    }
  }

  const terminalInput = document.getElementById('terminal-input');
  terminalInput.addEventListener('input', () => {
    scrollToBottom();
  });
  

  export function toggleFullscreen(enable) {
    const documentElement = document.documentElement;
  
    if (enable === undefined) {
      enable = !document.fullscreenElement;
    }
  
    if (enable) {
      if (documentElement.requestFullscreen) {
        documentElement.requestFullscreen();
      } else if (documentElement.mozRequestFullScreen) {
        documentElement.mozRequestFullScreen(); // Firefox
      } else if (documentElement.webkitRequestFullscreen) {
        documentElement.webkitRequestFullscreen(); // Chrome, Safari and Opera
      } else if (documentElement.msRequestFullscreen) {
        documentElement.msRequestFullscreen(); // IE/Edge
      }
    } else {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen(); // Firefox
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen(); // Chrome, Safari and Opera
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen(); // IE/Edge
        }
      }
    }
  }
  