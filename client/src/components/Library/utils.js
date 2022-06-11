export const resizeLastBook = () => {
    const bookLinks = document.getElementsByClassName('Library__book-link')
    if ( Array.from(bookLinks).length <= 0) return

    const secondToLastWidth = bookLinks[bookLinks.length - 2].clientWidth
    const secondToLastMarginLeft = window.getComputedStyle(bookLinks[bookLinks.length - 2]).marginLeft
    const lastBookLink = bookLinks[bookLinks.length - 1]
    lastBookLink.style.width = `${secondToLastWidth}px`
    lastBookLink.style.marginLeft = secondToLastMarginLeft
}