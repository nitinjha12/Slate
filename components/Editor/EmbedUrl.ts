export function EmbedUrl(url: string) {
  if (url.includes("youtube") || url.includes("youtu.be")) {
    return youtubeEmbed(url);
  } else if (url.includes("vimeo")) {
    return vimeoEmbed(url);
  } else {
    return url;
  }
}

const youtubeEmbed = function (url: string) {
  function embeded(id: string) {
    return `https://youtube.com/embed/${id}`;
  }

  if (url.includes("embed")) {
    return url;
  }

  if (url.includes("youtube")) {
    const urlParams = new URLSearchParams(new URL(url).search);
    const id = urlParams.get("v");

    return id ? embeded(id) : null;
  }
  if (url.includes("youtu.be")) {
    const id = url.split("be/")[1];
    return embeded(id);
  }
};

const vimeoEmbed = function (url: string) {
  const embeded = (id: string) => `https://player.vimeo.com/video/${id}`;

  if (url.includes("player")) return url;

  const id = url.split(".com/")[1];
  return embeded(id);
};
