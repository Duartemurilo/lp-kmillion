/**
 * Vídeos publicados no site, com os metadados que o schema.org VideoObject
 * exige (thumbnail, data e duração).
 *
 * As thumbnails saem de um frame do próprio vídeo:
 *   ffmpeg -ss 1 -i public/videos/<v>.mp4 -frames:v 1 -vf "scale=720:-2" \
 *     public/videos/<v>-thumb.jpg
 */

export type SiteVideo = {
  name: string;
  description: string;
  src: string;
  thumbnail: string;
  /** Data em que o vídeo entrou no site. */
  uploadDate: string;
  /** Duração em ISO 8601. */
  duration: string;
};

export const IMS_INFLUENCER_VIDEO: SiteVideo = {
  name: "IMS Kmillion: o influenciador como canal de vendas",
  description:
    "Como o IMS da Kmillion transforma influenciadores em um canal de vendas mensurável, com cupom exclusivo, rastreio por CPF e cashback automatizado.",
  src: "/videos/IML.mp4",
  thumbnail: "/videos/IML-thumb.jpg",
  uploadDate: "2026-04-22T00:00:00-03:00",
  duration: "PT6S",
};

export const IMS_BRAND_VIDEO: SiteVideo = {
  name: "IMS Kmillion, visão marca",
  description:
    "Chega de cupons soltos, planilhas confusas e achismo. Com o IMS da Kmillion, cada influenciador vira um canal mensurável de vendas, com rastreio em tempo real e autonomia para o marketing.",
  src: "/videos/ims_marca.mp4",
  thumbnail: "/videos/ims_marca-thumb.jpg",
  uploadDate: "2026-04-23T00:00:00-03:00",
  duration: "PT45S",
};
