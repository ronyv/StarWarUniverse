export const getLastPathParam = (url: string) => {
    if (!url) return null;
    const urlParts = url.split('/').filter(part => part.length > 0);
    return urlParts.length > 0 ? urlParts[urlParts.length - 1] : null;
  }