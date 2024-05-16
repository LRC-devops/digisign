import { useEffect, useState } from "react";

const preloadImage = (src: string) => {
  return new Promise((res, rej) => {
    const image = new Image();
    image.crossOrigin = "anonymous"
    image.onload = () => {
      res(image);
    }
    image.onerror = image.onabort = () => {
      rej(src);
    }
    image.src = src;
  }
  )
}

export default function useImagePreloader(imageList: string[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      console.log("PRELOADED");

      if (isCancelled) {
        return;
      }
      const imagesPromiseList: Promise<any>[] = [];
      for (let i of imageList) {
        imagesPromiseList.push(preloadImage(i))
      }
      await Promise.all(imagesPromiseList)
      if (isCancelled) {
        return;
      }
      setImagesPreloaded(true)
    }

    effect();

    return () => {
      isCancelled = true;
    }
  }, [imageList])

  return { imagesPreloaded }
}
