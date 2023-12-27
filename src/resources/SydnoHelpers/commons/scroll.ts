
/**
 * Хелпер для плавного скролла к элементу
 * @param id атрибут id элемента, к которому нужно сделать плавный скролл
 */
export const smoothScrollToAnchor = (id: string) => {
    const distance = document.getElementById(id)?.getBoundingClientRect().top;

    window.scrollTo({
        top: distance,
        behavior: "smooth",
    });
}
