
/**
 * Хелпер для плавного скролла к элементу (пока не использовать!!)
 * @param id атрибут id элемента, к которому нужно сделать плавный скролл
 * @author Burtsev Ilysha
 */
export const smoothScrollToAnchor = (id: string) => {
    const distance = document.getElementById(id)?.getBoundingClientRect().top;

    window.scrollTo({
        top: distance,
        behavior: "smooth",
    });
}
