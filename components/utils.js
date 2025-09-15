export const clearHTML = (value) => {
    return value.replaceAll('<', '&lt').replaceAll('>', '&gt')
}