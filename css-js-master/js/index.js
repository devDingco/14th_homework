document.getElementById("diary_box_container").addEventListener("scroll", () => {
    const checkScroll = document.getElementById("diary_box_container").scrollTop
    // console.log(checkScroll)

    if (checkScroll > 0) {
        document.getElementById("diary_filter").style = "background: black; color: white;"
    } else if (checkScroll === 0) {
        document.getElementById("diary_filter").style = "backgorund: white; color: black;"
    }
})