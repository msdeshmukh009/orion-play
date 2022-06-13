import { Response } from "miragejs";

/**
 * All the routes related to Videos are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/videos
 * */

export const getAllVideosHandler = function () {
  try {
    return new Response(200, {}, { videos: this.db.videos });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles uploads a new video to the db.
 * send POST Request at /api/user/videos/
 * */
export const getPagedVideosHandler = function (schema, request) {
  const pageNum = Number(request.params.pageNum);
  const videos = this.db.videos.slice(pageNum * 8, pageNum * 8 + 8);

  try {
    return new Response(200, {}, { videos });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
// TODO: postVideoHandler

/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/user/videos/:videoId
 * */

export const getVideoHandler = function (schema, request) {
  const { videoId } = request.params;
  try {
    const video = schema.videos.findBy({ _id: videoId }).attrs;
    return new Response(200, {}, { video });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
