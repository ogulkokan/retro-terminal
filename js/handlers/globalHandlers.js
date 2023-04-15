export function handleClick(event) {
    if (event) {
      event.preventDefault();
    }
    let input = document.querySelector("[contenteditable='true']");
    if (input) {
      input.focus();
    }
  }
  
  export function theme(event) {
    // click(); // You need to import this function from the original code.
    let theme = event.target.dataset.theme;
    [...document.getElementsByClassName("theme")].forEach(b =>
      b.classList.toggle("active", false)
    );
    event.target.classList.add("active");
    document.body.classList = "theme-" + theme;
    handleClick();
  }
  
  export function fullscreen(event) {
    // toggleFullscreen(); // You need to import this function from the original code.
    event.target.blur();
  }
  
  export function globalListener({ keyCode }) {
    if (keyCode === 122) {
      // F11
      // toggleFullscreen(); // You need to import this function from the original code.
    } else if (keyCode === 27) {
      // ESC
      // toggleFullscreen(false); // You need to import this function from the original code.
    }
  }
  