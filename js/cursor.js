const initCursor = () => {

    const $cursor = document.querySelector(".cursor")

    gsap.set($cursor, { xPercent: -50, yPercent: -50 })

    function onMouseMove(e) {

        let mouse_x = e.clientX
        let mouse_y = e.clientY
    
        gsap.to($cursor, {
            duration: 2,
            ease: 'expo.out',
            x: mouse_x,
            y: mouse_y,
        })
    }

    const cursorLinks = document.querySelectorAll("[data-cursor]");

    cursorLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            if (link.dataset.cursor === "nav") {
                $cursor.classList.add(`is-hovering-nav`)
            } else if (link.dataset.cursor === "logo") {
                $cursor.classList.add(`is-hovering-logo`)
            } else {
                $cursor.classList.add(`is-hovering`) 
            }
        })
        link.addEventListener("mouseleave", () => {
            if (link.dataset.cursor === "nav") {
                $cursor.classList.remove(`is-hovering-nav`)
            } else if (link.dataset.cursor === "logo") {
                $cursor.classList.remove(`is-hovering-logo`)
            } else {
                $cursor.classList.remove(`is-hovering`) 
            }
        })
    })


    document.addEventListener('mousemove', (e) => onMouseMove(e), { passive: true });
}

export default initCursor;
